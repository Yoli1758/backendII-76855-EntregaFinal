import { Cart } from '../../config/models/cart.model.js'
import {CartRepository} from '../repositories/cart.repository.js'

export class CartService{
   static async createCart(){return CartRepository.createEmptyCart()}

    static async getCartById(cartId) {
        console.log("estoy en getCartByid de service con ",cartId)
        return CartRepository.getCartById(cartId)
    }
    static async addProductToCart(cartId,productId){
        console.log("estoy en cartservice con ",cartId,productId)
        
        return CartRepository.addProductToCart(cartId,productId)
    }
    static async removeProductFromCart(cartId,productId){

        console.log("voy a remover el producto",productId)
        console.log("voy a removoer el producto del carrito",cartId)
        return CartRepository.removeProduct(cartId,productId)
    }
    static async updateQuantityProduct(cid,pid,quantity){
        console.log(`voy a modificar la cantidad ${quantity} del producto ${pid} del carrito ${cid._id}`)
        return CartRepository.updateProductQuantity(cid,pid,quantity)
    }
    static async deleteProductsCart(cid){return CartRepository.clearCart(cid)}
}