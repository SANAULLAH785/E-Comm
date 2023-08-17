import React from "react";

import HomePage from "../Components/HomePage/HomePage";

import { Navigate, Route, Routes, Outlet } from "react-router-dom";


const PublicRoutes = ({setCart,cart}) => (

  <Routes>
    <Route path="/" element={<HomePage setCart={setCart} cart={cart} />} />
    <Route path='/about' element={<div>About</div>}/>
  </Routes>
);

export default PublicRoutes;
