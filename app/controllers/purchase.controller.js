import { PurchaseService } from "../service/purchase.service.js";
import { UserService } from "../service/user.service.js";
import { sendPurchaseMail } from '../../config/db/mailer.js'
import { CartService } from "../service/cart.service.js";
import { CartRepository } from "../repositories/cart.repository.js";

export class PurchaseController {
    static async createPurchase(req, res) {
        const userId = req.user._id;
        try {
            const user = await UserService.getUserById(userId)
            if (!user || !user.cart) {
                return res.status(404).json({ error: "Cart not found for this user" });
            }
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
            if (rejectedProducts.length > 0) {
                await CartService.keepRejected(user.cart, rejectedProducts)

            } else {
                await CartService.deleteProductsCart(user.cart._id)
            }
            const html = `
            <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>¡Gracias por tu compra, ${user.first_name}!</h2>
            <p>Este es tu ticket de compra: <b>${ticket.code}</b></p>
            <p><b>Total:</b> $${ticket.total.toFixed(2)}</p>
            <p><b>Estado:</b> ${ticket.status}</p>
       
            <h3>🧾 Detalle de productos</h3>
            <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%;">
            <thead style="background-color:#f5f5f5;">
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio unitario</th>
                    <th>Subtotal</th>
                </tr>
            </thead>
            <tbody>
               ${ticket.products.map(p => `
                <tr>
                  <td>${p.title}</td>
                  <td>${p.quantity}</td>
                  <td>$${p.unitPrice.toFixed(2)}</td>
                  <td>$${p.subtotal.toFixed(2)}</td>
                </tr>
              `).join("")}
            </tbody>
            </table>
            <br>
           <p>Gracias por confiar en nosotros 💚</p>
           </div>
      `;
            await sendPurchaseMail(user.email, "Confirmación de compra", html);

            const updatedCart = await CartRepository.getCartById(user.cart._id);
            const cartCount = updatedCart
                ? updatedCart.products.reduce((acc, p) => acc + p.quantity, 0)
                : 0;

            return res.json({
                success: true,
                ticket,
                rejectedProducts,
                cartCount,

            });

        } catch (error) {
            res.status(500).json({ status: "error", error: error.message })
        }
    }
}