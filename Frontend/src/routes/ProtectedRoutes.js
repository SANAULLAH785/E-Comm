import React from "react";

import { Navigate, Route, Routes, Outlet } from "react-router-dom";
import { PROTECTED_ROUTES } from "./AppRoutes";

import { ROUTES } from "../utils/routes";

let user={'role':'purchaser'}
const ProtectedRoutes = () => (
  <Routes>
    {PROTECTED_ROUTES.map((route, index) => (
     (!route.role || route.role?.includes(user.role)) &&
      (<Route key={index} path={route.path} element={route.element} exact/>
        
          
     ) ))}
    <Route
      path={ROUTES.AUTH_ROUTES.login}
      element={<Navigate to='/addProduct' replace />}
    />
    
    {/* For nested Routes Example */}

    <Route path="user" exact>
      <Route path=":id" element={<h1>User id Page</h1>}/>
      <Route path="me" element={<h1>User id me</h1>}/>
    </Route>
 {/* For nested Routes */}
    <Route path="*" element={<div>Page not Found 404 </div>} />
  </Routes>
);

export default ProtectedRoutes;
