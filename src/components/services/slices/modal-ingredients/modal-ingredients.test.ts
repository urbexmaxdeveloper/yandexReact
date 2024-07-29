import { ingredient1 } from "../../../utils/test-mocks";
import reducer, {
  initialState,
  setDetailIngredient,
} from "./modal-ingredients";

describe("modal ingredient slice", () => {
  it("must return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it("must set ingredient in modal window", () => {
    expect(reducer(initialState, setDetailIngredient(ingredient1))).toEqual({
      ...initialState,
      detailIngredient: ingredient1,
    });
  });
});
