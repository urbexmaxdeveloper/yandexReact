import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedBun: null,
  selectedIngredients: [],
  totalPrice: 0,
};

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    setBun: (state, action) => {
      state.selectedBun = action.payload;
    },
    addIngredient: (state, action) => {
      state.selectedIngredients = [
        ...state.selectedIngredients,
        action.payload,
      ];
      state.selectedIngredients = state.selectedIngredients.map((item) =>
        item.id === action.payload.id
          ? { ...item, __v: (item.__v || 0) + 1 }
          : item
      );
    },
    removeIngredient: (state, action) => {
      state.selectedIngredients = state.selectedIngredients.filter(
        (item) => item.idx !== action.payload
      );
    },
    resetConstructor: (state, action) => {
      state.selectedBun = null;
      state.selectedIngredients = [];
    },
    calcTotalPrice: (state, action) => {
      state.totalPrice =
        (state.selectedBun ? state.selectedBun.price * 2 : 0) +
        state.selectedIngredients?.reduce(
          (acc, ingredient) => acc + ingredient.price,
          0
        );
    },
    moveIngredient: (state, action) => {
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
