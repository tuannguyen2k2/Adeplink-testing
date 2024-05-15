import { useMutation } from "@tanstack/react-query";
import { signUpBecomeSupplier } from "./api";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { ADEPTLINK_USER } from "@/constant/cookies";
import { setUser } from "@/store/slice/accountSlice";

export const useSignUpBecomeSupplier = () => {
  const dispatch = useDispatch();
  const { error, isPending, mutate, isSuccess, reset } = useMutation({
    mutationFn: signUpBecomeSupplier,
    onSuccess: (data) => {
      dispatch(setUser(data.data));
      Cookies.set(ADEPTLINK_USER, JSON.stringify(data.data));
    },
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { signUpBecomeSupplier: mutate, isPending, isSuccess, error };
};
