import { UserService } from "../service/user.service.js";
import { hashPassword } from "../../utils/crypto.js";

export class ProfileController {

    static async getUser(req, res) {
        try {
            const userId = req.user._id;
            const user = await UserService.getUserById(userId)
            const plainUser = user.toObject ? user.toObject() : user;
            res.render("profile", { plainUser });
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message })
        }
    }

    static async updateUser(req, res) {
        try {
            const userId = req.user._id;
            const { first_name, last_name, age, password } = req.body;
            const update = { first_name, last_name, age };
            if (password && password.trim() !== "") {
                update.password = hashPassword(password)
            }
            const userUpdate = UserService.updateUser(userId, update);
            const plainUser = userUpdate.toObject ? userUpdate.toObject() : userUpdate;
            res.redirect("/")
        } catch (error) {
            res.status(400).json({ status: "error", message: error.message })
        }
    }
    
}


