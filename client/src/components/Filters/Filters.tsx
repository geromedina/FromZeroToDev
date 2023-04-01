import React from "react";
import { useAppSelector } from "../../store/hooks";
import { useAppDispatch } from "../../store/hooks";
import { updateFilteredCourses } from "../../store/coursesSlices";

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
    <>
      <label> Select a difficulty</label>
      <select onChange={changeHandler} name="dificulty">
        <option value="" key={""}>
          {" "}
        </option>
        <option value="Easy" key={"1"}>
          {" "}
          Easy{" "}
        </option>
        <option value="Medium" key={"2"}>
          {" "}
          Medium{" "}
        </option>
        <option value="Advanced" key={"3"}>
          {" "}
          Advanced{" "}
        </option>
      </select>
    </>
  );
};
