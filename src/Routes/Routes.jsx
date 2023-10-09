import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Importe Navigate do react-router-dom.

import Home from "../pages/Home/home";
import Dashboard from "../pages/Dashboard/dashboard";

import { Context } from "../Context/userContext";

export function Rotas() {
  const [userData] = useContext(Context); // Desestruture apenas o userData, pois você não precisa do setUserData aqui.

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={
              userData.isLogged ? <Dashboard /> : <Navigate to="/" replace/> // Use Navigate para redirecionar quando o usuário não estiver logado.
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
