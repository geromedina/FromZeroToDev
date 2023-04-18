import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Form, Courses, Register, Dashboard, Profile } from "./pages/index";
import NavBar from "./components/NavBar/NavBar";
import "./index.css";
import CardDetail from "./components/CardDetail/CardDetail";

import { Succesful } from "./pages/SuccessfulPurchase/succesful";


const App: React.FC = (): JSX.Element => {

  return (
    <div>
      <NavBar/>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/create" element={<Form />} />
      <Route path="/register" element={<Register />} />
      <Route path="/detail/:id" element={<CardDetail />} />
      <Route path="/courses" element={<Courses />} />
      <Route path="/success" element={<Succesful />} />
      <Route path= "/dashboard" element = {<Dashboard />}/>
      </Routes>
    </div>
  );
};

export default App;
