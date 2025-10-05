import passport from 'passport'
import { config } from '../../config/db/config.js'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { AuthService } from '../../app/service/auth.service.js'
import { UserRepository } from '../../app/repositories/user.repository.js'


function cookieExtractor(req) {
    if (req && req.cookies && req.cookies.access_token) {
        return req.cookies.access_token;
    }
    return null;
}


export function initPassport() {

    passport.use("register", new LocalStrategy(
        { usernameField: "email", passReqToCallback: true },
        async (req, email, password, done) => {
            try {
                const Data = {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    age: req.body.age,
                    email,
                    password
                }
                const user = await AuthService.register(Data);
                return done(null, user)
            } catch (err) { return done(null, false, err.message); }
        }
    ));

    passport.use("login", new LocalStrategy(
        { usernameField: "email", passwordField: "password", session: false },
        async (email, password, done) => {
            try {
                const user = await AuthService.login(email, password);
                return done(null, user)
            } catch (err) { return done(null, false, err.message); }
        }
    ));

    passport.use("jwt", new JwtStrategy(
        {
            jwtFromRequest: cookieExtractor,
            secretOrKey: config.jwt.secret
        },
        async (payload, done) => {
            try {
                const user = await UserRepository.getById(payload.sub)
                if (!user) return done(null, false, { message: "user not found" })
                return done(null, user)

            } catch (err) {
                return done(err, false)
            }
        }
    ))

    passport.use("current", new JwtStrategy(
        {
            jwtFromRequest: cookieExtractor,
            secretOrKey: config.jwt.secret
        },
        async (payload, done) => {
            try {
                const user = await UserRepository.getById(payload.sub).lean();
                if (!user) return done(null, false, { message: "User not found" });
                return done(null, user);
            } catch (err) {
                return done(err, false);
            }
        }
    ));

}