import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IWsOrder, IWsOrders } from "../../../types/order-types";

const initialState = {
  wsConnected: false,
  orders: [] as IWsOrder[],
  error: null as string | null,
  orderResponse: null as IWsOrders | null,
};

const userOrdersSlice = createSlice({
  name: "userOrders",
  initialState,
  reducers: {
    wsUserOrdConnect: (state, action: PayloadAction<string>) => {},
    wsUserOrdDisconnect: (state) => {
      state.wsConnected = false;
    },
    wsUserOrdOpenSuccess: (state) => {
      state.wsConnected = true;
      state.error = null;
    },
    wsUserOrdClosed: (state) => {
      state.wsConnected = false;
    },
    wsUserOrdGetMessage: (state, action: PayloadAction<IWsOrders>) => {
      state.orderResponse = action.payload;
      state.orders = action.payload.orders;
    },
    wsUserOrdError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  wsUserOrdConnect,
  wsUserOrdDisconnect,
  wsUserOrdOpenSuccess,
  wsUserOrdClosed,
  wsUserOrdGetMessage,
  wsUserOrdError,
} = userOrdersSlice.actions;

export default userOrdersSlice.reducer;
