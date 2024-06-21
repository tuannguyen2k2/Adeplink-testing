import { useMutation } from "@tanstack/react-query";
import {
  deleteAddress,
  editAddress,
  getAddresses,
  saveAddress,
  setDefaultAddress,
  signUpBecomeSupplier,
} from "./api";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { ADEPTLINK_USER } from "@/constant/cookies";
import { setUser } from "@/store/slice/accountSlice";
import { AddressFormType, ListAddressesType } from "@/interface/common";

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

export const useSaveAddress = () => {
  const { error, isPending, mutate, isSuccess, reset } = useMutation({
    mutationFn: saveAddress,
    onSuccess: (data) => {},
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { saveAddress: mutate, isPending, isSuccess, error };
};

export const useSetDefaultAddress = () => {
  const { error, isPending, mutate, isSuccess, reset } = useMutation({
    mutationFn: setDefaultAddress,
    onSuccess: (data) => {},
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { setDefaultAddress: mutate, isPending, isSuccess, error };
};

export const useEditAddress = () => {
  const { error, isPending, mutate, isSuccess, reset } = useMutation({
    mutationFn: editAddress,
    onSuccess: (data) => {},
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { editAddress: mutate, isPending, isSuccess, error };
};

export const useDeleteAddress = () => {
  const { error, isPending, mutate, isSuccess, reset } = useMutation({
    mutationFn: deleteAddress,
    onSuccess: (data) => {},
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { deleteAddress: mutate, isPending, isSuccess, error };
};

export const useGetAddresses = () => {
  const { error, isPending, mutate, isSuccess, reset, data } = useMutation({
    mutationFn: getAddresses,
    onSuccess: (data: ListAddressesType) => {},
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { getAddresses: mutate, isPending, isSuccess, error, data };
};
