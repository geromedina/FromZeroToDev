import React from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import Home from './pages/Home/Home'
import NavBar from './components/NavBar';
import Landing from './pages/Landing/Landing';
import './index.css'

const App: React.FC = (): JSX.Element => {

  let location = useLocation();

    return (
        <div>
          {location.pathname !== "/" && <NavBar />}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    )
}

export default App


