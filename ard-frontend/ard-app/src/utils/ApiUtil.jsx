import { Navigate } from "react-router-dom";
import axios from "axios";
export const refresh = async () => {
  try {
    await axios.post(
      "http://localhost:8080/auth/refresh",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
  } catch (err) {
    <Navigate to="/" replace />;
    return Promise.reject(err);
  }
};

export const fetchWithRefresh = async (fetcher) => {
  try {
    return await fetcher();
  } catch (err) {
    if (err.response?.status === 401) {
      await refresh();
      return await fetcher();
    }
    throw err;
  }
};
