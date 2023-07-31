const loadRazorpay = () => {
    return new Promise((resolve)=> {
        const script = document.createElement("script")
        script.src = 'https://checkout.razorpay.com/v1/checkout.js'
        script.async = true
        script.onload = () => {
            resolve(window.Razorpay)
        }
        document.body.appendChild(script)        
    })

    }

export default  async function handelPayment(paymentOptions){
    const razorpay = await loadRazorpay()
    console.log(paymentOptions)
    const options = {
        key : paymentOptions.apikey,
        amount :paymentOptions.amount,
        currency:paymentOptions.currency,
        name:"Flipkart",
        description:"Test Payment",
        order_id:paymentOptions.razorpayOrderid,
        handler: async function (response){
            console.log(response);
        },
        prefill:{
            name:paymentOptions.name,
            contact:paymentOptions.phone
        },
        notes:{
            address:paymentOptions.Address
        },
        theme:{
            color:"#000"
        },
        payment_method:{
            card:true,
            netbanking:true,
            wallet:true,
            upi:true
        }
    }

    const paymentObject = new razorpay(options)
    paymentObject.open();
}