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
  created_at: Date;
  updated_at: Date;
}

interface CoursesState {
  courses: ICourse[];
}

const initialState: CoursesState = {
  courses: [],
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    fetchCourses: (state, action: PayloadAction<ICourse[]>) => {
      return { ...state, courses: action.payload };
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
export const { fetchCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
