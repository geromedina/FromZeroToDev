import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { useEffect } from "react";
import { getCourses } from "../../store/coursesSlices";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/NavBar/NavBar";

const Home: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, []);
  return (
    <body className="bg-gray-800">
      <Navbar/>
      <Footer/>
    </body>
  );
};

export default Home;
