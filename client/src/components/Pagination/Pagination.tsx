import React from "react";

interface Props {
  currentPage: number;
  coursesPerPage: number;
  totalCourses: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<Props> = ({
  coursesPerPage,
  totalCourses,
  paginate,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCourses / coursesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
