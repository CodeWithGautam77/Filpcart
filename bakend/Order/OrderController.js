import Razorpay from "razorpay"
import DeliveryDay from "../Constant.js"
import orderModel from "./OrderModel.js"

function CreateRazorPayOrder(options) {
    return new Promise((resolve, reject) => {
        var instance = new Razorpay({
            key_id: process.env.API_KEY,
            key_secret: process.env.KEY_SECRATE
        });
        instance.orders.create(options, (err, order) => {
            if (err) return reject(err)
            resolve(order)
        })
    })
}

class OrderController {

    async CreateOrder(req, res) {
        try {
            const { products, paymentMethod, shippingAddress, userInfo, totalPrice } = req.body

            if (!products) { return res.status(500).send({ message: "Missing dependency products" }) }
            if (!paymentMethod) return res.status(500).send({ message: "Missing dependency paymentMethod" })
            if (!shippingAddress) return res.status(500).send({ message: "Missing dependency shippingAddress"})
            const deliveryDate = new Date()
            deliveryDate.setDate(deliveryDate.getDate() + DeliveryDay)
            const OrderDetails = {
                products,
                paymentMethod,
                shippingAddress,
                user: userInfo,
                deliverdIn: deliveryDate,
                totalPrice
            }
            let order = await orderModel.create(OrderDetails)
            order = { ...order._doc, RazorpayDetails: null }
            if (paymentMethod === "cod") {
                if (!order) return res.status(500).send({ message: "Somthing went wrong"})
                return res.status(200).send({ message: "Success", order })
            } else {
                const options = {
                    amount: totalPrice,
                    currency: "INR",
                    receipt: "recpt_id" + order._id
                }
                const RazorPayResult = await CreateRazorPayOrder(options)
                if (!RazorPayResult) return res.status(500).send({ message: "Somthing Went wrong" })
                order = {
                    ...order,
                    RazorPayDetails:{...RazorPayResult, apikey:process.env.API_KEY}
                }
                return res.status(200).send({ message: "Success", order })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).send({ message: "Somthing went wrongdddd" })
        }
    }

    async PaymentVerify(req,res){
        try {
            
            const {razorpay_order_id,razorpay_payment_id} = req.body

        } catch (error) {
            console.log(error)
            return error
        }
    }

    async getOrder(req, res) {
        try {
            const result = await orderModel.find({"user_id":req.body.userInfo._id})
            if (result) {
                return res.status(200).send({ message: "Sucess", order: result })
            }
            return res.status(500).send({ message: "Somthing Went wrong" })
        } catch (error) {
 
            return res.status(500).send({ message: "Somthing went wrong" })
        }
    }

  async getOrderbyId(req,res){
        try {
            const {id} = req.params
            if(!id){
              return  res.status(400).send({message:"Bad Request"})
            }
            const result = await orderModel.findById({_id:id})
            if(result){
                return res.status(200).send({message:"Sucess", order:result})
            }
            return res.status(500).send({message:"Somthing went wrong"})
        } catch (error) {
            console.log(error)
            return res.status(500).send({message:"Internal"})
        }
   }
}

const orderController = new OrderController()

export default orderController