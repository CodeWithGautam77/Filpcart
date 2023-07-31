import Randomstring from "randomstring";
import fs from "fs";
import mediamodel from "./MediaModel.js";

class MediaController {
    async getMedia(req,res){
        try {
            let File = req.files.file
            let {mimetype,size} = File
            let name = File.name
            let ext = name.split(".")
            ext = ext[ext.length - 1]

            name = Randomstring.generate({
                length:12,
                charset:"alphabetic"
            }).toLowerCase()
            name = name +"."+ ext
            File.name = name
            mimetype = mimetype.split("/")[0]

            if(mimetype !== "image" && mimetype !== "video"){
                mimetype = "application"
            }

            const folderName = `./Uploads/${mimetype}`

            try {
                if(!fs.existsSync(folderName)){
                    fs.mkdirSync(folderName)
                }
            } catch (error) {
                console.log(error)
            }

            const path = `./Uploads/${mimetype}/${name}`;
            const result = await File.mv(path)

            const Media = await mediamodel.create({name,mimetype,ext,path,size})
            res.json({sucess:true,media:Media})
        } catch (error) {
            console.log(error)
            res.status(500).json({sucess:false, error:"Internal Server Error"})
        }
    }
}

const mediaController = new MediaController()

export default mediaController