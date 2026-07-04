import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { toast } from "react-toastify";

export interface Transaction {
  id: string;
  type: string;
  name: string;
  summ: string;
  date: string;
}

interface TransactionState {
  transactions: Transaction[];
  loading: boolean;
}

const initialState: TransactionState = {
  transactions: [],
  loading: false,
};

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchAll",
  async () => {
    const response = await axiosApi.get<Record<string, Transaction>>(
      "/tracker/transactions.json"
    );
    const data = response.data;

    console.log('data', data);
    
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

export const deleteTransaction = createAsyncThunk(
  "transaction/deleteTransaction",
  async (id: string) => {
    await axiosApi.delete(`/tracker/transactions/${id}.json`);
    return id;
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTransactions.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(deleteTransaction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTransaction.fulfilled, (state, action) => {
      state.transactions = state.transactions.filter(
        (c) => c.id !== action.payload
      );
      state.loading = false;
      toast.info("Success deleted");
    });
    builder.addCase(deleteTransaction.rejected, (state) => {
      state.loading = false;
      toast.error("Success Denied");
    });
  },
});

export const transactionReducer = transactionSlice.reducer;
export const {} = transactionSlice.actions;
