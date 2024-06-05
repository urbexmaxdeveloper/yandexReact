import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { request } from "../../../utils/burger-api";
import { getIngredientsUrl, normaApi } from "../../../utils/config";

const initialState = {
  ingredients: [],
  loading: false,
  error: false,
};

export const getIngredients = createAsyncThunk(
  "ingredients/getIngredients",
  async () => {
    try {
      const response = await request(`${normaApi}${getIngredientsUrl}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false;
        state.error = false;
      })
      .addCase(getIngredients.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { setIngredients } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
