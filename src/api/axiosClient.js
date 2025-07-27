import axios from "axios";

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api`;

export const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
  // Auto attach token to request if available in local storage
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
  }

  // Do something before request is sent
  return config;
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // for single response: get data
    // for plural response: get data + meta
    const axiosData = response.data;

    return axiosData?.pagination ? axiosData : axiosData.data;
  },
  function (error) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;

    // 👉 If the response status is 401, remove the token.
    if (typeof window !== "undefined" && status === 401) {
      // localStorage.removeItem("token");
      // Optionally: redirect to login
      // window.location.href = '/login'
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(new Error(message || "Something went wrong."));
  }
);

export default axiosClient;
