import { ADEPTLINK_ACCESS_TOKEN, ADEPTLINK_USER } from "@/constant/cookies";
import { USER_KEY } from "@/constant/queryKey";
import { LoginResponse } from "@/interface/user";
import { setUser } from "@/store/slice/accountSlice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import {
  login,
  logout,
  resendOtp,
  resetPassword,
  sendOtpReset,
  signup,
  verifyOtp,
  verifyOtpReset,
} from "./api";

export const useLogin = () => {
  // const setUser = useAuthStore()((state) => state.setUser);
  // Must initialize queryClient from useQueryClient not use getQueryClient from server
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useDispatch();

  const { error, isPending, mutate, reset } = useMutation({
    mutationFn: login,
    onSuccess: (data: LoginResponse) => {
      dispatch(setUser(data.user));
      Cookies.set(ADEPTLINK_USER, JSON.stringify(data.user));
      Cookies.set(ADEPTLINK_ACCESS_TOKEN, JSON.stringify(data.access_token));
      queryClient.setQueryData(USER_KEY, data);
      router.replace("/");
    },
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { login: mutate, isPending, error };
};

export const useLogout = () => {
  // const setUser = useAuthStore()((state) => state.setUser);
  // Must initialize queryClient from useQueryClient not use getQueryClient from server


  const { error, isPending, mutate, reset } = useMutation({
    mutationFn: logout,
    onSuccess: (data: LoginResponse) => {
    },
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { logout: mutate, isPending, error };
};




export const useSignup = () => {
  const { error, isPending, mutate, reset, isSuccess } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {},
    onError: (error) => {
      console.log(error);
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { signup: mutate, isPending, error, isSuccess };
};

export const useSendOTP = () => {
  const { error, isPending, mutate, reset, isSuccess } = useMutation({
    mutationFn: resendOtp,
    onSuccess: (data) => {},
    onError: () => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { resendOtp: mutate, isPending, error, isSuccess };
};

export const useSendOTPReset = () => {
  const { error, isPending, mutate, reset, isSuccess } = useMutation({
    mutationFn: sendOtpReset,
    onSuccess: (data) => {},
    onError: () => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { sendOtpReset: mutate, isPending, error, isSuccess };
};

export const useVerifyOTP = () => {
  const { error, isPending, mutate, reset, isSuccess, data } = useMutation({
    mutationFn: verifyOtp,
    onSuccess: (data) => {},
    onError: () => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { verifyOtp: mutate, isPending, error, isSuccess, data };
};

export const useVerifyOTPReset = () => {
  const { error, isPending, mutate, reset, isSuccess, data } = useMutation({
    mutationFn: verifyOtpReset,
    onSuccess: (data) => {},
    onError: () => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { verifyOtpReset: mutate, isPending, error, isSuccess, data };
};

export const useResetPassword = () => {
  const { error, isPending, mutate, reset, isSuccess } = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {},
    onError: () => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { resetPassword: mutate, isPending, error, isSuccess };
};
