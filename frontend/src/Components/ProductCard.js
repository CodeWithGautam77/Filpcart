import { Link } from "react-router-dom"
import Rating from "./Rating"

export default function ProductCard(props) {

    const { product } = props

    return (
        <>
            <Link to={`/product/${product._id}`} id="Link">
            <div className="card" style={{width: "18rem"}}>
                <img src={product.image} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title W1">{product.name}</h5>
                        <h6>--Product Details--</h6>
                        <div className="d-flex justify-content-between px-3">
                            <span>Category</span>
                            <span className="fw-bold">{product.category}</span>
                        </div>
                        <div className="d-flex justify-content-between px-3">
                            <span >Brand</span>
                            <span className="fw-bold brand">{product.brand}</span>
                        </div>
                        <div className="d-flex justify-content-between px-3">
                            <span>Price</span>
                            <span className="fw-bold"><span>$</span>{product.price}</span>
                        </div>
                        <div className="d-flex justify-content-between px-3">
                            <span>10</span>
                            <span className="fw-bold text-warning"><Rating rating={product.rating}/></span>
                        </div>
                    </div>
                   
            </div>
            </Link>
        </>
    )
}