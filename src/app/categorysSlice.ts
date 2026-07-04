import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { toast } from "react-toastify";

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

export const deleteCategorie = createAsyncThunk(
 "categorie/deleteCategorie",
 async (id: string) => {
   await axiosApi.delete(`/categories/${id}.json`);
   return id;
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
    builder.addCase(deleteCategorie.pending, (state) => {
     state.loading = true;
   });
   builder.addCase(deleteCategorie.fulfilled, (state, action) => {
     state.categories = state.categories.filter((c) => c.id !== action.payload);
     state.loading = false;
     toast.info("Success deleted");
   });
   builder.addCase(deleteCategorie.rejected, (state) => {
     state.loading = false;
     toast.error("Success Denied");
   });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const {} = categoriesSlice.actions;
