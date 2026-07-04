import { createSlice } from "@reduxjs/toolkit";

export interface State {

};

const initialState: State = {

};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
});

export const contactReducer = contactSlice.reducer;
export const {} = contactSlice.actions;
