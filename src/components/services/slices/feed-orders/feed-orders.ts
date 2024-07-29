import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWsOrder, IWsOrders } from "../../../types/order-types";

export type TFeedOrdersState = {
  wsConnected: boolean;
  orders: IWsOrder[];
  error: string | null;
  orderResponse: IWsOrders | null;
};

export const initialState: TFeedOrdersState = {
  wsConnected: false,
  orders: [],
  error: null,
  orderResponse: null,
};

const feedOrdersSlice = createSlice({
  name: "feedOrders",
  initialState,
  reducers: {
    wsOrdersConnect(state, action: PayloadAction<string>) {},
    wsOrdersDisconnect(state) {
      state.wsConnected = false;
    },
    wsOrdersOpenSuccess(state) {
      state.wsConnected = true;
      state.error = null;
    },
    wsOrdersClosed(state) {
      state.wsConnected = false;
    },
    wsOrdersGetMessage(state, action: PayloadAction<IWsOrders>) {
      state.orderResponse = action.payload;
      state.orders = action.payload.orders;
    },
    wsOrdersError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const {
  wsOrdersConnect,
  wsOrdersDisconnect,
  wsOrdersOpenSuccess,
  wsOrdersClosed,
  wsOrdersGetMessage,
  wsOrdersError,
} = feedOrdersSlice.actions;

export default feedOrdersSlice.reducer;
