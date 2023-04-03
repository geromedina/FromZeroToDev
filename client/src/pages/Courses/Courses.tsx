import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getCourses } from "../../store/coursesSlices";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useAppSelector } from "../../store/hooks";
import Pagination from "../../components/Pagination/Pagination";
import "./Courses.css";
import { Filters } from "../../components/Filters/Filters";
import { Sorter } from "../../components/Filters/Sorters/Sorter";
import { SearchBar } from "../../components/Filters/SearchBar/SearchBar";

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
      <SearchBar />
      <Sorter />
      <Filters />
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
