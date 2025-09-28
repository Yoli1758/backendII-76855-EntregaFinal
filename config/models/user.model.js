import mongoose from "mongoose";

const userCollection = "User";

const userSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: {type: String, required: true,index: true},
    email: {type: String,required: true,unique: true,index: true},
    age: {type: Number,required: true},
    password: {type: String,required: true},
    cart: { type:  mongoose.Schema.Types.ObjectId,ref: 'Cart' },
    role: {type: String, enum: ["user", "admin"],default: "user"},
    resetToken:{type:String},
    resetTokenExp:{type:Date}
}, { versionKey: false, timestamps: true });



export const User = mongoose.model(userCollection, userSchema);