import React from "react";
import CardsContainer from "../../components/CardsContainer";
import { useAppDispatch } from "../../store/hooks";
import { useEffect } from "react";
import { getCourses } from "../../store/coursesSlices";

const Courses: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, []);
  return (
    <>
      <CardsContainer />
    </>
  );
};

export default Courses;