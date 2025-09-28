import { User } from '../../config/models/user.model.js'

export class UserDAO {

    static async createUser(userData) {
        return await User.create(userData)
    }
    static async findByEmail(email) {
        console.log("voy a buscar el email en la bd", email)

        const user = await User.findOne({ email });
        console.log("regresando", user)
        return user
    }

    static async findAll() {
        // const users = await User.find()
        // await User.populate(users,{path:"Cart"})


        return await User.find().populate({
            path: "cart",
            populate: {
                path: "products.productId",
                model: "Product"
            }
        })
    }
    static async findById(id) {
        return await User.findById(id)
            .populate({
                path: "cart",
                populate: {
                    path: "products.productId",
                    model: "Product"
                }
            })
    }

    static async saveResetToken(userId, token, exp) {
        return await User.findByIdAndUpdate(userId, {
            resetToken: token,
            resetTokenExp: exp,
        });
    }

    static async findByResetToken(token) {
        return await User.findOne({
            resetToken: token,
            resetTokenExp: { $gt: Date.now() },
        });
    }

    static async updatePassword(userId, newPassword) {
        return await User.findByIdAndUpdate(userId, {
            password: newPassword,
            resetToken: null,
            resetTokenExp: null,
        });
    }

}