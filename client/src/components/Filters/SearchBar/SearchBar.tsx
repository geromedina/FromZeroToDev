import React from "react";
import { getCoursesByName } from "../../../store/coursesSlices";
import { useAppDispatch } from "../../../store/hooks";

export const SearchBar: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(getCoursesByName(event.target.value));
  };

  return (
<form className="flex items-center">
  <input
    className="border rounded-l py-2 px-3 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
    type="text"
    placeholder="Search for Courses..."
    onChange={handleChange}
  />
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
    type="submit"
  >
    Search
  </button>
</form>
  );
};
