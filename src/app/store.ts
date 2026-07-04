import {configureStore} from "@reduxjs/toolkit";
import { categoriesReducer } from "./categoriesSlice";
import { transactionReducer } from "./transactionsSlice";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    transactions: transactionReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;