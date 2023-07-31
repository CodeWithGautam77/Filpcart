import userModel from "./UserModel.js"
import Validation from "./Validation.js"
import bcrypt from "bcrypt"
import "dotenv/config.js"
import jwt from "jsonwebtoken"


class UserController {
    async RegisterUser(req, res) {
        try {
            const ValidationResult = Validation(req.body, "register")
            if (ValidationResult.length > 0) {
                return res.status(400).send({ message: "Validation Error", ValidationResult: ValidationResult })
            }
            const { password } = req.body

            const EncodePassword = bcrypt.hashSync(password, 8)
            if (!EncodePassword) {
                return res.status(500).send({ message: "Somthign went wrong" })
            }

            req.body.password = EncodePassword
            const result = await userModel.create(req.body)
            if (!result) {
                return res.status(500).send({ message: "Somthign went wrong" })
            }

            let user = result._doc
            delete user.password

            const token = jwt.sign({ ...user }, process.env.JWT_SECRATE, { expiresIn: "30d" })
            if (!token) return res.status(500).send({ message: "Somthign went wrong" })
            return res.status(200).send({ message: "Success", user: { ...user, token: token } })
        } catch (error) {
            if (error & error.mesaage && error.mesaage.includes("E11000")) {
                return res.status(400).send({ message: "Validation Error", validationResult: [{ key: "email", message: "Email is Already exist" }] })
            }
            return res.status(400).send({ message: "Internel Server Error" })
        }
    }


    async UserLogin(req, res) {
        try {
            const { email, password } = req.body

            const ValidationResult = Validation(req.body,"login")

            if(ValidationResult.length > 0){
                return res.status(400).send({mesaage:"Validation Error", validationResult:ValidationResult})
            }

            const result = await userModel.findOne({email: email})

            if(!result){
                return res.status(400).send({mesaage:"Validation Error", validationResult:[{key:"email",mesaage:"Email not found"}]})

            }

            const user = result._doc


            if(!(bcrypt.compareSync(password, user.password))){
                return res.status(400).send({mesaage:"Validation Error", validationResult:[{key:"password",mesaage:"Email and password are not match"}]})
            }

            delete user.password
            const token = jwt.sign(user,process.env.JWT_SECRATE,{expiresIn:"30d"})

            if(!token){
                return res.status(500).send({mesaage:"Somthimg went wrong"})
            }

            user.token = token
            return res.status(200).send({ message: "Success", user: user })
        } catch (error) {
            
            console.log(error)
            return res.status(500).send({mesaage:"Internal server error"})
        }
    }
}

const userController = new UserController()

export default userController