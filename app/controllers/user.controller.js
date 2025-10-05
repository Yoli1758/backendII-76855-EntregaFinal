import { UserService } from "../service/user.service.js";
import mongoose from 'mongoose'
import { toUpdateUserDTO } from "../dtos/user.dto.js";

export class UserController {

    static async getAll(req, res) {
        try {
            const users = await UserService.getAllUser();
            const plainUsers = users.map(u => u.toObject ? u.toObject() : u);
            res.render("adminU", { users: plainUsers });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message })
        }
    }

    static async getById(req, res) {
        try {
            const { id } = req.params
            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "id invalid" })
            if (req.user.role === "user" && req.user._id.toString() !== id) {
                return res.status(403).json({ status: "error", message: "You are not allowed to access this user" })
            }
            const user = await UserService.getUserById(id)
            return user ? res.json({ status: "success", user }) : res.status(404).json({ status: "error", message: "User not found" })
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message })
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params
            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "id invalid" })
            const dto = toUpdateUserDTO(req.body)
            if (req.user.role === "user" && req.user._id.toString() !== id) {
                return res.status(403).json({ status: "error", message: "You are not allowed to update this user" })
            }
            const user = await UserService.updateUser(id, dto)
            return res.redirect("/users")
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message })
        }
    }

    static async updateMe(req, res) {
        try {
            const userId = req.user._id.toString();
            const dto = toUpdateUserDTO(req.body);
            const user = await UserService.updateUser(userId, dto);
            return user ? res.json({ status: "success", user }) : res.status(404).json({ error: "User not found" });
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message });
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: "id invalid" })
            const userdelete = await UserService.deleteUser(id)
            return res.redirect("/users")
        } catch (error) {
            res.status(500).json({ status: "error", message: error.message })
        }
    }

}


