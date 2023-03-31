import React from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import Home from './pages/Home/Home'
import Courses from './pages/Courses/Courses';
import NavBar from './components/NavBar';
import Landing from './pages/Landing/Landing';
import './index.css'

const App: React.FC = (): JSX.Element => {
  
  const location = useLocation();
    return (
      <div>
      {location.pathname !== "/" && <NavBar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Landing />} />
        <Route path="/" element={<Courses />} />
      </Routes>
    </div>
  );
};

export default App


