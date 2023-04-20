import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Home,
  Form,
  Courses,
  Register,
  Dashboard,
  Profile,
} from "./pages/index";
import NavBar from "./components/NavBar/NavBar";
import "./index.css";
import CardDetail from "./components/CardDetail/CardDetail";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Succesful } from "./pages/SuccessfulPurchase/succesful";
import ReviewsReported from "./components/ReviewsReported/ReviewsReported";
import DeleteCourses from "./components/DeleteCourses/DeleteCourses";
import { backURL } from "./main";

const App: React.FC = (): JSX.Element => {
  const { isAuthenticated, user } = useAuth0();
  const [userData, setUserData] = useState({ role: null });
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(`${backURL}/users`)
        .then((response) => {
          const userWithEmail = response.data.find(
            (userData: any) => userData.email === user?.email
          );

          if (userWithEmail) {
            setUserData(userWithEmail);
          } else {
            navigate("/register");
          }
        })
        .catch((error) => console.log(error));
    }
  }, [isAuthenticated, user, navigate]);

  console.log(userData);
  const isAdmin = userData?.role === "admin";

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile userData={userData} />} />
        <Route path="/dashboard" element={isAdmin && <Dashboard />} />
        <Route path="/create" element={<Form />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail/:id" element={<CardDetail />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/success" element={<Succesful userData={userData} />} />
        <Route path="/reported" element={isAdmin && <ReviewsReported />} />
        <Route path="/admincourses" element={isAdmin && <DeleteCourses />} />
      </Routes>
    </div>
  );
};

export default App;
