import axiosClient from "./axiosClient";

const url = "/auth";

export const authApi = {
  login(body) {
    return axiosClient.post(`${url}/login`, body);
  },
  verifyOtp(body) {
    return axiosClient.post(`${url}/verify-otp`, body);
  },
  resendOtp(body) {
    return axiosClient.post(`${url}/resend-otp`, body);
  },

  getMe() {
    return axiosClient.get(`${url}/me`);
  },
};
