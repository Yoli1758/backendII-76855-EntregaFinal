import { Ticket } from "../../config/models/ticket.model.js";
import { Product } from '../../config/models/product.model.js'

export class PurchaseRepository {


    static async updateProductStock(productId, quantity) {
        try {
            return await Product.findByIdAndUpdate(
                productId,
                { $inc: { stock: -quantity } },
                { new: true }
            );
        } catch (error) {
            console.error("❌ Error updating stock:", error);
            throw error;
        }
    }


    static async createTicket(ticketData) {
        try {
            const ticket = new Ticket(ticketData)
            return await ticket.save();
        } catch (error) {
            console.error("❌ Error creando ticket:", error);
            throw error;
        }
    }

    static async getTicketByCode(code) {
        return Ticket.findOne({ code })
    }

}