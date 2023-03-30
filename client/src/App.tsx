import React from 'react'
import { Route, Routes, useLocation } from "react-router-dom";
import Home from './pages/Home/Home'
import NavBar from './components/NavBar';
import './index.css'

const App: React.FC = (): JSX.Element => {
    return (
        <div>
        {location.pathname !== "/" && <NavBar />}
        <Routes>
          <Route path="/home" element={<Home />} />
          {/* <Route path="/" element={<Landing />} /> */}
        </Routes>
      </div>
    )
}

export default App


