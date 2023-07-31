import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header(props) {
    const navigate = useNavigate()
    // const { token, setoken } = props
    // const { user, setuser } = props
    const { cartItems, setcartItems } = props
    const token = localStorage.getItem("token")
    const LogOutHandler = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userInfo")
        navigate("/")
    }

    const NavigateTologin = () => {
        navigate("/login")
    }
    
    useEffect(() => {
        setcartItems(JSON.parse(localStorage.getItem("cartItems") || "[]"))
        // eslint-disable-next-line
    }, [])
    return (
        <header className="bg-primary">
            <div className="d-flex justify-content-between px-5 py-2">
                <div className="logo">
                    <Link to={"/"}>
                        <h3 className="text-light fw-bold">Flipkart</h3>
                    </Link>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-3">
                    <i onClick={() => navigate("/cart")} className="fa-solid fa-cart-shopping fs-4 text-light" id="h_icon">
                        <span style={{ fontSize: "0.7rem" }} className="position-absolute right-0 translate-middle badge rounded-pill bg-danger">
                            {cartItems.length}
                        </span>
                    </i>

                    <button className="btn btn-danger" onClick={token ? LogOutHandler : NavigateTologin}>{token ? "SignOut" : "SignIn"}</button>

                </div>
            </div>
        </header>
    )
}