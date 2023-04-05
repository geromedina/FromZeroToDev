import React from "react";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { updateFilteredCourses } from "../../../store/coursesSlices";

export const Sorter: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const courses = useAppSelector((state) => state.courses.filteredCourses);
  const sortedArray = [...courses];

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    switch (e.target.value) {
      case "Difficulty Ascending":
        sortedArray.sort((a, b) => {
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
        sortedArray.sort((a, b) => {
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
        sortedArray.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        break;
      case "Name Descending":
        sortedArray.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
        break;
      default:
        return;
    }
    console.log([...sortedArray]);
    dispatch(updateFilteredCourses([...sortedArray]));
  };

  return (
    <div className="flex items-center">
      <label className="block font-medium text-white px-1">Sort by:</label>
      <select
      className="border border-gray-400 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={changeHandler}
      >
        <option value="Name Descending">Name Descending</option>
        <option value="Name Ascending">Name Ascending</option>
        <option value="Difficulty Descending">Difficulty Descending</option>
        <option value="Difficulty Ascending">Difficulty Ascending</option>
      </select>
    </div>
  );
};

