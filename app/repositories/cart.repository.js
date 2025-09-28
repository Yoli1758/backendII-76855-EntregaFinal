// import {Cart} from '../../config/models/cart.model.js'

import { CartDAO } from "../dao/cart.dao.js";

const cdao = CartDAO;

export class CartRepository{
    static  createEmptyCart(){
        console.log("estoy creando el carro")
        return cdao.CreateCartEmpty();
        //return Cart.create({products:[]});
    }
    static  getCartById(cid){
        console.log("estoy en getcarbyid con cid:",cid)
        return cdao.getCartById(cid);
      
    }
    static async addProductToCart(cartId,productId,quantity=1){
        console.log("estoy en carrepository con cart",cartId)
        const cart = await this.getCartById(cartId)
        if(!cart){
            throw new Error("Cart not found")
        }
        console.log("cart en cartrepository",cart._id)
         return  cdao.addProductToCart(cart,productId,quantity);
         
       
    }
    static removeProduct(cartId,productId){

        console.log("voy a removeProduct antes del cdao")
        return cdao.deleteProductFromCart(cartId,productId);
        // return Cart.findByIdAndUpdate(
        //     cartId,
        //     {$pull:{products:productId}},
        //     {new:true}
        // )
    }

    static updateProductQuantity(cid,pid,quantity){
        console.log("antes del cdo de updateproductquiantiry")
        return cdao.updateQuantityProduct(cid,pid,quantity);
    }
    static clearCart(cid){
        return cdao.deleteProductsCart(cid);
    }
}