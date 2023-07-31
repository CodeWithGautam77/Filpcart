import  express  from "express";
import userController from "./User/AdminController.js";
import mediaController from "./Media/MediaController.js";

const AdminRouter = express.Router()

AdminRouter.post("/createuser", userController.CreateUser)

AdminRouter.post("/login", userController.LoginUser)

AdminRouter.get("/getuser", userController.GetUser)

AdminRouter.post("/upload", mediaController.getMedia)

AdminRouter.delete("/delete/:id",userController.DeleteUser)

AdminRouter.put("/update/user/:id", userController.UpdateUser)

export default AdminRouter

