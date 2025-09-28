import { Cart } from '../../config/models/cart.model.js'
import { User } from '../../config/models/user.model.js'

export class CartDAO {

    static async CreateCartEmpty() {
        return await Cart.create({ products: [] })
    }
    static async getCartById(id) {

        const cart = await Cart.findById(id).populate({
            path: "products.productId",
            model: "Product"
        })
        if (!cart) {
            throw new Error("cart not found")
        }
        return cart;

    }


    static async addProductToCart(cart, productid, quantity = 1) {


        console.log("voy a agregar el proudcto al carrito", cart._id, productid)

        console.log("productos actuales en cart:", JSON.stringify(cart.products, null, 2));
        const productIndex = cart.products.findIndex(item => {
            const currentId = item.productId._id
                ? item.productId._id.toString()   
                : item.productId.toString();      
            return currentId === productid.toString();
        });
        console.log("indice producto", productIndex)
        if (productIndex >= 0) {
            cart.products[productIndex].quantity += quantity;
        } else {
            console.log("voy a push a el cart")
            cart.products.push({productId:productid,quantity})
        }
        await cart.save();
        return await cart.populate("products.productId")
    }
    static async deleteProductFromCart(cid, pid) {
        console.log("vamos a remover el producto del carrito",cid._id,pid)
        const cart = await Cart.findByIdAndUpdate(
            cid, { $pull: { products: { productId: pid } } },
            { new: true }
        ).populate('products.productId')
        return cart;
    }
    static async updateQuantityProduct(cid, pid, quantity) {
        const cart = await Cart.findOneAndUpdate(
            { _id: cid, 'products.productId': pid },
            { $set: { 'products.$.quantity': quantity } },
            { new: true }
        ).populate('products.productId');
        return cart;
    }
    static async deleteProductsCart(cid) {
        const cart = await Cart.findByIdAndUpdate(
            cid,
            { $set: { products: [] } },
            { new: true }
        )
        return cart;
    }
}