import axiosConfig from "@/config/axiosConfig";
import {
  loginDto,
  resetPasswordDto,
  signupDto,
  verifyOtpDto,
} from "@/interface/user";

export const login = async (data: loginDto) => {
  return await axiosConfig
    .post("login/access-token", new URLSearchParams(data))
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const signup = async (data: signupDto) => {
  return await axiosConfig
    .post("login/register", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const resendOtp = async (email: string) => {
  return await axiosConfig
    .post("login/register/resend", { email })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const verifyOtp = async (data: verifyOtpDto) => {
  return await axiosConfig
    .post("login/register/verify", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const resetPassword = async (data: resetPasswordDto) => {
  return await axiosConfig
    .post(
      "login/reset-password",
      new URLSearchParams({ token: data.token, new_password: data.password })
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
