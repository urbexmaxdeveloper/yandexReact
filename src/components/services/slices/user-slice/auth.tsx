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

// Вспомогательная функция для установки токенов
const setTokens = (response: IUserResponse) => {
  cookies.set("accessToken", response.accessToken.split("Bearer ")[1], {
    path: "/",
  });
  cookies.set("refreshToken", response.refreshToken, { path: "/" });
};

// Вспомогательная функция для удаления токенов
const clearTokens = () => {
  cookies.remove("accessToken");
  cookies.remove("refreshToken");
};

// Функция регистрации пользователя
export const userRegister = createAsyncThunk<IUserResponse, IUserRegister>(
  "user/userRegister",
  async (form) => {
    console.log("Registering user with form:", form);
    const response = await request<IUserResponse>(
      `${API.baseUrl}${API.endpoints.register}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    if (response.success) {
      console.log("User registered successfully:", response);
      setTokens(response);
      return response;
    } else {
      console.error("User registration failed:", response);
      throw new Error("User registration failed");
    }
  }
);

// Функция входа пользователя
export const userLogin = createAsyncThunk<IUserResponse, IUserLogin>(
  "user/userLogin",
  async (form) => {
    console.log("Logging in user with form:", form);
    const response = await request<IUserResponse>(
      `${API.baseUrl}${API.endpoints.login}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    if (response.success) {
      console.log("User logged in successfully:", response);
      setTokens(response);
      return response;
    } else {
      console.error("User login failed:", response);
      throw new Error("User login failed");
    }
  }
);

// Функция выхода пользователя
export const userLogout = createAsyncThunk("user/userLogout", async () => {
  console.log("Logging out user");
  const response = await request<IUserLogout>(
    `${API.baseUrl}${API.endpoints.logout}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: cookies.get("refreshToken") }),
    }
  );

  if (response.success) {
    console.log("User logged out successfully");
    clearTokens();
  } else {
    console.error("User logout failed:", response);
  }
});

// Функция запроса на сброс пароля
export const forgotPassword = async (email: string) => {
  console.log("Requesting password reset for email:", email);
  const response = await request<{
    success: true;
    message: "Reset email sent";
  }>(`${API.baseUrl}${API.endpoints.forgotPassword}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  console.log("Password reset response:", response);
  return response;
};

// Функция сброса пароля
export const resetPassword = async (form: IUserResetPassword) => {
  console.log("Resetting password with form:", form);
  const response = await request<{
    success: true;
    message: "Password successfully reset";
  }>(`${API.baseUrl}${API.endpoints.resetPassword}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password: form.password, token: form.token }),
  });

  if (response.success) {
    console.log("Password reset successfully:", response);
    return response;
  } else {
    console.error("Password reset failed:", response);
    throw new Error("Password reset failed");
  }
};

// Функция проверки авторизации пользователя
export const checkUserAuth = createAsyncThunk<IUserAuth, undefined>(
  "user/getAuthUserData",
  async () => {
    const token = cookies.get("accessToken");
    console.log("Checking user auth with access token:", token);
    const response = await fetchWithRefresh<IUserAuth>(
      `${API.baseUrl}${API.endpoints.userData}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.success) {
      console.log("User auth data retrieved successfully:", response);
      return response;
    } else {
      console.error("User auth data retrieval failed:", response);
      throw new Error("User login failed");
    }
  }
);

// Функция редактирования данных пользователя
export const editUser = createAsyncThunk<IUserAuth, IUserRegister>(
  "user/editUserData",
  async (data) => {
    const token = cookies.get("accessToken");
    console.log("Editing user data with token:", token, "and data:", data);
    const response = await fetchWithRefresh<IUserAuth>(
      `${API.baseUrl}${API.endpoints.userData}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (response.success) {
      console.log("User data edited successfully:", response);
      return response;
    } else {
      console.error("Edit user info failed:", response);
      throw new Error("Edit user info failed");
    }
  }
);
