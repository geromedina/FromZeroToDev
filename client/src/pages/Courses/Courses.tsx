import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getCourses } from "../../store/coursesSlices";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useAppSelector } from "../../store/hooks";
import Pagination from "../../components/Pagination/Pagination";
import "./Courses.css"

interface Course {
  name: string;
  difficulty: string;
  image: string;
  description: string;
}

const Courses: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const coursesPerPage = 4;

  useEffect(() => {
    dispatch(getCourses());
  }, []);

  const courses = useAppSelector((state) => state.courses.filteredCourses);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <CardsContainer currentCourses={currentCourses} />
      <Pagination
        currentPage={currentPage}
        coursesPerPage={coursesPerPage}
        totalCourses={courses.length}
        paginate={paginate}
      />
    </>
  );
};

export default Courses;
