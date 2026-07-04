import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";

export interface Categorie {
  id: string;
  type: string;
  name: string;
}

interface CategorieState {
  categories: Categorie[];
  loading: boolean;
}

const initialState: CategorieState = {
  categories: [],
  loading: false,
};

export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async () => {
    const response = await axiosApi.get<Record<string, Categorie>>(
      "/categories.json"
    );
    const data = response.data;
    console.log("data", data);

    if (!data) {
      return [];
    }

    const result = Object.keys(data).map((id) => ({
      id,
      ...data[id],
    }));

    return result;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const {} = categoriesSlice.actions;
