import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredient } from "../../../types/ingredient-types";

interface ModalIngredientState {
  detailIngredient: IIngredient | null;
}

export const initialState: ModalIngredientState = {
  detailIngredient: null,
};

const modalIngredientSlice = createSlice({
  name: "modalIngredient",
  initialState,
  reducers: {
    setDetailIngredient: (state, action: PayloadAction<any>) => {
      state.detailIngredient = action.payload;
    },
  },
});

export const { setDetailIngredient } = modalIngredientSlice.actions;
export default modalIngredientSlice.reducer;
