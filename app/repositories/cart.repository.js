import { CartDAO } from "../dao/cart.dao.js";

const cdao = CartDAO;

export class CartRepository {
    static createEmptyCart() { return cdao.CreateCartEmpty(); }

    static getCartById(cid) { return cdao.getCartById(cid); }

    static async addProductToCart(cartId, productId, quantity = 1) {
        const cart = await this.getCartById(cartId)
        if (!cart) {
            throw new Error("Cart not found")
        }
        return cdao.addProductToCart(cart, productId, quantity);
    }

    static removeProduct(cartId, productId) { return cdao.deleteProductFromCart(cartId, productId);  }

    static updateProductQuantity(cid, pid, quantity) {return cdao.updateQuantityProduct(cid, pid, quantity); }

    static clearCart(cid) { return cdao.deleteProductsCart(cid); }

    static async keepRejected(cart, productsRejected) { return cdao.keepRejected(cart, productsRejected) }

    static deleteCart(cid) { return cdao.deleteCart(cid)  }

    static async incrementProduct(cartId, productId, quantity = 1) {
        const cart = await this.getCartById(cartId);
        if (!cart) throw new Error("Cart not found");
        return cdao.incrementProduct(cart, productId, quantity)
    }

    static async decrementProduct(cartId, productId, quantity = 1) {
        const cart = await this.getCartById(cartId);
        if (!cart) throw new Error("Cart not found");
        return cdao.decrementProduct(cart, productId, quantity)
    }

}