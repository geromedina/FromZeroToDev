import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import coursesReducer from "./coursesSlices";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
