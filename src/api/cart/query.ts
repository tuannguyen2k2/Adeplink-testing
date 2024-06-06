import { useMutation } from "@tanstack/react-query";
import { addToCart, deleteCartItem, getCart, updateCartItem } from "./api";
import { CartType } from "@/interface/common";

export const useAddToCart = () => {
  const { error, isPending, mutate, reset, data, isSuccess } = useMutation({
    mutationFn: addToCart,
    onSuccess: () => {},
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { addToCart: mutate, isPending, error, data, isSuccess };
};

export const useGetCart = () => {
  const { error, isPending, mutate, reset, data, isSuccess } = useMutation({
    mutationFn: getCart,
    onSuccess: (data: CartType) => {},
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { getCart: mutate, isPending, error, data, isSuccess };
};

export const useDeleteCartItem = () => {
  const { error, isPending, mutate, reset, data } = useMutation({
    mutationFn: deleteCartItem,
    onSuccess: () => {},
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { deleteCartItem: mutate, isPending, error, data };
};

export const useUpdateCartItem = () => {
  const { error, isPending, mutate, reset, data } = useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {},
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { updateCartItem: mutate, isPending, error, data };
};