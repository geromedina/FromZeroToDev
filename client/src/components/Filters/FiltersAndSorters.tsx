import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { updateFilteredCourses } from "../../store/coursesSlices";

export const FiltersAndSorters: React.FC = (): JSX.Element => {
  const courses = useAppSelector((state) => state.courses.courses);
  const dispatch = useAppDispatch();
  const [filters, setFilters] = useState({
    search: "",
    sorter: "",
    difficulty: "",
  });
  useEffect(() => {
    const filteredCourses = filtering(
      filters.sorter,
      filters.search,
      filters.difficulty
    );
    dispatch(updateFilteredCourses([...filteredCourses]));
  }, [filters]);

  const filtering = (sorter: string, search: string, difficulty: string) => {
    const filteredCourses = courses.filter((course) => {
      return difficulty !== ""
        ? course.difficulty === difficulty &&
            course.name.toLowerCase().includes(search)
        : course.name.toLowerCase().includes(search);
    });
    const sorting = (sorter: string) => {
      switch (sorter) {
        case "Difficulty Ascending":
          filteredCourses.sort((a, b) => {
            if (a.difficulty === "Easy" && b.difficulty === "Medium")
              return -1 as number;
            else if (a.difficulty === "Medium" && b.difficulty === "Easy")
              return 1 as number;
            else if (a.difficulty === "Easy" && b.difficulty === "Advanced")
              return -1 as number;
            else if (a.difficulty === "Medium" && b.difficulty === "Advanced")
              return -1 as number;
            else if (a.difficulty === "Advanced" && b.difficulty === "Easy")
              return 1 as number;
            else if (a.difficulty === "Advanced" && b.difficulty === "Medium")
              return 1 as number;
            else return 0;
          });
          break;
        case "Difficulty Descending":
          filteredCourses.sort((a, b) => {
            if (a.difficulty === "Easy" && b.difficulty === "Medium")
              return 1 as number;
            else if (a.difficulty === "Medium" && b.difficulty === "Easy")
              return -1 as number;
            else if (a.difficulty === "Easy" && b.difficulty === "Advanced")
              return 1 as number;
            else if (a.difficulty === "Medium" && b.difficulty === "Advanced")
              return 1 as number;
            else if (a.difficulty === "Advanced" && b.difficulty === "Easy")
              return -1 as number;
            else if (a.difficulty === "Advanced" && b.difficulty === "Medium")
              return -1 as number;
            else return 0;
          });
          break;
        case "Name Ascending":
          filteredCourses.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
          break;
        case "Name Descending":
          filteredCourses.sort((a, b) => {
            return b.name.localeCompare(a.name);
          });
          break;
        default:
          return;
      }
    };
    sorting(sorter);
    return [...filteredCourses];
  };

  const changeHandler = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    const property = e.target.name;
    setFilters({
      ...filters,
      [property]: value,
    });
  };

  return (
    <nav className="bg-gray-800 py-4 relative border-t border-gray-400 w-full">
      <div className="containter flex px-8 mx-6">
        <form className="flex items-center">
          <input
            value={filters.search}
            name="search"
            className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            type="text"
            placeholder="Search for Courses..."
            onChange={changeHandler}
          />
        </form>
        <div className="flex items-center ml-auto">
          <div className="flex items-center">
            <label className="block font-medium text-white px-1">
              Select a difficulty:
            </label>
            <select
              value={filters.difficulty}
              className="border border-gray-400 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="difficulty"
              id="difficulty"
              onChange={changeHandler}
            >
              <option value="" key={""}></option>
              <option value="Easy" key={"1"}>
                Easy
              </option>
              <option value="Medium" key={"2"}>
                Medium
              </option>
              <option value="Advanced" key={"3"}>
                Advanced
              </option>
            </select>
          </div>

          <div className="flex items-center">
            <label className="block font-medium text-white px-1">
              Order by:
            </label>
            <select
              value={filters.sorter}
              name="sorter"
              className="border border-gray-400 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={changeHandler}
            >
              <option value=""></option>
              <option value="Name Descending">Name Descending</option>
              <option value="Name Ascending">Name Ascending</option>
              <option value="Difficulty Descending">
                Difficulty Descending
              </option>
              <option value="Difficulty Ascending">Difficulty Ascending</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default FiltersAndSorters;
