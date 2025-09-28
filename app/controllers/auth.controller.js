
import { signJwt } from '../../utils/jwt.js'
import { AuthService } from '../service/auth.service.js';

export class AuthController {

    static async registerSuccess(req, res) {
        res.status(201).json({ status: "success", user: req.user })
    }

    static async loginSuccess(req, res) {
        const payload = { sub: req.user._id };
        const token = signJwt(payload);
        res
            .cookie("access_token", token, { httpOnly: true })
            .json({ status: "success", user: req.user })
    }

    static current(req, res) {
        res.json({ status: "success", user: req.user })
    }

    static logout(req, res) {
        res.clearCookie("access_token");
        res.json({ status: "success", message: "Logged Out" })
    }


    static async forgotPasswordController(req, res) {
        try {
            const { email } = req.body;

            console.log("olvidamos el password ",email)
            await AuthService.forgotPassword(email);
            res.json({ message: "Email send with intructions" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };

    static async resetPasswordController(req, res) {
        try {
            const { token } = req.params;
            const { newPassword } = req.body;
            await AuthService.resetPassword(token, newPassword);
            res.json({ message: "Password Changed sucessfully" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };
}