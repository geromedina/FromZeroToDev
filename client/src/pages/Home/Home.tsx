import React from "react";
import { useAppDispatch } from "../../store/hooks";
import { useEffect } from "react";
import { getCourses } from "../../store/coursesSlices";
import Footer from "../../components/Footer/Footer";

const Home: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, []);
  return (
    <>
      <Footer />
    </>
  );
};

export default Home;
