import { PurchaseService } from "../service/purchase.service.js";
import { UserService } from "../service/user.service.js";
import { sendPurchaseMail } from '../../config/db/mailer.js'

export class PurchaseController {
    static async createPurchase(req, res) {
        const userId = req.user._id;
        try {
            console.log("id del usuario en purchaseController", userId)
            const user = await UserService.getUserById(userId)

            console.log("user:", user)
            if (!user || !user.cart) {
                return res.status(404).json({ error: "Cart not found for this user" });
            }
            console.log("cartid", user.cart)

            const { ticket, rejectedProducts } = await PurchaseService.createPurchase(
                user.cart,
                `${user.first_name} ${user.last_name}`,
                user.email
            );
            if (!ticket) {
                return res.status(400).json({
                    error: "ticket not generated. cart is empty",
                    rejectedProducts,
                });
            }
            const html = `
        <h2>¡Gracias por tu compra, ${user.first_name}!</h2>
        <p>Este es tu ticket de compra: <b>${ticket.code}</b></p>
        <p>Total: <b>$${ticket.total.toFixed(2)}</b></p>
        <p>Estado: ${ticket.status}</p>
      `;
            await sendPurchaseMail(user.email, "Confirmación de compra", html);

            return res.json({ status: "success", ticket, rejectedProducts });
        } catch (error) {
            console.log("❌ Error en createPurchase:", error);
            res.status(500).json({ status: "error", error: error.message })
        }
    }
}