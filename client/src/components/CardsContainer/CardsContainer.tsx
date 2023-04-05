import React from "react";
import { useAppSelector } from "../../store/hooks";
import Card from "../Card/Card";
import { ICourse } from "../../store/coursesSlices";

const CardsContainer: React.FC<{ currentCourses: ICourse[] }> = ({
  currentCourses,
}): JSX.Element => {
  const allCourses = useAppSelector((state) => state.courses);

  return (
    <>
      {currentCourses.length ? (
        <div className="cards-container">
          {currentCourses.map((course: ICourse) => (
            <Card
              key={course._id}
              name={course.name}
              image={course.image}
              id={course._id}
              description={course.description}
              difficulty={course.difficulty}
            />
          ))}
        </div>
      ) : !currentCourses.length &&
        Array.isArray(allCourses.filteredCourses) &&
        allCourses.filteredCourses.length ? (
        <div className="no-courses">
          <h2> No hay cursos </h2>
        </div>
      ) : (
        <h2 className="loading">Cargando..</h2>
      )}
    </>
  );
};

export default CardsContainer;
