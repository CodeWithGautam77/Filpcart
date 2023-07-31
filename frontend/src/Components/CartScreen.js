import { useEffect, useState } from "react"
import apiHelper from "../Coman/ApiHelper"
import { useNavigate } from "react-router-dom"
import ErrorBox from "./ErrorBox"
import Loder from "./Loder"

export default function AddtoCart(props) {

    const [Error, setError] = useState("")
    const [loding, setloding] = useState(false)
    const navigate = useNavigate()
    const [cart, setcart] = useState([])
    const [SummaryDetails, setSummaryDetails] = useState({
        totalAmount: 0,
        totalItems: 0,
        delivery: 0,
        text: 0
    })
    let { cartItems, setcartItems } = props

    useEffect(() => {
        // eslint-disable-next-line
        cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
        setcartItems(cartItems)
        // eslint-disable-next-line
    }, [])


    const getCart = async () => {
        try {
            setloding(true)
            const products = cartItems.map((x) => x.product)

            const result = await apiHelper.FetchCart(products)

            const inStockItems = result.data?.products

            for (let i in inStockItems) {
                for (let j in cartItems) {
                    if (cartItems[j].product === inStockItems[i]._id) {
                        inStockItems[i].qty = cartItems[j].qty
                    }
                }
            }

            setcart(inStockItems)
            setloding(false)
        } catch (error) {
            setcart([])
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message)
            }
            setloding(false)
            setError(error.message)
            return
        }
    }

    useEffect(() => {
        getCart()
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        let i = 0
        let totalPrice = 0
        let totalItems = 0
        let totalProducts = 0

        while (i < cart.length) {
            if (cart[i].countInstock > 0) {
                totalItems += cart[i].qty
                totalPrice += (cart[i].qty * cart[i].price)
                totalProducts++

            }
            i++
        }

        setSummaryDetails({ ...SummaryDetails, totalItems: totalItems, totalAmount: totalPrice, totalProducts: totalProducts })
        // eslint-disable-next-line
    }, [cart])


    const RemoveHandler = (id) => {
        cartItems = cartItems.filter((x) => x.product !== id)
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        setcartItems(cartItems)
        getCart()
    }


    const CheckOutHandler = () => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login?redirect=shipping")
        } else {
            navigate("/shipping?redirect=paymentMethod")
        }

        console.log(token)

    }


    return (
        <>
            <ErrorBox error={Error} seterror={setError} />
            <Loder isLoding={loding} />
            <section className="h-100 gradient-custom">
                <div className="container py-5">
                    <div className="card-header py-3">
                        <h5 className="mb-0 text-center">Cart Items</h5>
                    </div>
                    {
                        cart.length <= 0 ? (
                            <div className="w-100 bg-dark text-center" style={{ height: "100vh" }}>
                                <img src="https://www.99fashionbrands.com/wp-content/uploads/2020/12/empty_cart.png" style={{ width: "1000px", height: "100%" }} alt="Crased"></img>
                            </div>
                        ) : (cart && cart.map((x, key) => {
                            return <div key={x._id} className="row d-flex justify-content-center my-4">
                                <div className="col-md-12">
                                    <div className="mb-4">

                                        <div className="card-body">

                                            <div className="row">
                                                <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">

                                                    <div className="bg-image hover-overlay hover-zoom ripple rounded" data-mdb-ripple-color="light">
                                                        <img src={x.image} className="w-100 rounded" alt="" />
                                                        <a href="#!">
                                                            <div className="mask" style={{ backgroundColor: "rgba(251, 251, 251, 0.2)" }}></div>
                                                        </a>
                                                    </div>

                                                </div>

                                                <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">

                                                    <p className="fs-5">Product Name:<strong className="fs-5" id="N1">{x.name}</strong></p>
                                                    <p>Brand:<strong>{x.brand}</strong></p>
                                                    <p>Price:<strong>${x.price}</strong></p>
                                                    <p>Status:<strong className={x.countInstock > 0 ? "text-success" : "text-danger"}>{x.countInstock > 0 ? "In Stock" : "Out of stock"}</strong></p>

                                                    <button className="btn btn-danger btn-sm me-1 mb-2" onClick={() => RemoveHandler(x._id)}>
                                                        <i className="fas fa-trash"></i>
                                                    </button>

                                                </div>

                                                <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">

                                                    <div className="d-flex align-items-center mb-4 gap-2" style={{ maxWidth: "300px" }}>

                                                        <p className="p-0 m-0">Quantity:</p>
                                                        <select disabled={x.countInstock <= 0} value={x.qty} className="bg-gradient bg-light rounded"
                                                            onChange={
                                                                (e) => {
                                                                    cart[key].qty = Number(e.target.value)
                                                                    setcart([...cart])

                                                                    let tmp = cart.map((x) => {
                                                                        return {
                                                                            product: x._id,
                                                                            qty: x.qty
                                                                        }
                                                                    })
                                                                    localStorage.setItem("cartItems", JSON.stringify(tmp))
                                                                }
                                                            }
                                                        >
                                                            {
                                                                [...new Array(x.countInstock).keys()].map((n) => (
                                                                    <option value={n + 1} key={n + 1}>{n + 1}</option>
                                                                ))
                                                            }
                                                        </select>

                                                    </div>


                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                </div>




                            </div>
                        }))
                    }


                    <div className="col-md-4">
                        <div className="mb-4">
                            <div className="card-header py-3">
                                <h5 className="mb-0">Summary</h5>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush">
                                    <li
                                        className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                        Total Products
                                        <span>{cartItems.length}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between align-items-center px-0">
                                        Total Items
                                        <span>{SummaryDetails.totalItems}</span>
                                    </li>
                                    <li
                                        className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                        <div>
                                            <strong>Total amount</strong>
                                            <strong>
                                                <p className="mb-0">(including VAT)</p>
                                            </strong>
                                        </div>
                                        <span><strong>${SummaryDetails.totalAmount}</strong></span>
                                    </li>
                                </ul>

                                <button onClick={CheckOutHandler} disabled={cart.length === 0} className="btn btn-primary btn-lg btn-block">
                                    Go to checkout
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}