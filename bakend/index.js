import express, { json } from "express";
import ConnectDb from "./Connetion.js";
import productController from "./Product/ProductController.js";
import cors from "cors"
import userController from "./User/UserController.js";
import authController from "./Autho/AuthController.js";
import orderController from "./Order/OrderController.js";
import AdminRouter from "./Admin/AdminRouter.js";
import fileUpload from "express-fileupload";


const App = express()
ConnectDb()

App.use(cors())
App.use(json())

App.get("/",(req,res)=> {
  return  res.status(200).send({message:"Success"})
})

App.use(fileUpload())
App.use("/file",express.static("./Uploads"))

App.get("/product", productController.getProduct)
App.get("/product/:id", productController.getProductbyId)
App.post("/cart", productController.GetCart)

App.post("/register", userController.RegisterUser)
App.post("/user/login", userController.UserLogin)

App.post("/neworder", authController.CreateOrderAuth, orderController.CreateOrder)
App.post("/payment/verify" , authController.CreateOrderAuth, orderController.PaymentVerify)

App.use("/admin",AdminRouter)


App.listen(5000, () => {
    console.log("Server Started")
})