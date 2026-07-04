import {configureStore} from "@reduxjs/toolkit";
import { contactReducer } from "./contactSlice";
import { categoriesReducer } from "./categorysSlice";

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    categories: categoriesReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;