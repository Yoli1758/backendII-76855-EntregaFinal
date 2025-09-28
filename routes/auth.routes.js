import { Router } from "express";
import passport from "passport";
import { AuthController } from "../app/controllers/auth.controller.js";


const router = Router();

// Registro
router.post(
    "/register",
    passport.authenticate("register", { session: false, failureRedirect: "/auth/failregister" }),
    AuthController.registerSuccess
)

router.post("/jwt/login", (req, res, next) => {
    passport.authenticate("login", { session: false }, (err, user, info) => {
        if (err) return next(err)
        if (!user) {
            return res.status(401).json({ status: "error", message: info?.message || "Invalid Credentials" })
        }
        req.user = user;
        return AuthController.loginSuccess(req, res)
    })(req, res, next);

})




router.get("/current", passport.authenticate("jwt", { session: false }),
    AuthController.current
);


// Logout
router.get("/logout", AuthController.logout);

router.post("/forgot-password",AuthController.forgotPasswordController);
router.post("/reset-password/:token",AuthController.resetPasswordController);


router.get("/failregister", (req, res) => res.status(400).json({ status: "error", message: "Register failed" })

)
router.get("/faillogin", (req, res) => res.status(400).json({ status: "error", message: "Login failed" })

)




export default router;