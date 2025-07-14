
import PayOS from "@payos/node";
import handleAsync from "../../utils/handleAsync.js";
import { PAYOS_API_KEY, PAYOS_CHECKSUM_KEY, PAYOS_CLIENT_ID } from "../../common/configs/environments.js";
import createResponse from "../../utils/response.js";
const fakeData = {
    userId: "1",
    address: "Ha Noi",
    phoneNumber: "0911392344",
    note: "Day la ghi chu",
    products: [
        {
            name: "Balo 1",
            price: 200000,
            quantity: 4,
        },
    ],
    totalPrice: 800000,
    isPaid: false,
    status: "pending"
};
const payOS = new PayOS(PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECKSUM_KEY);
export const createPayosPayment = handleAsync(async(req, res, next)=>{
    const orderCode = Number(String(Date.now()).slice(-6));
    const bodyPayos = {
        orderCode: orderCode,
        amount: fakeData.totalPrice,
        description: "Thanh toan don hang",
        items: fakeData.products,
        cancelUrl: "http://localhost:3000/cancel.html",
        returnUrl: "http://localhost:3000/success.html",

    }
    const createPaymentLink = await payOS.createPaymentLink(bodyPayos)
    return res.status(200).json(createResponse(true, 200, "Tao Link thanh cong", createPaymentLink))
})

export const returnConfirmPayment = handleAsync(async(req, res, next)=>{
    const query = req.query;
    if(query.code === "00" && query.status === "PAID"){
        const foundOrder = await Order.findOne({
            orderCode: query.orderCode,
            isPaid: false
        })
        if(!foundOrder){
            return res.redirect(`http://localhost:3000/checkout/error`)
        }
        foundOrder.isPaid = true;
        await foundOrder.save();
        return res.redirect(`http://localhost:3000/checkout/success`)
    } else{
        return res.redirect(`http://localhost:3000/checkout/error`);
    }
})