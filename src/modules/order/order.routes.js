import { Router } from "express";
import { createPayosPayment, returnConfirmPayment } from "./order.controller.js";


const orderRoute = Router();

orderRoute.post("/createPayOs", createPayosPayment);
orderRoute.get("/returnPayOs", returnConfirmPayment)

export default orderRoute;
