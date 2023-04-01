import React from "react";
import { getCoursesByName } from "../../../store/coursesSlices";
import { useAppDispatch } from "../../../store/hooks";

export const SearchBar: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(getCoursesByName(event.target.value));
  };

  return (
    <form>
      <input
        type="text"
        placeholder="Search for Courses..."
        onChange={handleChange}
      />
    </form>
  );
};
