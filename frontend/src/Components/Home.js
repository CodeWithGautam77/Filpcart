import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import apiHelper from "../Coman/ApiHelper";
import Loder from "./Loder";
import ErrorBox from "./ErrorBox";






export default function Home() {

    const [loding , setloding] = useState(false)
    const [Products, setProducts] = useState([])
    // eslint-disable-next-line
    const [error, seterror] = useState("")


    const GetProducts = async () => {
        try {
            setloding(true)
            const result = await apiHelper.FethProducts()
            if(result.status === 200){
                setProducts(result.data.products)
            }
            setloding(false)
        } catch (error) {
            setloding(false)
            console.log(error)
            if(error.response && error.response.data.message){
                return seterror(error.response.data.message)
            }

            seterror(error.message)
        }
    }

    useEffect(()=>{
        GetProducts()
        // eslint-disable-next-line
    },[])

    return (
        <>
            <main style={{ minHeight: "83.8vh" }} id="main">
                <ErrorBox error={error} seterror={seterror}/>
                <Loder isLoding={loding}/>
                <div className="container py-3">
                    <h4 className="head px-3">Trending Products</h4>
                    <div className="d-flex flex-wrap gap-3 justify-content-center align-items-center">
                    
                            {
                            Products && Products.map((x) => {
                                return <ProductCard key={x._id} product={x}/>
                            })
                        }
                        

                    </div>
                </div>

            </main>
        </>
    )
}