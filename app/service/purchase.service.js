import { PurchaseRepository } from '../repositories/purchase.repository.js'
import { CartRepository } from '../repositories/cart.repository.js'
import { Product } from '../../config/models/product.model.js'
import { v4 as uuidv4 } from 'uuid'


export class PurchaseService {
    static async createPurchase(cart, buyerName, buyerEmail) {

        console.log("estoy en purchaseService con cart", cart)
        const purchasedProducts = [];
        const rejectedProducts = [];
        let total = 0;

        for (const item of cart.products) {
            const product = item.productId;
            console.log("iterando productos ", product)
            if (product.stock >= item.quantity) {
                console.log(`stock:${product.stock} y quantity:${item.quantity}`)
                //await PurchaseRepository.updateProductStock(product._id, item.quantity);
                const subtotal = item.quantity * product.price
                purchasedProducts.push({
                    productId: product._id,
                    title: product.title,
                    quantity: item.quantity,
                    unitPrice: product.price,
                    subtotal

                });

                total += subtotal;
                console.log(`total:${total}`)
            } else {
                rejectedProducts.push(product._id);
            }
        }


        let ticket = null;
        if (purchasedProducts.length > 0) {
            const ticketData = {
                code: `TCK-${Date.now()}`,
                buyerName,
                buyerEmail,
                products: purchasedProducts,
                total,
                status: "paid"
            };
            ticket = await PurchaseRepository.createTicket(ticketData);
        }

        return { ticket, rejectedProducts };
    }
}
