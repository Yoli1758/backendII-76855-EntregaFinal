import { Router } from "express";
import passport from "passport";
import { AuthController } from "../app/controllers/auth.controller.js";

const router = Router();


router.post(
    "/register",
    passport.authenticate("register", { session: false, failureRedirect: "/failregister" }),
    AuthController.registerSuccess
)

router.post("/jwt/login", (req, res, next) => {
    passport.authenticate("login", { session: false }, (err, user, info) => {
        if (err) return next(err)
        if (!user) {
       
       return res.render("login", {
                alert: {
                    icon: "error",
                    title: "¡Error!",
                    text: info?.message || "Usuario o contraseña incorrectos ❌",
                    timer: 3000
                }
            });
        }
        req.user = user;
        return AuthController.loginSuccess(req, res)
    })(req, res, next);

})



router.get("/current", passport.authenticate("jwt", { session: false }),
    AuthController.current
);



router.get("/logout", AuthController.logout);

router.post("/forgot-password",AuthController.forgotPasswordController);
router.get("/reset-password/:token",AuthController.resetPasswordViews);
router.post("/reset_password/:token",AuthController.resetPasswordController)

router.get("/faillogin", (req, res) => res.status(400).json({ status: "error", message: "Login failed" })


)




export default router;