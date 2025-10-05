import { AuthService } from '../service/auth.service.js';
import jwt from "jsonwebtoken"
import { config } from '../../config/db/config.js'
export class AuthController {

    static async registerSuccess(req, res) {

        res.render("register", {
            alert: {
                icon: "success",
                title: "¡Register Succesfully",
                text: "You can now login 😜",
                timer: 4000,
                redirectUrl: "/"
            }
        })


    }


    static async loginSuccess(req, res) {

        const user = req.user;
        const payload = {
            sub: String(user._id),
            first_name: user.first_name,
            email: user.email,
            role: user.role
        };
        const token = jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expires });
        res.cookie("access_token", token, { httpOnly: true, secure: false, sameSite: "strict" });
        res.redirect("/")
    }


 

    static current(req, res) {
        res.json({ status: "success", user: req.user })
    }

    static logout(req, res) {
        res.clearCookie("access_token");

        res.redirect("/")
    }
    
    static async forgotPasswordController(req, res) {
        try {
            const { email } = req.body;


            const result = await AuthService.forgotPassword(email);
            if (result) {
                return res.status(200).json({ success: true, message: "Recovery Email Sent with intructions" });
            }
            return res.status(400).json({ success: false, message: "Email could not be sent. Please try again" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };

    static async resetPasswordViews(req, res) {
        try {
            const { token } = req.params;
            res.render("resetPassword", { token })

        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };

    static async resetPasswordController(req, res) {
        try {

            const { token } = req.params;
            const { newPassword } = req.body;
            await AuthService.resetPassword(token, newPassword);
            return res.status(200).json({ message: "Password changed successfully" });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}