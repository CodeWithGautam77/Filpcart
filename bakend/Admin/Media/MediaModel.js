import mongoose from "mongoose";

class MediaModel{
    constructor(){
        this.schema = mongoose.Schema({
            name:{type:String,require:true},
            mimetype:{type:String,require:true},
            ext:{type:String,require:true},
            path:{type:String,require:true},
            size:{type:String,require:true},
            renderSize:{type:String,default:null},
            uploadedby:{type:String,default:null},
            filepurpose:{type:String,default:null}
        },{timestamps:true})
    }    
}

const  media = new MediaModel()

const mediamodel = mongoose.model("tbl_media", media.schema)

export default mediamodel