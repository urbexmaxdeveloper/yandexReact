import { createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../../utils/constants";
import Cookies from "universal-cookie";
import {
  IUserLogin,
  IUserRegister,
  IUserResponse,
  IUserLogout,
  IUserAuth,
  IUserResetPassword,
} from "../../../types/user-types";
import { fetchWithRefresh, request } from "../../../utils/burger-api";

export const cookies = new Cookies();

export const userRegister = createAsyncThunk<IUserResponse, IUserRegister>(
  "user/userRegister",
  async (form) => {
    const response = await request<IUserResponse>(
      `${API.baseUrl}${API.endpoints.register}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );
    if (response.success) {
      cookies.set("accessToken", response.accessToken.split("Bearer ")[1], {
        path: "/",
      });
      cookies.set("refreshToken", response.refreshToken, { path: "/" });
      return response as IUserResponse;
    } else {
      throw new Error("User registration failed");
    }
  }
);

export const userLogin = createAsyncThunk<IUserResponse, IUserLogin>(
  "user/userLogin",
  async (form) => {
    const response = await request<IUserResponse>(
      `${API.baseUrl}${API.endpoints.login}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );
    if (response.success) {
      cookies.set("accessToken", response.accessToken.split("Bearer ")[1], {
        path: "/",
      });
      cookies.set("refreshToken", response.refreshToken, { path: "/" });
      return response;
    } else {
      throw new Error("User login failed");
    }
  }
);

export const userLogout = createAsyncThunk("user/userLogout", async () => {
  const response = await request<IUserLogout>(
    `${API.baseUrl}${API.endpoints.logout}`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ token: cookies.get("refreshToken") }),
    }
  );
  if (response.success) {
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
  }
});

export const forgotPassword = async (data: string) => {
  const response = await request<{
    success: true;
    message: "Reset email sent";
  }>(`${API.baseUrl}${API.endpoints.forgotPassword}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email: data }),
  });

  return response;
};

export const resetPassword = async (form: IUserResetPassword) => {
  const response = await request<{
    success: true;
    message: "Password successfully reset";
  }>(`${API.baseUrl}${API.endpoints.resetPassword}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ password: form.password, token: form.token }),
  });

  if (response.success) {
    return response;
  }
};

export const checkUserAuth = createAsyncThunk<IUserAuth, undefined>(
  "user/getAuthUserData",
  async () => {
    const response = await fetchWithRefresh<IUserAuth>(
      `${API.baseUrl}${API.endpoints.userData}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + cookies.get("accessToken"),
        },
      }
    );
    if (response.success) {
      return response;
    } else {
      throw new Error("User login failed");
    }
  }
);

export const editUser = createAsyncThunk<IUserAuth, IUserRegister>(
  "user/editUserData",
  async (data) => {
    const response = await fetchWithRefresh<IUserAuth>(
      `${API.baseUrl}${API.endpoints.userData}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          authorization: "Bearer " + cookies.get("accessToken"),
        },
        body: JSON.stringify(data),
      }
    );
    if (response.success) {
      return response;
    } else {
      throw new Error("Edit user info failed");
    }
  }
);
