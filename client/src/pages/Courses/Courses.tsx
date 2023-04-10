import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getCourses } from "../../store/coursesSlices";
import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useAppSelector } from "../../store/hooks";
import Pagination from "../../components/Pagination/Pagination";
import "./Courses.css";
import Footer from "../../components/Footer/Footer";

import FiltersAndSorters from "../../components/Filters/FiltersAndSorters";

const Courses: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const coursesPerPage = 4;
  const courses = useAppSelector((state) => state.courses.filteredCourses);

  useEffect(() => {
    dispatch(getCourses());
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [courses]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <FiltersAndSorters />
      </div>
      <section className="py-10 px-10">
        <CardsContainer currentCourses={currentCourses} />
        <div className="flex justify-center mt-4 flex-col">
          <Pagination
            currentPage={currentPage}
            coursesPerPage={coursesPerPage}
            totalCourses={courses.length}
            paginate={paginate}
          />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Courses;
