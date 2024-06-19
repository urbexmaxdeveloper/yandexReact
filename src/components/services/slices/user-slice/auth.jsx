import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
import { fetchWithRefresh, request } from "../../../utils/burger-api";
import { API } from "../../../utils/constants";

export const cookies = new Cookies();
export const userRegister = createAsyncThunk(
  "user/userRegister",
  async (form) => {
    const response = await request(`${API.baseUrl}${API.endpoints.register}`, {
      method: "POST",
      body: JSON.stringify(form),
    });
    if (response.success) {
      cookies.set("accessToken", response.accessToken.split("Bearer ")[1], {
        path: "/",
      });
      cookies.set("refreshToken", response.refreshToken, { path: "/" });
      return response;
    }
  }
);

export const userLogin = createAsyncThunk("user/userLogin", async (form) => {
  const response = await request(`${API.baseUrl}${API.endpoints.login}`, {
    method: "POST",
    body: JSON.stringify(form),
  });
  if (response.success) {
    cookies.set("accessToken", response.accessToken.split("Bearer ")[1], {
      path: "/",
    });
    cookies.set("refreshToken", response.refreshToken, { path: "/" });
    return response;
  }
});

export const userLogout = createAsyncThunk("user/userLogout", async () => {
  const response = await request(`${API.baseUrl}${API.endpoints.logout}`, {
    method: "POST",
    body: JSON.stringify({ token: cookies.get("refreshToken") }),
  });
  if (response.success) {
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
  }
});

export const forgotPassword = async (data) => {
  const response = await request(
    `${API.baseUrl}${API.endpoints.forgotPassword}`,
    {
      method: "POST",
      body: JSON.stringify({ email: data }),
    }
  );

  return response;
};

export const resetPassword = async (form) => {
  const response = await request(
    `${API.baseUrl}${API.endpoints.resetPassword}`,
    {
      method: "POST",
      body: JSON.stringify({ password: form.password, token: form.token }),
    }
  );

  if (response.success) {
    return response;
  }
};

export const checkUserAuth = createAsyncThunk(
  "user/getAuthUserData",
  async () => {
    const response = await fetchWithRefresh(
      `${API.baseUrl}${API.endpoints.userData}`,
      {
        method: "GET",
        headers: {
          authorization: "Bearer " + cookies.get("accessToken"),
        },
      }
    );
    if (response.success) {
      return response;
    }
  }
);

export const editUser = createAsyncThunk("user/editUserData", async (data) => {
  const response = await fetchWithRefresh(
    `${API.baseUrl}${API.endpoints.userData}`,
    {
      method: "PATCH",
      headers: {
        authorization: "Bearer " + cookies.get("accessToken"),
      },
      body: JSON.stringify(data),
    }
  );
  if (response.success) {
    return response;
  }
});
