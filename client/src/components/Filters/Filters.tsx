import React from "react";
import { useAppSelector } from "../../store/hooks";

const Filters: React.FC = (): JSX.Element => {
  const courses = useAppSelector((state) => state.courses.courses);
  const filteredCourses = useAppSelector(
    (state) => state.courses.filteredCourses
  );

  const filterByDifficulty = (difficulty: string) => {
    const filteredByDiff = filteredCourses.filter((course) => {
      return course.difficulty === difficulty;
    });
  };

  return (
    <>
      <label> Select a difficulty</label>
      <select></select>
    </>
  );
};
