import reducer, { handleAndPlaceOrder, initialState } from "./order-post";
import { mockOrder } from "../../../utils/test-mocks"; // Обязательно убедитесь, что mockOrder соответствует типу IOrderResponse

describe("orderPost slice testing", () => {
  it("должен вернуть начальное состояние", () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it("must handle handleAndPlaceOrder.pending", () => {
    expect(
      reducer(initialState, {
        type: handleAndPlaceOrder.pending.type,
      })
    ).toEqual({
      ...initialState,
      postRequest: true,
    });
  });

  it("must handle  handleAndPlaceOrder.fulfilled", () => {
    expect(
      reducer(initialState, {
        type: handleAndPlaceOrder.fulfilled.type,
        payload: mockOrder,
      })
    ).toEqual({
      orderList: mockOrder,
      postFailed: false,
      postRequest: false,
    });
  });

  it("must handle  handleAndPlaceOrder.rejected", () => {
    expect(
      reducer(initialState, {
        type: handleAndPlaceOrder.rejected.type,
      })
    ).toEqual({
      ...initialState,
      postFailed: true,
      postRequest: false,
    });
  });
});
