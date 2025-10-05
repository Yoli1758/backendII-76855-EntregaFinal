import { User } from '../../config/models/user.model.js'
import { Cart } from '../../config/models/cart.model.js'
export class UserDAO {

    static async createUser(userData) {
        return await User.create(userData)
    }
    static async findByEmail(email) {
        const user = await User.findOne({ email });
        return user
    }

    static async findAll() {
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

    static async findByIdAndUpdate(id, data) {
        return await User.findByIdAndUpdate(id, data, { new: true })
            .populate({
                path: "cart",
                populate: {
                    path: "products.productId",
                    model: "Product"
                }
            })
    }

    static async deleteUserById(userId) {
        const user = await User.findById(userId)
        if (!user) return null;
        if (user.cart) {
            await Cart.findByIdAndDelete(user.cart)
        }
        await User.findByIdAndDelete(userId);
        return user;
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