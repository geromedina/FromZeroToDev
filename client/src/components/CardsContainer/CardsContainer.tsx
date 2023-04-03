import React from "react";
import { useAppSelector } from "../../store/hooks";
import Card from "../Card/Card";
import { useSelector } from "react-redux";

interface Course {
  name: string;
  difficulty: string;
  image: string;
  description: string;
  _id: string;
}

const CardsContainer: React.FC<{ currentCourses: Course[] }> = ({
  currentCourses,
}): JSX.Element => {
  const courses = useAppSelector((state) => state.courses.filteredCourses);
  const allCourses = useAppSelector((state) => state.courses);

  return (
    <>
      {currentCourses.length ? (
        <div className="cards-container flex mx-auto">
          {currentCourses.map((course: Course) => (
            <Card
              difficulty={course.difficulty}
              key={course._id}
              name={course.name}
              image={course.image}
              id={course._id}
              description={course.description}
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
