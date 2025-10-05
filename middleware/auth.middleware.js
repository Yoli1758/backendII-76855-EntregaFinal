import passport from "passport";
import { CartRepository } from '../app/repositories/cart.repository.js'


export const requiereJwtCookie = passport.authenticate("jwt", { session: false });


export function onlyRole(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (!user) return res.status(401).json({ status: "error", message: "User not authenticated" })
    if (!roles.includes(user.role)) return res.status(403).json({ status: "error", message: "Access denied" })
    next();
  }
}

export async function tryGetUser(req, res, next) {
  passport.authenticate("jwt", { session: false }, async (err, user) => {
    if (user) {
      const plainUser = user.toObject ? user.toObject() : user;
      res.locals.user = plainUser;
      res.locals.isAdmin = plainUser.role === "admin";
      res.locals.isGenericAdmin = plainUser.first_name === "Admin";

      const cart = await CartRepository.getCartById(plainUser.cart._id);
      res.locals.cartCount = cart
        ? cart.products.reduce((acc, p) => acc + p.quantity, 0)
        : 0;

    }
    next();
  })(req, res, next);
}

