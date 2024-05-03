import axiosConfig from "@/config/axiosConfig";
import { loginDto, resetPasswordDto, signupDto, verifyOtpDto } from "@/interface/user";
import { SignupForm } from "@/model/form/AuthForm";

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
    .post("user/open", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const sendOtp = async (email: string) => {
  return await axiosConfig
    .post("login/send-otp", new URLSearchParams({ email: email }))
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const verifyOtp = async (data: verifyOtpDto) => {
  return await axiosConfig
    .post("login/verify-otp", new URLSearchParams({ email: data.email, otp: data.otp }))
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const resetPassword = async (data: resetPasswordDto) => {
  return await axiosConfig
    .post("login/reset-password", new URLSearchParams({ token: data.token, new_password: data.password }))
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
