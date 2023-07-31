import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer.js';
import Header from './Components/Header.js';
import Home from './Components/Home.js';
import ProductScreen from './Components/ProductScreen.js';
import LogInScreen from './Components/LogInScreen.js';
import Registation from './Components/Registation.js';
import AddtoCart from './Components/CartScreen';
import { useState } from 'react';
import ShippingScreen from './Components/ShippingScreen';
import PaymentScreen from './Components/PaymentScreen';
import PlaceOrder from './Components/PlaceOrder';
// import { useState } from 'react';

function App() {

  const [appState, setappState] = useState({})
  const [cartItems, setcartItems] = useState([])
  const [token, setoken] = useState()
  const [user, setuser] = useState()

  return (
    <BrowserRouter>
      <div>
        <Header appState={appState} setappState={setappState} cartItems={cartItems} setcartItems={setcartItems} token={token} setoken={setoken} user={user} setuser={setuser}/>
        <main style={{ minHeight: "83.8vh" }}>

          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/product/:id" element={<ProductScreen setappState={setappState} setcartItems={setcartItems}/>}/>
            <Route path="/login" element={<LogInScreen  setuser={setuser} setoken={setoken}/>}/>
            <Route path="/register" element={<Registation setuser={setuser} setoken={setoken}/>}/>
            <Route path="/cart" element={<AddtoCart cartItems={cartItems} setcartItems={setcartItems}/>}/>
            <Route path="/shipping" element={<ShippingScreen/>}/>
            <Route path="/paymentMethod" element={<PaymentScreen/>}/>
            <Route path="/placeorder" element={<PlaceOrder cartItems={cartItems} setcartItems={setcartItems}/>}/>
          </Routes>

        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
