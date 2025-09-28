import mongoose from "mongoose";

const ticketCollection = "Ticket";

const ticketsItemSchema = new mongoose.Schema({
    productId:{type:mongoose.Schema.Types.ObjectId,ref:"Product"},
    title:{type:String,required:true},
    quantity:{type:Number,required:true,min:1},
    unitPrice:{type:Number,required:true,min:0},
    subtotal:{type:Number,required:true,min:0}
},{_id:false})



const ticketSchema = new mongoose.Schema({
    code:{type:String,required:true,unique:true,index:true},
    purchase_datetime:{type:Date,default:Date.now},
    buyerName:{type:String,required:true},
    buyerEmail:{type:String,required:true},
    products:{type:[ticketsItemSchema],default:[]},
    total:{type:Number,min:0,default:0},
    status:{
        type:String,
        enum:["pendig","paid","delivered","cancelled"],
        default:"pending",
        index:true
    },

}, { versionKey: false, timestamps: true })

export const Ticket = mongoose.model(ticketCollection, ticketSchema);