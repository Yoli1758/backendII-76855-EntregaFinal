import mongoose from "mongoose";

const cartCollection = "Cart";

const cartSchema = new mongoose.Schema({
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
            },
            quantity: {
                type: Number,
                default: 1
            }
        }]


}, { versionKey: false, timestamps: true })

export const Cart = mongoose.model(cartCollection, cartSchema);