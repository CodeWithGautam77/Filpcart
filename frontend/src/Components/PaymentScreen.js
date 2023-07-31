import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";
import { useState } from "react";

export default function PaymentScreen() {
    
    const navigate = useNavigate()
    const [paymentMethod, setpaymentMethod] = useState("online")    


    const CheckoutHandler = () => {
        if(paymentMethod === "online"){
            navigate("/placeorder?redirect=online")
        } else if(paymentMethod === "cod") {
            navigate("/placeorder?redirect=cod")
        }
    }
    
    const handlePaymentSelection = (e) => {
        setpaymentMethod(e.target.value);
      };
    
    return (
        <>
            <section className="p-4 p-md-5" >
                <CheckoutSteps singin={true} shipping={true} payment={true}/>
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <div className="bg-light px-5 rounded" id="pay-box">
                                    <h5 className="py-4 text-center">Payment Options</h5>
                                    <div className="d-flex justify-content-between align-items-center gap-5">
                                    <div className="d-flex align-items-center gap-3 py-3">
                                        <input  id="pay" type="radio" style={{height:"20px" , width:"20px"}}  value={"online"} checked={paymentMethod === "online"} onChange={handlePaymentSelection} /><p className="mb-1 p-0 fs-5">Online</p>
                                        <input  id="pay" type="radio" style={{height:"20px" , width:"20px"}}  value={"cod"} checked={paymentMethod === "cod"}  onChange={handlePaymentSelection}/><p className="mb-1 p-0 fs-5">Cash on delivery</p>
                                        {/* onClick={() => navigate("/placeorder?redirect=Onlilne")} */}
                                        {/* onClick={() => navigate("/placeorder?redirect=COD")} */}
                                    </div>
                                    
                                    </div>
                                    
                                    <button className="btn btn-warning" onClick={CheckoutHandler}>Proceed</button>
                                
                                </div>
                            </div>
                        </div>
                    </div>
            </section>

        </>
    )
}