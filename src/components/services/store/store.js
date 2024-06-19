import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "../slices/ingredients-slice/ingredients";
import burgerConstructorSlice from "../slices/burger-constructor/burger-constructor";
import orderPostSlice from "../slices/order-post-slice/order-post";
import userSlice from "../slices/user-slice/user";
import modalIngredients from "../slices/modal-ingredients/modal-ingredients";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice,
    burgerConstructor: burgerConstructorSlice,
    modalIngredient: modalIngredients,
    postOrder: orderPostSlice,
    user: userSlice,
  },
});
