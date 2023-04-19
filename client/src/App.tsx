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

const App: React.FC = (): JSX.Element => {
  const { isAuthenticated, user } = useAuth0();
  const [userData, setUserData] = useState({role:null});
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      axios
        .get(`http://localhost:3001/users`)
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

  const isAdmin = userData?.role === "admin";

  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/dashboard" element={isAdmin ? <Dashboard /> : null} />
        <Route path="/create" element={<Form />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detail/:id" element={<CardDetail />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/success" element={<Succesful />} />
        <Route path="/reported" element={isAdmin ? <ReviewsReported /> : null} />
        <Route path="/admincourses" element={isAdmin ? <DeleteCourses /> : null} />
      </Routes>
    </div>
  );
};

export default App;