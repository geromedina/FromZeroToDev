import React from "react";
import { useAppSelector } from "../../store/hooks";
import Card from "../Card/Card";

const CardsContainer: React.FC = (): JSX.Element => {
  const courses = useAppSelector((state) => state.courses.filteredCourses);
  return (
    <>
      {courses.map((course) => (
        <Card
          name={course.name}
          difficults={course.difficulty}
          image={course.image}
          id="idDePrueba"
          description={course.description}
        />
      ))}
    </>
  );
};

export default CardsContainer;
