import React from "react";
import { useAppSelector } from "../../store/hooks";
import Card from "../Card/Card";
import { useSelector } from "react-redux";


const CardsContainer: React.FC = (currentCourses:any): JSX.Element => {
  const courses = useAppSelector((state) => state.courses.filteredCourses);
  const allCourses:any  = useAppSelector((state)=> state.courses);

  return (
    <>
      {currentCourses.length ?
      currentCourses && courses.map(course => (
        <Card
          name={course.name}
          difficults={course.difficulty}
          image={course.image}
          id="idDePrueba"
          description={course.description}
        />
      ))
      : !currentCourses.length && allCourses.length ?
      <div>
        <h2> No hay cursos </h2>
      </div> :
      <h2>Cargando..</h2>
    }
    </>
  );
};

export default CardsContainer;