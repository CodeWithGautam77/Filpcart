import jwt from "jsonwebtoken"


class AuthController{

    async CreateOrderAuth(req, res, next){
        try {
            // console.log(req);
            const token  = req.headers.token
            if(!token) return res.status(400).send({message: "Unauthrized"})

            return jwt.verify(token, process.env.JWT_SECRATE, (err, data) => {
                if(data){
                    req.body.userInfo = data
                    return next()
                }
                if(err){
                    console.log(err);
                    return res.status(400).send({message:"Unauthrized"})
                }
            })  

        } catch (error) {
            console.log(error);
            return res.status(500).send({message: "Internal server error"})
        }
    }
}

const authController = new AuthController()
export default authController