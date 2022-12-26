import { createContext, useState } from "react";
import "./App.css";
import Login from "./components/pages/Login/Login";
import Home from "./components/pages/Home";
import { LoginProvider } from "./components/shared/LoginProvider";

import HeaderTabs from "./components/template/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <Routes>
          <Route path={`/`} element={<Home />} />
          <Route path={`/login/`} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
