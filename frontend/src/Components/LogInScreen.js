import { useState } from "react"
import validation from "./Validation.js"
import apiHelper from "../Coman/ApiHelper.js"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Input from "./Input.js"
import CheckoutSteps from "./CheckoutSteps.js"
import ErrorBox from "./ErrorBox.js"
import Loder from "./Loder.js"

export default function LogInScreen() {

    const navigate = useNavigate()
    const [error, seterror] = useState("")
    const [loding, setloding] = useState(false)
    const [isSubmited, setisSubmited] = useState(false)
    const [user, setuser] = useState({email: "",password: ""})
    const [loginError, setloginError] = useState([])
    const location = useLocation()



    const redirect = location.search.split("?redirect=")[1]
    // console.log(redirect)
    // const userInfo = localStorage.getItem("token")
    // const token = localStorage.getItem("userInfo")

    // useEffect(() => {
    //     if(token && userInfo){
    //         navigate("/")
    //         return
    //     }
    //     // eslint-disable-next-line
    // },[])

    const LoginHandeler = async () => {
        try {
            setisSubmited(true)
            const ValidationResult = validation(user, "login")

            if(ValidationResult.length > 0){
                setloginError(ValidationResult)
                return
            }
            setloding(true)
            const result = await apiHelper.UserLogin(user)
            localStorage.setItem("userInfo", JSON.stringify(result.data.user))
            localStorage.setItem("token", JSON.stringify(result.data.user.token));
            setloding(false)
            if(redirect){
                navigate("/shipping?redirect=paymentMethod")
                return
            }
            navigate("/")
            // return
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data) {
                if (error.response.status === 400 && error.response.data && error.response.data.message === "Validation Error") {
                    setloginError(error.response.data.validationResult
                        )
                        return
                    }
                    seterror(error.response.data.message)
                    setloding(false)
                } else {
                seterror(error.response)
            }
        }
    }


    return (
        <section style={{position:"relative"}}>

            <div className="container py-5">
            {
                redirect && <CheckoutSteps singin={true} />
            }
                <ErrorBox error={error} seterror={seterror}/>
                <Loder isLoding={loding}/>
                <div className="row d-flex justify-content-center align-items-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="bg-white" style={{borderRadius: "1rem"}} id="shadow">
                            <div className="card-body p-5 text-center">

                                <h3 className="mb-5">Login</h3>

                                <div className="form-outline mb-4">
                                    <Input type="text" placeholder="Email" style={{padding:"8px" ,width:"100%"}} className="border rounded"
                                    onChange={(e) => {
                                        setuser({...user,email:e.target.value})
                                        if(isSubmited){
                                            const ValidationResult= validation(user,"login")
                                            setloginError(ValidationResult)
                                        }
                                    }}
                                    value={user.email}
                                    isError={loginError.find((x)=> x.key === "email")?true:false}
                                    helperText={loginError.find((x)=> x.key==="email")?.message}
                                    />
                                <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                                </div>

                                <div className="form-outline mb-4">
                                <Input type="password" placeholder="Password" style={{padding:"8px" ,width:"100%"}} className="border rounded"
                                    onChange={(e) => {
                                        setuser({...user,password:e.target.value})
                                        if(isSubmited){
                                            const ValidationResult= validation(user,"login")
                                            setloginError(ValidationResult)
                                        }
                                    }}
                                    value={user.password}
                                    isError={loginError.find((x)=> x.key === "password")?true:false}
                                    helperText={loginError.find((x)=> x.key==="password")?.message}
                                    />
                                <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                                </div>


                                <button onClick={LoginHandeler} className="btn btn-primary btn-lg btn-block" type="button">Login</button><br/>
                                <span>or</span>
                                        <br />
                                        <Link className="link" to={!redirect ? "/register" : `/register${location.search}`}>
                                            <span>Create an account</span>
                                        </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}