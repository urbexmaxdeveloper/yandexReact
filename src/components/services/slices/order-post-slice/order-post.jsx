import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { normaApi, postOrderUrl } from "../../../utils/config";
import { request } from "../../../utils/burger-api";

const initialState = {
  orderList: null,
  loading: false,
  error: false,
};

export const handleAndPlaceOrder = createAsyncThunk(
  "postOrder/handleAndPlaceOrder",
  async (order) => {
    const response = await request(`${normaApi}${postOrderUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: order.map((item) => item._id) }),
    });
    return response;
  }
);

export const orderPostSlice = createSlice({
  name: "postOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleAndPlaceOrder.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(handleAndPlaceOrder.fulfilled, (state, action) => {
        state.orderList = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(handleAndPlaceOrder.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default orderPostSlice.reducer;
