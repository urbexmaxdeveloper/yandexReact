import { API } from "./constants";
import { cookies } from "../services/slices/user-slice/auth";

interface IRefreshData {
  success: boolean;
  refreshToken: string;
  accessToken: string;
}

export const checkResponse = <T>(response: Response): Promise<T> => {
  return response.ok
    ? response.json()
    : response.json().then((err) => Promise.reject(err));
};

export const request = <T>(url: string, options?: RequestInit): Promise<T> => {
  const defaultHeaders: HeadersInit = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  const defaultOptions: RequestInit = {
    headers: defaultHeaders,
    ...options,
  };

  return fetch(url, defaultOptions).then(checkResponse<T>);
};

export const refreshToken = (): Promise<IRefreshData> => {
  return request<IRefreshData>(`${API.baseUrl}${API.endpoints.refreshToken}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: cookies.get("refreshToken") }),
  });
};

export const fetchWithRefresh = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  try {
    const res = await request<T>(url, options);
    return res;
  } catch (err) {
    if ((err as { message?: string }).message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      cookies.set("refreshToken", refreshData.refreshToken);
      cookies.set("accessToken", refreshData.accessToken.split("Bearer ")[1]);
      const headers: Record<string, string> = {
        "Content-Type": "application/json",
      };
      headers.authorization = refreshData.accessToken;
      options.headers = headers;
      const res = await request<T>(url, options);
      return res;
    } else {
      return Promise.reject(err);
    }
  }
};
