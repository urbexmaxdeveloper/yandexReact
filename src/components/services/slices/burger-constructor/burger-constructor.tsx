import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngredientsWithIdx } from "../../../types/ingredient-types";

type TSelectedState = {
  selectedBun: IIngredientsWithIdx | null;
  selectedIngredients: IIngredientsWithIdx[];
  totalPrice: number;
};

const initialState: TSelectedState = {
  selectedBun: null,
  selectedIngredients: [],
  totalPrice: 0,
};

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    setBun: (state, action: PayloadAction<IIngredientsWithIdx>) => {
      state.selectedBun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<IIngredientsWithIdx>) => {
      state.selectedIngredients = [
        ...state.selectedIngredients,
        action.payload,
      ];
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.selectedIngredients = state.selectedIngredients.filter(
        (item) => item.idx !== action.payload
      );
    },
    resetConstructor: (state) => {
      state.selectedBun = null;
      state.selectedIngredients = [];
    },
    calcTotalPrice: (state) => {
      state.totalPrice =
        (state.selectedBun ? state.selectedBun.price * 2 : 0) +
        state.selectedIngredients?.reduce(
          (acc, ingredient) => acc + ingredient.price,
          0
        );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const temp = state.selectedIngredients[dragIndex];
      state.selectedIngredients = state.selectedIngredients.filter(
        (item, idx) => idx !== dragIndex
      );
      state.selectedIngredients.splice(hoverIndex, 0, temp);
    },
  },
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  resetConstructor,
  calcTotalPrice,
  moveIngredient,
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
