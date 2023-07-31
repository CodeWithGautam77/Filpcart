import mongoose from 'mongoose';

class ProductModel{
    constructor(){
        this.schema = new mongoose.Schema({
            name:{type:String, require:true},
            alias:{type:String, require:true, uniqe:true},
            category:{type:String, require:true},
            image:{type:String, require:true},
            price:{type:Number, require:true},
            brand:{type:String, require:true},
            rating:{type:Number, require:true},
            numReview:{type:Number, require:true},
            discriptation:{type:String, require:true, default:null},
            countInstock:{type:Number, require:true}
        })
    }
}

const product = new ProductModel()
const productModel = mongoose.model("tbl_product",product.schema)

export default productModel
