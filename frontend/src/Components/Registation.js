import { Link, useLocation, useNavigate } from "react-router-dom";
import validation from "./Validation";
import { useState } from "react";
import apiHelper from "../Coman/ApiHelper";
import Input from "./Input";
import ErrorBox from "./ErrorBox";
import Loder from "./Loder";

export default function Registation() {

  const location = useLocation()
  const navigate = useNavigate()
  const [isSubmited, setisSubmited] = useState(false)
  const [error, seterror] = useState("")
  const [loding, setloding] = useState(false)
  const [user, setuser] = useState({firstName: "",lastName: "", email: "", password: "", confirmpassword: "" })
  const [registerError, setregisterError] = useState([])

  const redirect = location.search.split("?redirect=")[1]


  const RegisterHandler = async () => {
    try {
      setisSubmited(true)

      const ValidationResult = validation(user, "register")
      if (ValidationResult.length > 0) {
        setregisterError(ValidationResult)
        return
      }
      setloding(true)
      const result = await apiHelper.UserRegister(user)
      localStorage.setItem("userInfo", JSON.stringify(result.data.user))
      localStorage.setItem("token", JSON.stringify(result.data.user.token));
      setloding(false)
      if(redirect){
        navigate("/shipping?redirect=paymentMethod")
        return
      }
      navigate("/")
      return
    } catch (error) {
      setloding(false)
      if (error.response && error.response.data) {
        if (error.response.status === 400 && error.response.data && error.response.data.message === "Validation Error") {
          setregisterError(error.response.data.ValidationResult)
          return
        }
        seterror(error.response.data.message)
      } else {
        seterror(error.response)
      }
    }
  }







  return (
    <>
      <section style={{ backgroundColor: "#eee", position: "relative" }}>
        <ErrorBox error={error} seterror={seterror}/>
        <Loder isLoding={loding}/>
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-12">
              <div className="text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body">
                  <div className="row justify-content-center">
                    
                    <div className="col-md-10">

                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 text-primary">Sign up</p>

                      <form className="mx-1 mx-md-4">

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <Input type="text" placeholder="Firstname" style={{padding:"8px" ,width:"100%"}} className="border rounded"
                             onChange={(e)=>{
                              setuser({...user,firstName:e.target.value})
                              if(isSubmited){
                                const ValidationResult = validation({...user, firstName:e.target.value},"register")
                                setregisterError(ValidationResult)
                              }
                             }} 
                             value={user.firstName}
                             isError={registerError.find((x) => x.key === "firstName")?true:false}
                             helperText={registerError.find((x) => x.key === "firstName")?.message}
                             />
                            <label className="form-label" htmlF9or="form3Example1c">First Name</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                          <Input type="text" placeholder="Lastname" style={{padding:"8px" ,width:"100%"}} className="border rounded"
                             onChange={(e)=>{
                              setuser({...user,lastName:e.target.value})
                              if(isSubmited){
                                const ValidationResult = validation({...user, lastName:e.target.value},"register")
                                setregisterError(ValidationResult)
                              }
                             }} 
                             value={user.lastName}
                             isError={registerError.find((x) => x.key === "lastName")?true:false}
                             helperText={registerError.find((x) => x.key === "lastName")?.message}
                             />
                            <label className="form-label" htmlFor="form3Example1c">Last Name</label>
                          </div>
                        </div>


                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                          <Input type="email" placeholder="Email" style={{padding:"8px" ,width:"100%"}} className="border rounded"
                             onChange={(e)=>{
                              setuser({...user,email:e.target.value})
                              if(isSubmited){
                                const ValidationResult = validation({...user, email:e.target.value},"register")
                                setregisterError(ValidationResult)
                              }
                             }} 
                             value={user.email}
                             isError={registerError.find((x) => x.key === "email")?true:false}
                             helperText={registerError.find((x) => x.key === "email")?.message}
                             />
                            <label className="form-label" htmlFor="form3Example3c">Email</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                          <Input type="text" placeholder="Passwrod" style={{padding:"8px" ,width:"100%"}} className="border rounded"
                             onChange={(e)=>{
                              setuser({...user,password:e.target.value})
                              if(isSubmited){
                                const ValidationResult = validation({...user, password:e.target.value},"register")
                                setregisterError(ValidationResult)
                              }
                             }} 
                             value={user.password}
                             isError={registerError.find((x) => x.key === "password")?true:false}
                             helperText={registerError.find((x) => x.key === "password")?.message}
                             />
                            <label className="form-label" htmlFor="form3Example4c">Password</label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                          <Input type="text" placeholder="Confirm Password" style={{padding:"8px" ,width:"100%"}} className="border rounded"
                             onChange={(e)=>{
                              setuser({...user,confirmpassword:e.target.value})
                              if(isSubmited){
                                const ValidationResult = validation({...user, confirmpassword:e.target.value},"register")
                                setregisterError(ValidationResult)
                              }
                             }} 
                             value={user.confirmpassword}
                             isError={registerError.find((x) => x.key === "confirmpassword")?true:false}
                             helperText={registerError.find((x) => x.key === "confirmpassword")?.message}
                             />
                            <label className="form-label" htmlFor="form3Example4cd">Repeat your password</label>
                          </div>
                        </div>


                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="button" onClick={RegisterHandler} className="btn btn-primary btn-lg">Register</button>
                        </div>


                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <Link to={"/"}>
                            <span className="fw-bold fs-6">Alreay have an account !</span>
                          </Link>
                        </div>
                      </form>

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
