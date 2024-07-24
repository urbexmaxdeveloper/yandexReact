import { API } from "./constants";
import { IRefreshToken, TTokenError } from "../types/user-types";
import { cookies } from "../services/slices/user-slice/auth";

export const checkResponse = <T>(response: Response): Promise<T> => {
  return response.ok
    ? response.json()
    : response.json().then((err) => Promise.reject(err));
};

export const request = <T>(url: string, options?: RequestInit): Promise<T> => {
  return fetch(url, options).then(checkResponse<T>);
};

export const refreshToken = (): Promise<IRefreshToken> => {
  const refreshToken = cookies.get("refreshToken");
  console.log("Current refresh token:", refreshToken);

  return request<IRefreshToken>(`${API.baseUrl}${API.endpoints.refreshToken}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: refreshToken }),
  });
};

export const fetchWithRefresh = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  console.log("Entering fetchWithRefresh");
  try {
    const res = await request<T>(url, options);
    return res;
  } catch (err: unknown) {
    const error = err as TTokenError;
    console.log("Error in fetchWithRefresh:", error);

    if (error.message === "jwt expired") {
      console.log("JWT expired, attempting to refresh token");
      try {
        const refreshData = await refreshToken();
        console.log("Refresh data:", refreshData);

        if (!refreshData.success) {
          return Promise.reject(new Error("Refresh token failed"));
        }

        cookies.set("refreshToken", refreshData.refreshToken);
        cookies.set("accessToken", refreshData.accessToken.split("Bearer ")[1]);

        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            refreshData.accessToken.split("Bearer ")[1]
          }`,
        };

        const newOptions: RequestInit = {
          ...options,
          headers: {
            ...options.headers,
            ...headers,
          },
        };

        const res = await request<T>(url, newOptions);
        return res;
      } catch (refreshErr: unknown) {
        console.log("Error during token refresh:", refreshErr);
        return Promise.reject(new Error("Failed to refresh token"));
      }
    } else {
      return Promise.reject(error);
    }
  }
};
