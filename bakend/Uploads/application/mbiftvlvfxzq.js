
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home';
import ProductScreen from './Components/ProductScreen';
import LoginScreen from './Components/LoginScree';
import RegisterUser from './Components/RegisterUser';
import AddtoCart from './AddtoCart';
import { useState } from 'react';
import ShippingScreen from './ShippingScreen';
import PaymentScreen from './Components/PaymentScreen';
import PlaceOrder from './Components/PlaceOrder';



function App() {

  const [appState, setappState] = useState({})
  const [cartItems, setcartItems] = useState([])
  const [token, setToken] = useState()
  const [user, setUser] = useState()
  return (
    <BrowserRouter>
      <div>
        <Header token={token} setToken={setToken} user={user} setUser={setUser} appState={appState} cartItems={cartItems} setcartItems={setcartItems} />

        <main className="p-2" style={{ minHeight: "83.2vh" }}>

          <Routes>


            <Route path="/" element={Home()} />
            <Route path="/register" element={<RegisterUser setUser={setUser} setToken={setToken}/>} />
            <Route path="/login" element={<LoginScreen setUser={setUser} setToken={setToken}/>} />
            <Route path="/product/:id" element={<ProductScreen setappState={setappState} setcartItems={setcartItems} />} />
            <Route path="/cart" element={<AddtoCart cartItems={cartItems} setcartItems={setcartItems}/>} />
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/paymentMethod" element={<PaymentScreen />} />
            <Route path="/checkout" element={<PlaceOrder />} />


          </Routes>
        </main>




        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
