import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from './Dashboard/dasboard';
import AuthRoutes from './routes/Auth';
import ProtectedRoutes from './routes/ProtectedRoutes';
import PublicRoutes from './routes/PublicRoutes';

import "./App.css";
import { ROUTES } from './utils/routes';
import AddProduct from './Seller/addproduct';
import SellerDashboard from './Seller/sellerdasboard';
import PurchaserDashboard from './Purchaser/purchaserdashboard';

function App() {
  const [joined, setJoined] = useState(false);
//  const token= localStorage.getItem("adminToken");
 const [user, setUser]= useState(localStorage.getItem("adminToken"))

 useEffect(()=>{
  if(!user)
  {
    setUser(localStorage.getItem("adminToken"))
  }
 }, [user])

//  debugger
  return (
    <div className="App">
       <Router>

       <PublicRoutes/>
       <Routes>
        <Route path="/product" element={<AddProduct/>}></Route>
        <Route path="/sellerdashboard" element={<SellerDashboard/>}></Route>
        <Route path="/purchaserdashboard" element={<PurchaserDashboard/>}></Route>
       </Routes>

        {!user ? (
          <AuthRoutes />
        ) : (
          <ProtectedRoutes/>
        )}
      </Router>

    </div>
  );
}

export default App;
