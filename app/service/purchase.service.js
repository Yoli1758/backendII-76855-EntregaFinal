import { PurchaseRepository } from '../repositories/purchase.repository.js'


export class PurchaseService {
    static async createPurchase(cart, buyerName, buyerEmail) {

        const purchasedProducts = [];
        const rejectedProducts = [];
        let total = 0;

        for (const item of cart.products) {
            const product = item.productId;

            if (product.stock >= item.quantity) {
                await PurchaseRepository.updateProductStock(product._id, item.quantity);
                const subtotal = item.quantity * product.price
                purchasedProducts.push({
                    productId: product._id,
                    title: product.title,
                    quantity: item.quantity,
                    unitPrice: product.price,
                    subtotal
                });
                total += subtotal;
            } else {
                rejectedProducts.push({
                    productId: product._id,
                    title: product.title,
                    reason: "Sin stock disponible",
                    quantity: item.quantity
                });
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
