import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import apiHelper from "../Coman/ApiHelper"
import { useParams } from "react-router-dom"
import Rating from "./Rating"
import ErrorBox from "./ErrorBox"
import Loder from "./Loder"

export default function ProductScreen({ setappState }) {

    const { id } = useParams()
    const [Product, setProduct] = useState({})
    // eslint-disable-next-line
    const [error, seterror] = useState("")
    const [loding, setloding] = useState(false)
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
    const [count, setcount] = useState(1)
    const navigate = useNavigate()

    const GetProductbyId = async () => {
        try {
            setloding(true)
            const result = await apiHelper.FethProductbyId(id)
            if (result.status === 200) {
                setProduct(result.data.Product)
            }
            setloding(false)
        } catch (error) {
            setloding(false)
            console.log(error)
            if (error.respone && error.respone.data) {
                return seterror(error.respone.data.message)
            }
            seterror(error.message)
        }

    }

    useEffect(() => {
        GetProductbyId()
        // eslint-disable-next-line
    }, [])


    useEffect(() => {
        setcount(Product.countInstock && Product.countInstock > 0 ? 1 : 0)
    }, [Product])


    const AddtoCart = () => {
        const cart = {
            product: id,
            qty: count
        }

        const findIndex = cartItems.findIndex((x) => x.product === id)

        if (findIndex > -1) {
            cartItems[findIndex].qty = cart.qty
        } else {
            cartItems.push(cart)
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
        setappState({ CartSize: cartItems.length })
        navigate("/cart")
    }







    return (
        <>
            <ErrorBox error={error} seterror={seterror} />
            <Loder isLoding={loding} />
            <div className="container-fuild py-3" style={{ position: "relative", overflowX: "hidden" }} id="box">
                <Link to={'/'}>
                    <button className="btn btn-success m-2" id="back">Back to home</button>
                </Link>
                <div className="row py-4 px-5">
                    <div className="col-md-6 col-12">
                        <img src={Product.image} alt="" className="img-fluid w-75" />
                    </div>
                    <div className="col-md-6 col-12" >
                        <h3 className="py-2 text-center">Product Details<hr /></h3>
                        <h1 className="W1">{Product.name}</h1>
                        <div className="d-flex align-items-center gap-2 mt-4">
                            <span className="fs-4 p-0">Brand:</span>
                            <span className="fw-bold fs-4 p-0">{Product.brand}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2 mt-4">
                            <span className="fs-4 p-0">Category:</span>
                            <span className="fw-bold fs-4 p-0">{Product.category}</span>
                        </div>
                        <div className="d-flex align-items-center gap-2 mt-4">
                            <span className="fw-bold fs-4 p-0">${Product.price}</span>
                        </div>
                        <div className="mt-4 d-flex gap-2">
                            <span className="fs-4 p-0">Qty:</span>
                            <div className="d-flex align-items-center">
                                <button onClick={() => setcount(count - 1)} disabled={count <= 1} className="px-2">-</button>
                                <div className="px-4" id="counT">{count}</div>
                                <button onClick={() => setcount(count + 1)} disabled={count >= Product.countInstock} className="px-2">+</button>
                            </div>

                        </div>
                        <div className="d-flex gap-2 mt-4">
                            <span className="fs-4 p-0">Status:</span>
                            <span className={Product.countInstock > 0 ? "text-success" : "text-danger"} id="status">
                                {Product.countInstock > 0 ? "In stock" : "Out of stock"}
                            </span>
                        </div>
                        <div className="d-flex align-items-center gap-2 mt-4">
                            <span className="fs-4">Rating:</span> <span className="fw-bold fs-4 p-0 text-warning">{<Rating rating={Product.rating} />}</span>
                        </div>
                        <button className="btn w-100 mt-4 d-flex gap-3 align-items-center justify-content-center" id="btn" disabled={count <= 0} onClick={AddtoCart}>Add to cart<i class="fa-sharp fa-solid fa-bag-shopping" id="i1"></i></button>
                    </div>
                </div>
            </div>
        </>
    )
}