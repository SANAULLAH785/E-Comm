import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from './Components/HomePage/HomePage';
import AuthRoutes from './routes/Auth';
import ProtectedRoutes from './routes/ProtectedRoutes';
import PublicRoutes from './routes/PublicRoutes';

import "./App.css";
import { ROUTES } from './utils/routes';
import AddProduct from './Components/Seller/addproduct';
import SellerDashboard from './Components/Seller/sellerdasboard';
import PurchaserDashboard from './Components/Purchaser/purchaserdashboard';
import CartPage from './Components/Cart/CartPage';

function App() {
  const [joined, setJoined] = useState(false);
  const [cart, setCart] = useState([]);
  //  const token= localStorage.getItem("adminToken");
  const [user, setUser] = useState(localStorage.getItem("adminToken"))
  
  useEffect(() => {
    if (!user) {
      setUser(localStorage.getItem("adminToken"))
    }
  }, [user])

  //  debugger
  return (
    <Router>
      <div className="App">

      <PublicRoutes setCart={setCart} cart={cart} /> 
        <Routes>
          <Route path="/product" element={<AddProduct />}></Route>
          <Route path="/seller/dashboard" element={<SellerDashboard />}></Route>
          <Route path="/purchaser/dashboard" element={<PurchaserDashboard />}></Route>
          <Route path="/cart" element={<CartPage cart={cart} />} /> 

        </Routes>

        {!user ? (
          <AuthRoutes />
        ) : (
          <ProtectedRoutes />
        )}
      </div>

    </Router>

  );
}

export default App;
