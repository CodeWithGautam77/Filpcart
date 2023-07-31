import mongoose from "mongoose";

class adminUserModel{
    constructor(){
        this.schema = new mongoose.Schema({
            fullName:{type:String,require:true},
            email:{type:String,require:true,unique:true},
            password:{type:String,require:true},
            roll:{type:String,require:true}
        },{timestamps:true})
    }
}

const Admin = new adminUserModel()

const AdminUserModel = mongoose.model("tbl_Admin",Admin.schema)

export default AdminUserModel