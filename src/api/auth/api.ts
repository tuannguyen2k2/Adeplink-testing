import axiosConfig from "@/config/axiosConfig";
import {
  SignUpDto,
  loginDto,
  resetPasswordDto,
  verifyOtpDto
} from "@/interface/user";

export const login = async (data: loginDto) => {
  return await axiosConfig
    .post("login/access-token", new URLSearchParams(data))
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const logout = async () => {
  return await axiosConfig
    .post("login/logout")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const signup = async (data: SignUpDto) => {
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

export const sendOtpReset = async (email: string) => {
  return await axiosConfig
    .post("login/password/reset", { email })
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

export const verifyOtpReset = async (data: verifyOtpDto) => {
  return await axiosConfig
    .post("login/password/reset/verify", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const resetPassword = async (data: resetPasswordDto) => {
  return await axiosConfig
    .post("login/password/reset/confirm", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
