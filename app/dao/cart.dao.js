import { Cart } from '../../config/models/cart.model.js'

export class CartDAO {

    static async CreateCartEmpty() { return await Cart.create({ products: [] }) }

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

        const productIndex = cart.products.findIndex(item => {
            const currentId = item.productId._id
                ? item.productId._id.toString()
                : item.productId.toString();
            return currentId === productid.toString();
        });
        
        if (productIndex >= 0) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ productId: productid, quantity })
        }
        await cart.save();
        return await cart.populate("products.productId")
    }

    static async incrementProduct(cart, productid, quantity) {
        const idx = cart.products.findIndex(item => {
            const id = item.productId && item.productId._id ? item.productId._id.toString() : item.productId.toString();
            return id === productid.toString();
        });

        if (idx >= 0) {
            cart.products[idx].quantity += Number(quantity);
        } else {
            cart.products.push({ productId: mongoose.Types.ObjectId(productid), quantity: Number(quantity) });
        }
        await cart.save();
        return cart.populate("products.productId");
    }

    static async decrementProduct(cart, productid, quantity) {
        const idx = cart.products.findIndex(item => {
            const id = item.productId && item.productId._id ? item.productId._id.toString() : item.productId.toString();
            return id === productid.toString();
        });
        if (idx === -1) throw new Error("Product not found in cart");
        cart.products[idx].quantity -= Number(quantity);
        if (cart.products[idx].quantity <= 0) {
            cart.products.splice(idx, 1);
        }
        await cart.save();
        return cart.populate("products.productId");
    }

    static async keepRejected(cart, productRejected) {
        const updatedProducts = productRejected.map(r => ({
            productId: r.productId,
            quantity: r.quantity,
            rejectedReason: r.reason
        }))
        await Cart.findByIdAndUpdate(cart._id, { products: updatedProducts });
        return updatedProducts;
    }

    static async deleteProductFromCart(cid, pid) {
      
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

    static async deleteCart(cid) {return await Cart.findByIdAndDelete(cid)}
    
}