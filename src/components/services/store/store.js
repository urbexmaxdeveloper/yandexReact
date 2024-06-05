import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "../slices/ingredients-slice/ingredients";
import burgerConstructorSlice from "../slices/burger-constructor/burger-constructor";
import orderPostSlice from "../slices/order-post-slice/order-post";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice,
    burgerConstructor: burgerConstructorSlice,
    postOrder: orderPostSlice,
  },
});
