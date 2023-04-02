import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar";
import Landing from "./pages/Landing/Landing";
import Form from "./pages/Form/Form";
import "./index.css";
import CardDetail from "./components/CardDetail/CardDetail";

const App: React.FC = (): JSX.Element => {
  return (
    <div>
      {/* {location.pathname !== "/" && <NavBar />} */}
      <Routes>
        <Route path="/create" element={<Form />} />
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Landing />} />
        <Route path= "/detail/:id" element= {<CardDetail/>}/>
      </Routes>
    </div>
  );
};

export default App;
