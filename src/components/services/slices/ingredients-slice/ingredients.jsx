import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../../../utils/burger-api";
import { getIngredientsUrl, normaApi } from "../../../utils/config";

const initialState = {
  ingredients: [],
  getIngredientsRequest: false,
  getIngredientsFailed: false,
};

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async () => {
    const response = await getData(`${normaApi}${getIngredientsUrl}`);
    return response.data;
  }
);

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.getIngredientsRequest = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.getIngredientsRequest = false;
        state.getIngredientsFailed = false;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.getIngredientsRequest = false;
        state.getIngredientsFailed = true;
      });
  },
});

export const { setIngredients } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
