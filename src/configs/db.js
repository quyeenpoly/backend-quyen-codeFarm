import mongoose from "mongoose";
import { DB_URI } from "./enviroments.js";

function connectDB() {
    mongoose.connect(DB_URI)
    .then(() => console.log("Kết nối mongoDB thành công !"))
    .catch(err => console.log("Kết nối mongoDB thất bại !"))

}
export default connectDB;