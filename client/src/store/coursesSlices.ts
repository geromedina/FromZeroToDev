import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppThunk, RootState } from "./store";
import axios from "axios";
import { ThunkActionDispatch } from "redux-thunk";

interface ICourse {
  user_id: string;
  name: string;
  description: string;
  image: string;
  difficulty: string;
  duration: number;
  price: number;
  video: string;
  id: string;
  created_at: Date;
  updated_at: Date;
}

interface CoursesState {
  courses: ICourse[];
  filteredCourses: ICourse[];
}

const initialState: CoursesState = {
  courses: [],
  filteredCourses: [],
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    fetchCourses: (state, action: PayloadAction<ICourse[]>) => {
      return {
        ...state,
        courses: action.payload,
        filteredCourses: action.payload,
      };
    },
    updateFilteredCourses: (state, action: PayloadAction<ICourse[]>) => {
      return {
        ...state,
        filteredCourses: action.payload,
      };
    },
  },
});
export const getCourses = (): AppThunk => {
  return async (dispatch) => {
    const rawData = await axios.get("http://localhost:3001/courses");
    console.log(rawData);
    const response = rawData.data;

    dispatch(fetchCourses(response));
  };
};

export const getCoursesByName = (name: string): AppThunk => {
  return async (dispatch) => {
    const rawData = await axios.get(
      `http://localhost:3001/courses?name=${name}`
    );
    console.log(rawData);
    const response = rawData.data;

    dispatch(updateFilteredCourses(response));
  };
};

export const { fetchCourses, updateFilteredCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
