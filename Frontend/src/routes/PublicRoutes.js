import React from "react";

import Dashboard from "../Dashboard/dasboard";

import { Navigate, Route, Routes, Outlet } from "react-router-dom";


const PublicRoutes = () => (
  <Routes>
    <Route path='/' element={<Dashboard/>}/>
    <Route path='/about' element={<div>About</div>}/>
  </Routes>
);

export default PublicRoutes;
