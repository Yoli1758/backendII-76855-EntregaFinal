import { CartService } from "../service/cart.service.js";
import { UserService } from "../service/user.service.js";
import mongoose from 'mongoose'

export class CartController {

    static async createCart(req, res) {
        try {
            const cart = await CartService.createCart();
            res.status(201).json({ mensage: `Cart ${cart.id} created succesfully" ` });

        } catch (error) { res.status(500).json({ error: `Error getting car with ID ${id}` }); }
    }

    static async getCart(req, res) {
        const userId = req.user._id;
        try {

            console.log("id del usuario", userId)
            const user = await UserService.getUserById(userId)

            console.log("user:", user)
            if (!user || !user.cart) {
                return res.status(404).json({ error: "Cart not found for this user" });
            }
            console.log("cartid", user.cart)
            const cart = await CartService.getCartById(user.cart)
            return cart
                ? res.json({ status: "success", cart })
                : res.status(404).json({ error: "cart not found" })

        } catch (error) {
            console.log("Error en getCart:", error)
            res.status(500).json({ error: `Error getting car with ID ${user.cart}: ${error.message}` });
        }
    }


    static async addProduct(req, res) {
        const userId = req.user._id;
        const { pid } = req.params

        try {

            if (!mongoose.Types.ObjectId.isValid(pid)) return res.status(400).json({ error: "id product invalid" })

            console.log("id del usuario", userId)
            const user = await UserService.getUserById(userId)

            console.log("user:", user)
            if (!user || !user.cart) {
                return res.status(404).json({ error: "Cart not found for this user" });
            }
            console.log("cartid", user.cart)
            const cart = await CartService.addProductToCart(user.cart, pid);
            return cart ? res.json({ message: `Product ${pid} add to cart ${user.cart}`, cart: cart }) : res.status(404).json({ error: "cart not found or product invalid" })
        } catch (error) { res.status(500).json({ error: `Error to add product ${pid} to cart: ${error.message}` }) }
    }
    static async removeProduct(req, res) {
        const userId = req.user._id;
        const { pid } = req.params
        try {


            if (!mongoose.Types.ObjectId.isValid(pid)) return res.status(400).json({ error: "id product invalid" })
            console.log("id del usuario", userId)
            const user = await UserService.getUserById(userId)

            console.log("user:", user)
            if (!user || !user.cart) {
                return res.status(404).json({ error: "Cart not found for this user" });
            }
            console.log("cartid", user.cart)
            const updatedCart = await CartService.removeProductFromCart(user.cart, pid);
            if (!updatedCart) {
                return res.status(404).json({ error: "Cart not found or product doesn´t exist in the cart" });
            }
            res.json({ message: `Product ${pid} remove the cart ${user.cart.id}`, cart: updatedCart });

        } catch (error) {
            res.status(500).json({ error: `Error delete product ${pid} in cart ${cid}` });
        }
    }
    static async updateQuantityProduct(req, res) {

        const userId = req.user._id;
        const { pid } = req.params
        const { quantity } = req.body;

        try {
            if (!mongoose.Types.ObjectId.isValid(pid)) return res.status(400).json({ error: "id product invalid" })
            console.log("id del usuario en updatequantity", userId)
            const user = await UserService.getUserById(userId)

            console.log("user:", user)
            if (!user || !user.cart) {
                return res.status(404).json({ error: "Cart not found for this user" });
            }
            console.log("cartid", user.cart)

            console.log("...modificando la cantidad", quantity)
            const updatedCart = await CartService.updateQuantityProduct(user.cart, pid, quantity);
            if (!updatedCart) {
                return res.status(404).json({ error: "Carrito no encontrado o el producto no existe en el carrito" });
            }
            res.json({ message: `Cantidad del producto ${pid} en el carrito ${user.cart} actualizada`, cart: updatedCart });

        } catch (error) {
            res.status(500).json({ error: `Error updating quantity product: ${pid} in cart: ${error.mensage}` });

        }
    }
    static async removeProductsCart(req, res) {
        const userId = req.user._id;

        try {

            console.log("id del usuario en removeProductCart", userId)
            const user = await UserService.getUserById(userId)

            console.log("user:", user)
            if (!user || !user.cart) {
                return res.status(404).json({ error: "Cart not found for this user" });
            }
            console.log("cartid", user.cart)

            const updatedCart = await CartService.deleteProductsCart(user.cart);
            if (!updatedCart) {
                return res.status(404).json({ error: "Cart not found" });
            }
            res.json({ message: `cart: Clean sucessfully`, cart: updatedCart });

        } catch (error) {
            res.status(500).json({ error: `Error deleting products in cart: ${error.message}` });
        }
    }
}