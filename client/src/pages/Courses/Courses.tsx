import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getCourses } from "../../store/coursesSlices";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useAppSelector } from "../../store/hooks";

interface Course {
  name: string;
  difficulty: string;
  image: string;
  description: string;
}
interface IcurrentCourses{
currentCourses:any
}

const Courses: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, []);
  return (
    <>
      <CardsContainer/>
    </>
  );
};

export default Courses;