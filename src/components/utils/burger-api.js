import { cookies } from "../services/slices/user-slice/auth";
import { API } from "./constants";

const checkResponse = (response) => {
  return response.ok
    ? response.json()
    : response.json().then((err) => Promise.reject(err));
};

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

export { checkResponse, request };

export const refreshToken = () => {
  return request(`${API.baseUrl}${API.endpoints.refreshToken}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: cookies.get("refreshToken") }),
  });
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await request(url, options);
    return res;
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      cookies.set("refreshToken", refreshData.refreshToken);
      cookies.set("accessToken", refreshData.accessToken.split("Bearer ")[1]);
      options.headers.authorization = refreshData.accessToken;
      const res = await request(url, options);
      return res;
    } else {
      return Promise.reject(err);
    }
  }
};
