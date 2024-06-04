import { configureStore } from "@reduxjs/toolkit";
import ingredientsSlice from "../slices/ingredients-slice/ingredients";

export const store = configureStore({
  reducer: {
    ingredients: ingredientsSlice,
  },
});
