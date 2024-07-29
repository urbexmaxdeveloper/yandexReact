import { mockUser } from "../../../utils/test-mocks";
import {
  checkUserAuth,
  editUser,
  userLogin,
  userRegister,
  userLogout,
} from "./auth";
import reducer, { initialState } from "./user";

describe("user slice testing", () => {
  it("must return the initial state", () => {
    expect(reducer(undefined, {} as any)).toEqual(initialState);
  });

  it("must handle userLogin.fulfilled", () => {
    expect(
      reducer(initialState, {
        type: userLogin.fulfilled.type,
        payload: { user: mockUser },
      })
    ).toEqual({
      ...initialState,
      user: mockUser,
      isRequestFailed: false,
      isRequestLoading: false,
    });
  });

  it("must handle userLogin.rejected", () => {
    expect(
      reducer(initialState, {
        type: userLogin.rejected.type,
      })
    ).toEqual({
      ...initialState,
      isRequestFailed: true,
      isRequestLoading: false,
    });
  });

  it("must handle userRegister.fulfilled", () => {
    expect(
      reducer(initialState, {
        type: userRegister.fulfilled.type,
        payload: { user: mockUser },
      })
    ).toEqual({
      ...initialState,
      user: mockUser,
      isRequestFailed: false,
      isRequestLoading: false,
    });
  });

  it("must handle userRegister.rejected", () => {
    expect(
      reducer(initialState, {
        type: userRegister.rejected.type,
      })
    ).toEqual({
      ...initialState,
      isRequestFailed: true,
      isRequestLoading: false,
    });
  });

  it("successful user verification", () => {
    expect(
      reducer(initialState, {
        type: checkUserAuth.fulfilled.type,
        payload: { user: mockUser },
      })
    ).toEqual({
      ...initialState,
      user: mockUser,
      isAuthChecked: true,
      isRequestFailed: false,
      isRequestLoading: false,
    });
  });

  it("user verification failed", () => {
    expect(
      reducer(initialState, {
        type: checkUserAuth.rejected.type,
      })
    ).toEqual({
      ...initialState,
      isAuthChecked: true,
      isRequestFailed: true,
      isRequestLoading: false,
    });
  });

  it("should return updated user data", () => {
    expect(
      reducer(initialState, {
        type: editUser.fulfilled.type,
        payload: { user: { ...mockUser, email: "newemail@example.com" } },
      })
    ).toEqual({
      ...initialState,
      user: { ...mockUser, email: "newemail@example.com" },
      isRequestFailed: false,
      isRequestLoading: false,
    });
  });

  it("should return an error when user data is changed", () => {
    expect(
      reducer(initialState, {
        type: editUser.rejected.type,
      })
    ).toEqual({
      ...initialState,
      isRequestFailed: true,
      isRequestLoading: false,
    });
  });

  it("must handle userLogout.fulfilled", () => {
    expect(
      reducer(initialState, {
        type: userLogout.fulfilled.type,
      })
    ).toEqual({
      ...initialState,
      isRequestLoading: false,
      user: null,
    });
  });

  it("must handle  userLogout.rejected", () => {
    expect(
      reducer(initialState, {
        type: userLogout.rejected.type,
      })
    ).toEqual({
      ...initialState,
      isRequestFailed: true,
    });
  });
});
