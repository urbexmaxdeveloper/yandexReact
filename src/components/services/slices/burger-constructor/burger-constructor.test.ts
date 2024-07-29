import reducer, {
  addIngredient,
  calcTotalPrice,
  initialState,
  moveIngredient,
  removeIngredient,
  resetConstructor,
  setBun,
} from "./burger-constructor";
import {
  ingredient1,
  mockBun,
  ingredient2,
  ingredient3,
} from "../../../utils/test-mocks";

describe("Burger Constructor Reducer Tests", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it("should add a bun to the constructor", () => {
    const action = setBun(mockBun);
    const expectedState = {
      ...initialState,
      selectedBun: mockBun,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it("should add an ingredient to the constructor", () => {
    const action = addIngredient(ingredient1);
    const expectedState = {
      ...initialState,
      selectedIngredients: [ingredient1],
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it("should remove an ingredient by id", () => {
    const action = removeIngredient("test-id");
    const expectedState = initialState;
    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it("should reset the constructor", () => {
    const stateWithBunAndIngredients = {
      ...initialState,
      selectedBun: mockBun,
      selectedIngredients: [ingredient1],
    };
    const action = resetConstructor();
    const expectedState = {
      ...initialState,
      selectedBun: null,
      selectedIngredients: [],
    };
    expect(reducer(stateWithBunAndIngredients, action)).toEqual(expectedState);
  });

  it("should calculate the total price correctly", () => {
    const stateWithBunAndIngredients = {
      ...initialState,
      selectedBun: mockBun,
      selectedIngredients: [ingredient1, ingredient2],
    };
    const expectedTotalPrice =
      mockBun.price * 2 + ingredient1.price + ingredient2.price;
    const action = calcTotalPrice();
    const updatedState = reducer(stateWithBunAndIngredients, action);
    expect(updatedState.totalPrice).toEqual(expectedTotalPrice);
  });

  it("should move an ingredient correctly", () => {
    const initialStateWithIngredients = {
      ...initialState,
      selectedIngredients: [ingredient1, ingredient2, ingredient3],
    };
    const action = moveIngredient({ dragIndex: 0, hoverIndex: 1 });
    const expectedState = {
      ...initialState,
      selectedIngredients: [ingredient2, ingredient1, ingredient3],
    };
    expect(reducer(initialStateWithIngredients, action)).toEqual(expectedState);
  });
});
