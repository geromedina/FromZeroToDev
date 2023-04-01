import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import {Home , Landing, Form, Courses} from "./pages"
import NavBar from "./components/NavBar";

import "./index.css";

const App: React.FC = (): JSX.Element => {

  let location = useLocation();

    return (
        <div>
          {location.pathname !== "/" && <NavBar />}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Form />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </div>
    )
}

export default App
