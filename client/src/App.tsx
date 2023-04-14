import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home, Landing, Form, Courses, Register } from "./pages/index";
import NavBar from "./components/NavBar/NavBar";
import "./index.css";
import CardDetail from "./components/CardDetail/CardDetail";
import Dashboard from "./pages/Dashboard/Dashboard";

const App: React.FC = (): JSX.Element => {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/" && <NavBar />}

      <Routes>
        <Route path="/create" element={<Form />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/detail/:id" element={<CardDetail />} />
        <Route path="/courses" element={<Courses />} />
        <Route path= "/dashboard" element = {<Dashboard />}/>
      </Routes>
    </div>
  );
};

export default App;
