import userOrdersReducer, {
  wsUserOrdConnect,
  wsUserOrdDisconnect,
  wsUserOrdOpenSuccess,
  wsUserOrdClosed,
  wsUserOrdGetMessage,
  wsUserOrdError,
  initialState,
} from "./user-orders";
import { mockOrders } from "../../../utils/test-mocks";

describe("userOrdersSlice tests", () => {
  it("should return the initial state", () => {
    expect(userOrdersReducer(undefined, { type: "" })).toEqual(initialState);
  });

  it("should handle wsUserOrdConnect", () => {
    expect(userOrdersReducer(initialState, wsUserOrdConnect("test"))).toEqual(
      initialState
    );
  });

  it("should handle wsUserOrdDisconnect", () => {
    const stateWithConnection = {
      ...initialState,
      wsConnected: true,
    };
    const expectedState = {
      ...initialState,
      wsConnected: false,
    };
    expect(
      userOrdersReducer(stateWithConnection, wsUserOrdDisconnect())
    ).toEqual(expectedState);
  });

  it("should handle wsUserOrdOpenSuccess", () => {
    const expectedState = {
      ...initialState,
      wsConnected: true,
      error: null,
    };
    expect(userOrdersReducer(initialState, wsUserOrdOpenSuccess())).toEqual(
      expectedState
    );
  });

  it("should handle wsUserOrdClosed", () => {
    const stateWithConnection = {
      ...initialState,
      wsConnected: true,
    };
    const expectedState = {
      ...initialState,
      wsConnected: false,
    };
    expect(userOrdersReducer(stateWithConnection, wsUserOrdClosed())).toEqual(
      expectedState
    );
  });

  it("should handle wsUserOrdGetMessage", () => {
    const expectedState = {
      ...initialState,
      orderResponse: mockOrders,
      orders: mockOrders.orders,
    };
    expect(
      userOrdersReducer(initialState, wsUserOrdGetMessage(mockOrders))
    ).toEqual(expectedState);
  });

  it("should handle wsUserOrdError", () => {
    const errorMessage = "An error occurred";
    const expectedState = {
      ...initialState,
      error: errorMessage,
    };
    expect(
      userOrdersReducer(initialState, wsUserOrdError(errorMessage))
    ).toEqual(expectedState);
  });
});
