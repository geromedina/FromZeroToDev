import React from "react";
import { useAppSelector } from "../../../store/hooks";
import { useAppDispatch } from "../../../store/hooks";
import { updateFilteredCourses } from "../../../store/coursesSlices";

export const Filters: React.FC = (): JSX.Element => {
  const courses = useAppSelector((state) => state.courses.courses);
  const dispatch = useAppDispatch();

  const filteredCourses = useAppSelector(
    (state) => state.courses.filteredCourses
  );

  const filterByDifficulty = (difficulty: string) => {
    const filteredByDiff = courses.filter((course) => {
      return course.difficulty === difficulty;
    });
    return filteredByDiff;
  };

  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") {
      dispatch(updateFilteredCourses(courses));
    } else {
      const filteredByDiff = filterByDifficulty(e.target.value);
      dispatch(updateFilteredCourses(filteredByDiff));
    }
  };

  return (
    <div className="flex items-center">
      <label className="block font-medium text-white px-1">
        Select a difficulty:
      </label>
      <select
        className="border border-gray-400 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        name="difficulty"
        id="difficulty"
        onChange={changeHandler}
      >
        <option value="" key={""}></option>
        <option value="Easy" key={"1"}>Easy</option>
        <option value="Medium" key={"2"}>Medium</option>
        <option value="Advanced" key={"3"}>Advanced</option>
      </select>
    </div>
  );
};
