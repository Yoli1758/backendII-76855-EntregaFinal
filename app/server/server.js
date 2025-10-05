import express from 'express'
import { config } from '../../config/db/config.js'
import { connectionMongoDB } from '../../config/db/db.config.js'
import passport from "passport";
import authRouter from "../../routes/auth.routes.js";
import userRouter from "../../routes/user.routes.js";
import productRouter from '../../routes/product.routes.js';
import cartRouter from '../../routes/cart.routes.js'
import purchaseRouter from '../../routes/purchase.routes.js'
import viewRouter from '../../routes/views.routes.js'
import adminRouter from '../../routes/admin.routes.js'
import profileRouter from '../../routes/profile.routes.js'
import { initPassport } from "../../config/auth/passport.js";
import { User } from '../../config/models/user.model.js'
import { Cart } from "../../config/models/cart.model.js";
import { hashPassword } from '../../utils/crypto.js'
import cookieParser from "cookie-parser";
import hbs from "express-handlebars"

import path from "path";
import { fileURLToPath } from "url";
import methodOverride from 'method-override'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../../public/")))

const hbsHelpers = {
    eq:(a, b) => a === b,
    multiply: (a, b) => a * b,
    reduceQuantities: (products) => {
        return products.reduce((acc, p) => acc + p.quantity, 0);
    },
    calculateTotal: (products) => {
        return products.reduce((acc, p) => acc + (p.quantity * p.productId.price), 0);
    },
  
}



app.use(cookieParser())
initPassport();
app.use(passport.initialize());
app.use(methodOverride('_method'))

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
       
        app.engine("handlebars", hbs.engine({
            defaultLayout: 'main',
            layoutsDir: path.join(__dirname, '../../views/layouts'),
            partialsDir: path.join(__dirname, '../../views/partials'),
            helpers:hbsHelpers
        }));
        app.set("view engine", "handlebars");
        app.set("views", path.join(__dirname, "../../views"))


        app.use("/auth/", authRouter);
        app.use("/user/", userRouter);
        app.use("/products", productRouter);
        app.use("/cart/", cartRouter);
        app.use("/purchase", purchaseRouter);
        app.use("/profile/",profileRouter);
        app.use("/", viewRouter);
        app.use("/", adminRouter);

        app.use((req, res) => {
            res.status(404).json({ error: "Page Not Found!" });
        })
        app.listen(config.port, () => console.log(`✅ Server running on  http://localhost:${config.port}`));

    } catch (error) {
        console.error("Error connecting to MongoDB", error);
    }
}