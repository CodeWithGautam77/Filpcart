export default function CheckoutSteps (props){

    const {singin, shipping, payment, placeorder} = props


    return(
        <>
        <div className="row check">
            <div className="col-3 px-0" style={{paddingTop:"5px",borderTop: singin ? "5px solid red" : "5px solid gray"}}>
                
                <h5 style={{color:singin ? "red" : "gray"}}>Signin</h5>
            </div>
            <div className="col-3 px-0" style={{paddingTop:"5px",borderTop: shipping ? "5px solid red" : "5px solid gray"}}>
                <h5 style={{color:shipping ? "red" : "gray"}}>Shipping</h5>
            </div>
            <div className="col-3 px-0" style={{paddingTop:"5px",borderTop: payment ? "5px solid red" : "5px solid gray"}}>
                <h5 style={{color:payment ? "red" : "gray"}}>Payment</h5>
            </div>
            <div className="col-3 px-0" style={{paddingTop:"5px",borderTop: placeorder ? "5px solid red" : "5px solid gray"}}>
                <h5 style={{color:placeorder ? "red" : "gray"}}>Place  order</h5>
            </div>
        </div>
    
        </>
    )
}