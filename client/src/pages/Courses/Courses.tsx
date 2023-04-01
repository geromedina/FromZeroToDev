import React from "react";
import CardsContainer from "../../components/CardsContainer";
import { useAppDispatch } from "../../store/hooks";
import { useEffect } from "react";
import { getCourses } from "../../store/coursesSlices";
import Footer from "../../components/Footer/Footer";

const Courses: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, []);
  return (
    <div className="pt-16">
      <CardsContainer />
    </div>
  );
};

export default Courses;