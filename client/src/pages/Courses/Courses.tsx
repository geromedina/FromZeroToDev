import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getCourses } from "../../store/coursesSlices";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useAppSelector } from "../../store/hooks";
import Pagination from "../../components/Pagination/Pagination";
import "./Courses.css";
import { SearchBar, Filters, Sorter } from "../../components/Filters/index";
import Footer from "../../components/Footer/Footer";

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
      <div className="flex justify-between items-center mb-4">
        <div className="flex-1">
          <Sorter />
        </div>
        <div className="flex-1 justify-start">
            <Filters />
        </div>
        <div className="flex items-center justify-end w-1/3">
          <div className="ml-4">
            <SearchBar />
          </div>
        </div>
      </div>
      <CardsContainer currentCourses={currentCourses} />
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          coursesPerPage={coursesPerPage}
          totalCourses={courses.length}
          paginate={paginate}
        />
        <Footer/>
      </div>
    </>
  );
};

export default Courses;
