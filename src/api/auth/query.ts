import { USER_KEY } from "@/constant/queryKey";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { login, resendOtp, resetPassword, signup, verifyOtp } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "@/store/selector";

export const useLogin = () => {
  // const setUser = useAuthStore()((state) => state.setUser);
  // Must initialize queryClient from useQueryClient not use getQueryClient from server
  const queryClient = useQueryClient();
  const router = useRouter();
  const dispatch = useDispatch();
  const { error, isPending, mutate, reset } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      // setUser(data);
      // Set user to queryClient
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

export const useSignup = () => {
  const { error, isPending, mutate, reset, isSuccess } = useMutation({
    mutationFn: signup,
    onSuccess: (data) => {},
    onError: (error) => {
      console.log(error)
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
