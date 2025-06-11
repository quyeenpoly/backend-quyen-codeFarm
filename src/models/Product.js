import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        unique: true,
        require: true
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        require: true,
    },
    sale_price: {
        type: Number,
        default: null
    },
    sale_end: {
        type: Date,
        default: null
    },
    status: {
        type: Number,
        default: 1
    },
    image: {
        type: String,
        require: true
    },
    deleteAt: {
        type: Date,
        default: null
    },
    category_id: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
},{versionKey: false, timestamps: true})
export default mongoose.model("Product", productSchema)