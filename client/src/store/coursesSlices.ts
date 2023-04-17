import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AppThunk } from "./store";
import axios from "axios";
interface Review {
  username: string | undefined;
  comment:string;
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
  courses: ICourse[];
  filteredCourses: ICourse[];
  cartItems: Product[];
  reviewsReported: Review [],
}

const initialState: CoursesState = {
  courses: [],
  filteredCourses: [],
  cartItems: [],
  reviewsReported: [],
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
    addToCart: (state, action: PayloadAction<Product>) => {
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      }
    },
    removeFromCart: (state, action: PayloadAction<Product>) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id)
    },
    clearCart: (state) => {
      return {
        ...state,
        cartItems: []
      }
    },
    reportReview: (state, action: PayloadAction<Review>) => {
      return {
        ...state,
        reviewsReported: [...state.reviewsReported, action.payload]
      }
    },
    deleteReport: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        reviewsReported: state.reviewsReported.filter(r=>r.comment!==action.payload)
      }
    }
  },
});
export const getCourses = (): AppThunk => {
  return async (dispatch) => {
    const rawData = await axios.get("https://fromzerotodev-production.up.railway.app/courses");
    console.log(rawData);
    const response = rawData.data;

    dispatch(fetchCourses(response));
  };
};

export const getCoursesByName = (name: string): AppThunk => {
  return async (dispatch) => {
    const rawData = await axios.get(
      `https://fromzerotodev-production.up.railway.app/courses?name=${name}`
    );
    console.log(rawData);
    const response = rawData.data;

    dispatch(updateFilteredCourses(response));
  };
};

export const { fetchCourses, updateFilteredCourses, addToCart, removeFromCart, clearCart, reportReview, deleteReport } = coursesSlice.actions;
export default coursesSlice.reducer;
