import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { API } from "../../../utils/constants";
import {
  IIngredient,
  IIngredientResponse,
} from "../../../types/ingredient-types";
import { request } from "../../../utils/burger-api";

type TIngredientsState = {
  ingredients: IIngredient[];
  getIngredientsFailed: boolean;
  getIngredientsRequest: boolean;
};

const initialState: TIngredientsState = {
  ingredients: [],
  getIngredientsRequest: false,
  getIngredientsFailed: false,
};

export const getIngredients = createAsyncThunk<IIngredient[], void>(
  "ingredients/getIngredients",
  async () => {
    const response = await request<IIngredientResponse>(
      `${API.baseUrl}${API.endpoints.ingredients}`
    );
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
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<IIngredient[]>) => {
          state.ingredients = action.payload;
          state.getIngredientsRequest = false;
          state.getIngredientsFailed = false;
        }
      )
      .addCase(getIngredients.rejected, (state) => {
        state.getIngredientsRequest = false;
        state.getIngredientsFailed = true;
      });
  },
});

export default ingredientsSlice.reducer;
