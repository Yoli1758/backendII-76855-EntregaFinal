import { UserDAO } from "../dao/user.dao.js";

const udao = UserDAO;
export class UserRepository {


    static getByEmail(email) { return udao.findByEmail(email) }

    static async findByEmailWithCart(email) {
        const user = await udao.findByEmail(email);
        return user.populate("cart");
    }

    static createUser(data) { return udao.createUser(data);  }

    static async getById(id) { return await udao.findById(id) }

    static saveResetToken(userId, token, exp) { return udao.saveResetToken(userId, token, exp); }


    static getByResetToken(token) { return udao.findByResetToken(token); }

    static updatePassword(userId, newPassword) { return udao.updatePassword(userId, newPassword);  }

    static async getAll() {
        const users = await udao.findAll();
        return users
    }

    static updateUser(id, data) { return udao.findByIdAndUpdate(id, data, { new: true }); }

    static deleteUserById(idUser) { return udao.deleteUserById(idUser) }
}