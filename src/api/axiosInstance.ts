import axios, { AxiosError } from "axios";

export interface ApiError {
  message: string;
  status?: number;
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const normalizedError: ApiError = {
      message: "Something went wrong.",
      status: error.response?.status,
    };

    if (error.response?.data && typeof error.response.data === "object") {
      const data = error.response.data as any;
      normalizedError.message =
        data.message || data.error || normalizedError.message;
    } else if (error.message) {
      normalizedError.message = error.message;
    }

    return Promise.reject(normalizedError);
  },
);
