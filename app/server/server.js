import express from 'express'
import { config } from '../../config/db/config.js'
import { connectionMongoDB } from '../../config/db/db.config.js'
import passport from "passport";
import path from "path";
import authRouter from "../../routes/auth.routes.js";
import userRouter from "../../routes/user.routes.js";
import productRouter from '../../routes/product.routes.js';
import cartRouter from '../../routes/cart.routes.js'
import purchaseRouter from '../../routes/purchase.routes.js'

import { initPassport } from "../../config/auth/passport.js";
import { User } from '../../config/models/user.model.js'
import { Cart } from "../../config/models/cart.model.js";
import { hashPassword } from '../../utils/crypto.js'
import cookieParser from "cookie-parser";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
initPassport();
app.use(passport.initialize());


const createAdmin = async () => {
    const exitsAdmin = await User.findOne({ email: config.adminEmail })
    if (!exitsAdmin) {
        const hash = hashPassword(config.adminPass)
        const cart = await Cart.create({ products: [] });
        await User.create({
            first_name: "Admin",
            last_name: "Principal",
            email: config.adminEmail,
            password: hash,
            age: 35,
            cart: cart._id,
            role: "admin",
        });
        console.log(`👑 Admin initial created: ${config.adminEmail}`)
    }
}





export const startServer = async () => {
    try {
        const connected = await connectionMongoDB();
        if (!connected) console.warn("⚠️ MongoDB not connected");

        createAdmin();


        app.use("/auth/", authRouter);
        app.use("/user/", userRouter);
        app.use("/products",productRouter);
        app.use("/cart/",cartRouter);
        app.use("/purchase",purchaseRouter);


        app.listen(config.port, () => console.log(`✅ Server running on  http://localhost:${config.port}`));

    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}