import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "../slices/ingredients-slice/ingredients";
import burgerConstructorSlice from "../slices/burger-constructor/burger-constructor";
import orderPostSlice from "../slices/order-post-slice/order-post";
import userSlice from "../slices/user-slice/user";
import modalIngredients from "../slices/modal-ingredients/modal-ingredients";
import {
  feedOrdersMiddleware,
  userOrdersMiddleware,
} from "../middlewares/ws-middleware";
import feedOrders from "../slices/feed-orders/feed-orders";
import userOrders from "../slices/user-orders/user-orders";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice,
    modalIngredient: modalIngredients,
    burgerConstructor: burgerConstructorSlice,
    postOrder: orderPostSlice,
    user: userSlice,
    feedOrders: feedOrders,
    userOrders: userOrders,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(feedOrdersMiddleware, userOrdersMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type DispatchHook = typeof store.dispatch;
