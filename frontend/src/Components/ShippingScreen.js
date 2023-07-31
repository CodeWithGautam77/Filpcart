import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Input from "./Input";
import validation from "./Validation";
import CheckoutSteps from "./CheckoutSteps";
import ErrorBox from "./ErrorBox";
import Loder from "./Loder";


export default function ShippingScreen() {
    const navigate = useNavigate()
    const location = useLocation()
    const [isSubmited, setisSubmited] = useState(false)
    const [shippingError, setshippingError] = useState([])
    const [error, seterror] = useState("")
    const [loding, setloding] = useState(false)
    const [address, setaddress] = useState({
        fullName: "",
        Phone: "",
        Address: "",
        City: "",
        State: "",
        PinCode: ""
    })
    const redirect = location.search.split("?redirect=")[1]


    const ShippingHandler = () => {
        try {
           
            setisSubmited(true)

            const ValidationResult = validation(address, "shipping")

            if (ValidationResult.length > 0) {
                setshippingError(ValidationResult)
                return
            }
            setloding(true)
            const userInfo = JSON.parse(localStorage.getItem("UserInfo") || "{}")
            userInfo.Address = address
            localStorage.setItem("UserInfo", JSON.stringify(userInfo))

            // navigate("/paymentMethod")
            setloding(false)
            if(!redirect){
                navigate("/cart")
            }else{
                navigate(`/${redirect}`)
            }
        } catch (error) {

            if (error.response && error.response.data) {
                if (error.response && error.response.data) {
                    if (error.response.status === 400 && error.response.data && error.response.data.message === "Validation Error") {
                        setshippingError(error.response.data.ValidationResult)
                        return
                    }
                    seterror(error.response.data.message)
                    setloding(false)
                } else {
                    seterror(error.response)
                }
            }
        }
    }



    return (
        <>
            <div className="container py-4">
                <ErrorBox error={error} seterror={seterror}/>
                <Loder isLoding={loding}/>
                <CheckoutSteps singin={true} shipping={true} />
                <div className="text-center pt-2">
                    <h1>Shipping Address</h1>
                </div>

                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <div className="w-50">
                            <p>Full Name</p>
                            <Input isError={shippingError.find((x) => x.key === "fullName") ? true : false}
                                helperText={shippingError.find((x) => x.key === "fullName")?.message}
                                type="text" className="border rounded-1 w-75" style={{ padding: "5px" }}
                                value={address.fullName}
                                onChange={(e) => {
                                    setaddress({ ...address, fullName: e.target.value })

                                    if (isSubmited) {
                                        const validationResult = validation({ ...address, fullName: e.target.value }, "shipping")

                                        setshippingError(validationResult)
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center pt-4">
                        <div className="w-50">
                            <p>Phone</p>
                            <Input isError={shippingError.find((x) => x.key === "Phone") ? true : false}
                                helperText={shippingError.find((x) => x.key === "Phone")?.message}
                                type="text" className="border rounded-1 w-75" style={{ padding: "5px" }}
                                value={address.Phone}
                                onChange={(e) => {
                                    setaddress({ ...address, Phone: e.target.value })

                                    if (isSubmited) {
                                        const validationResult = validation({ ...address, Phone: e.target.value }, "shipping")

                                        setshippingError(validationResult)
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center pt-4">
                        <div className="w-50">
                            <p>Address</p>
                            <Input isError={shippingError.find((x) => x.key === "Address") ? true : false}
                                helperText={shippingError.find((x) => x.key === "Address")?.message}
                                type="text" className="border rounded-1 w-75" style={{ padding: "5px" }}
                                value={address.Address}
                                onChange={(e) => {
                                    setaddress({ ...address, Address: e.target.value })

                                    if (isSubmited) {
                                        const validationResult = validation({ ...address, Address: e.target.value }, "shipping")

                                        setshippingError(validationResult)
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center pt-4">
                        <div className="w-50">
                            <p>City</p>
                            <Input isError={shippingError.find((x) => x.key === "City") ? true : false}
                                helperText={shippingError.find((x) => x.key === "City")?.message}
                                type="text" className="border rounded-1 w-75" style={{ padding: "5px" }}
                                value={address.City}
                                onChange={(e) => {
                                    setaddress({ ...address, City: e.target.value })

                                    if (isSubmited) {
                                        const validationResult = validation({ ...address, City: e.target.value }, "shipping")

                                        setshippingError(validationResult)
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center pt-4">
                        <div className="w-50">
                            <p>State</p>
                            <Input isError={shippingError.find((x) => x.key === "State") ? true : false}
                                helperText={shippingError.find((x) => x.key === "State")?.message}
                                type="text" className="border rounded-1 w-75" style={{ padding: "5px" }}
                                value={address.State}
                                onChange={(e) => {
                                    setaddress({ ...address, State: e.target.value })

                                    if (isSubmited) {
                                        const validationResult = validation({ ...address, State: e.target.value }, "shipping")

                                        setshippingError(validationResult)
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center pt-4">
                        <div className="w-50">
                            <p>Pin Code</p>
                            <Input isError={shippingError.find((x) => x.key === "PinCode") ? true : false}
                                helperText={shippingError.find((x) => x.key === "PinCode")?.message}
                                type="text" className="border rounded-1 w-75" style={{ padding: "5px" }}
                                value={address.PinCode}
                                onChange={(e) => {
                                    setaddress({ ...address, PinCode: e.target.value })

                                    if (isSubmited) {
                                        const validationResult = validation({ ...address, PinCode: e.target.value }, "shipping")

                                        setshippingError(validationResult)
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-center pt-4">
                        <div className="w-50">
                            <div className="btn btn-primary w-25" onClick={ShippingHandler}>Continue</div>
                        </div>
                    </div>
                </div>

            </div>

        </>
    )
}