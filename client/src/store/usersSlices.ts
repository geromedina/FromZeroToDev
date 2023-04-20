import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { backURL } from "../main";

interface UserState {
  id: string;
  username: string;
  email: string;
  password: string;
  lastname: string;
  image: string;
  firstname: string;
  favorites: string;
  role: string;
  token: string | null;
  registerStatus: string;
  registerError: string | null; // Cambio en el tipo de registerError
  loginStatus: string;
  loginError: string;
  userLoader: boolean;
}

interface UserCredentials {
  username: string;
  email: string;
  password: string;
  lastname: string;
  image: string;
  firstname: string;
  favorites: string;
  role: string;
}

export const registerUser = createAsyncThunk<string, UserCredentials, { rejectValue: string }>(
  "auth/registerUser",
  async (value, { rejectWithValue }) => {
    try {
      const token = await axios.post<string>(`${backURL}/courses/users`, {
        username: value.username,
        email: value.email,
        password: value.password,
        lastname: value.lastname,
        image: value.image,
        firstname: value.firstname,
        favorites: value.favorites,
        role: value.role,
      });
      localStorage.setItem("token", token.data);
      return token.data;
    } catch (error: any) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: UserState = {
  id: "",
  username: "",
  email: "",
  password: "",
  lastname: "",
  image: "",
  firstname: "",
  favorites: "",
  role: "",
  token: localStorage.getItem("token"),
  registerStatus: "",
  registerError: null, // Inicializar con null en lugar de una cadena vacía
  loginStatus: "",
  loginError: "",
  userLoader: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.registerStatus = "pending";
    });
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.registerStatus = "fulfilled";
      state.token = payload;
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.registerStatus = "rejected";
      state.registerError = payload ?? state.registerError; // Asignar valor de payload solo si existe
    });
  },
});

export default authSlice.reducer;