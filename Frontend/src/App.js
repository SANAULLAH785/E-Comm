import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Dashboard from './Dashboard/dasboard';
import AuthRoutes from './routes/Auth';
import ProtectedRoutes from './routes/ProtectedRoutes';
import PublicRoutes from './routes/PublicRoutes';

import "./App.css";

function App() {
  const [joined, setJoined] = useState(false);
//  const token= localStorage.getItem("adminToken");
 const [user, setUser]= useState(localStorage.getItem("adminToken"))
 debugger

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
