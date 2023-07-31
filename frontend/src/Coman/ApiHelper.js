import axios from "axios"


class ApiHelper {
    constructor() {
        this.baseUrl = "http://localhost:5000"
        this.token = JSON.parse(localStorage.getItem("token"))
    }
    FethProducts() {
        return axios.get(this.baseUrl + "/product")
    }

    FethProductbyId(id) {
        return axios.get(this.baseUrl + "/product/" + id)
    }

    UserLogin(data) {
        return axios.post(this.baseUrl + "/user/login", data)
    }

    UserRegister(data) {
        return axios.post(this.baseUrl + "/register", data)
    }

    FetchCart(products) {
        return axios.post(this.baseUrl + "/cart", { products: products })
    }


    PlaceOrder(OrderDetails){
        return axios.post(this.baseUrl+ "/neworder", OrderDetails , {headers: {token:this.token}})
    }
}

const apiHelper = new ApiHelper()

export default apiHelper