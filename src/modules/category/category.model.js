import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema({
    title: {
        type: String,
        unique: true, // khong trung nhau
        require: true // khong bo trong
    },
    description: {
        type: String,
    },
    slug:{
        type: String,
        unique: true,
        require: true
    },
    deletedAt: {
        type: Date,
        default: null
    }
},{versionKey: false, timestamps: true})
export default mongoose.model("Category", categorySchema)