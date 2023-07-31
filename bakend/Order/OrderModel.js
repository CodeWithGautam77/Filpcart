import mongoose from "mongoose";

class OrderModel{
    constructor(){
        this.schema = mongoose.Schema({
            user:{type:Object, require:true},
            shippingAddress:{type:Object,require:true},
            products:{type:Array, require:true},
            paymentMethod:{type:String, require:true, default:"cod"},
            paymentStatus:{type:String, require:true, default:"pending"},
            delivaryStatus:{type:String, require:true, default:"pending"},
            totalPrice:{type:Number, require:true},
            deliverdIn:{type:Date, require:true}
        },{timestamps:true})
    }
}

const order = new OrderModel()

const orderModel = mongoose.model("tbl_order", order.schema)

export default orderModel