import mongoose from "mongoose";

class UserModel{
    constructor(){
        this.schema = mongoose.Schema({
            firstName:{type:String, require:true,length:20},
            lastName:{type:String, require:true,length:20},
            phone:{type:Number, require:true, length:10,default:null},
            email:{type:String, require:true, unique:true},
            password:{type:String, require:true},
            isAdmin:{type:Boolean, require:true,default:false}
        },{timestamp:true})
    }
}

const User = new UserModel()
const userModel = mongoose.model("tbl_user",User.schema)

export default userModel