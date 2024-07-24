import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { request } from "../../../utils/burger-api";
import { API } from "../../../utils/constants";
import { IIngredientsWithIdx } from "../../../types/ingredient-types";
import { IOrderResponse } from "../../../types/order-types";
import { cookies } from "../user-slice/auth";

type TOrderState = {
  orderList: IOrderResponse | null;
  postFailed: boolean;
  postRequest: boolean;
};

const initialState: TOrderState = {
  orderList: null,
  postRequest: false,
  postFailed: false,
};

export const handleAndPlaceOrder = createAsyncThunk(
  "postOrder/handleAndPlaceOrder",
  async (order: IIngredientsWithIdx[]): Promise<IOrderResponse> => {
    const accessToken = cookies.get("accessToken");

    const response = await request<IOrderResponse>(
      `${API.baseUrl}${API.endpoints.order}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          ingredients: order.map((item) => item._id),
        }),
      }
    );

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
        state.postRequest = true;
      })
      .addCase(
        handleAndPlaceOrder.fulfilled,
        (state, action: PayloadAction<IOrderResponse>) => {
          state.orderList = action.payload;
          state.postRequest = false;
          state.postFailed = false;
        }
      )
      .addCase(handleAndPlaceOrder.rejected, (state) => {
        state.postRequest = false;
        state.postFailed = true;
      });
  },
});

export default orderPostSlice.reducer;
