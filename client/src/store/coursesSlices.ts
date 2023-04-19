import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppThunk } from "./store";
import axios from "axios";
import { getItem, setItem } from "../components/LocalStorage/LocalStorage";
import { backURL } from "../main";
interface Review {
  username: string | undefined;
  comment: string;
  courseId: string | undefined;
  courseName: string;
}

export interface ICourse {
  user_id: string;
  name: string;
  description: string;
  image: string;
  difficulty: string;
  duration: number;
  price: number;
  deleted: null | number;
  video: string;
  reviews: Review[];
  _id: string;
  created_at: Date;
  updated_at: Date;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
}

// interface ShoppingCartItem {
//   product: Product;
//   quantity: number;
// }

interface CoursesState {
  courseIMG: string;
  courses: ICourse[];
  filteredCourses: ICourse[];
  cartItems: Product[];
  reviewsReported: Review[];
}



const localStorageState = getItem("coursesState");

const initialState: CoursesState = localStorageState ? localStorageState : {

  courseIMG: "",
  courses: [],
  filteredCourses: [],
  cartItems: [],

  reviewsReported: [],
};

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    updateImage: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        courseIMG: action.payload,
      };
    },
    fetchCourses: (state, action: PayloadAction<ICourse[]>) => {
      const newState = {
        ...state,
        courses: action.payload,
        filteredCourses: action.payload,
      };
      // Guardar el estado actualizado en localStorage
      setItem("coursesState", newState);
      return newState;
    },
    updateFilteredCourses: (state, action: PayloadAction<ICourse[]>) => {
      const newState = {
        ...state,
        filteredCourses: action.payload,
      };
      // Guardar el estado actualizado en localStorage
      setItem("coursesState", newState);
      return newState;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      const newState = {
        ...state,

        cartItems: [...state.cartItems, action.payload]
      };
      // Guardar el estado actualizado en localStorage
      setItem("coursesState", newState);
      return newState;
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const newState = {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload.id)
      };
      // Guardar el estado actualizado en localStorage
      setItem("coursesState", newState);
      return newState;
    },
    clearCart: (state) => {
      const newState = {
        ...state,

        cartItems: []
      };
      // Guardar el estado actualizado en localStorage
      setItem("coursesState", newState);
      return newState;

    },
    reportReview: (state, action: PayloadAction<Review>) => {
      return {
        ...state,
        reviewsReported: [...state.reviewsReported, action.payload],
      };
    },
    deleteReport: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        reviewsReported: state.reviewsReported.filter(
          (r) => r.comment !== action.payload
        ),
      };
    },
  },
});

export const getCourses = (): AppThunk => {
  return async (dispatch) => {

    const rawData = await axios.get(`${backURL}/courses`);
    console.log(rawData);
    const response = rawData.data;

    dispatch(fetchCourses(response));
  };
};

export const getCoursesByName = (name: string): AppThunk => {
  return async (dispatch) => {
    const rawData = await axios.get(
      `${backURL}/courses?name=${name}`
    );
    console.log(rawData);
    const response = rawData.data;

    dispatch(updateFilteredCourses(response));
  };
};

export const {
  fetchCourses,
  updateFilteredCourses,
  addToCart,
  removeFromCart,
  clearCart,
  updateImage,
  reportReview,
  deleteReport,
} = coursesSlice.actions;

export default coursesSlice.reducer;
