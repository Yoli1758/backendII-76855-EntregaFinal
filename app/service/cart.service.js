import { CartRepository } from '../repositories/cart.repository.js'

export class CartService {
  static async createCart() { return CartRepository.createEmptyCart() }

  static async getCartById(cartId) {

    return CartRepository.getCartById(cartId)
  }
  static async addProductToCart(cartId, productId) { return CartRepository.addProductToCart(cartId, productId) }
  static async removeProductFromCart(cartId, productId) { return CartRepository.removeProduct(cartId, productId) }
  static async updateQuantityProduct(cid, pid, quantity) { return CartRepository.updateProductQuantity(cid, pid, quantity) }
  static async deleteProductsCart(cid) { return CartRepository.clearCart(cid) }
  static async keepRejected(cart, productRejected) { return CartRepository.keepRejected(cart, productRejected) }

  static async incrementProduct(cartId, productId, quantity = 1) { return CartRepository.incrementProduct(cartId, productId, quantity); }

  static async decrementProduct(cartId, productId, quantity = 1) { return CartRepository.decrementProduct(cartId, productId, quantity); }

}