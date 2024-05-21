import { useMutation } from "@tanstack/react-query";

import { ProductDto, ProductSearchResultDto } from "@/interface/common";
import { getAllProduct, getProductByCategory, getProductSearch } from "./api";

export const useGetAllProduct = () => {
  // const setUser = useAuthStore()((state) => state.setUser);
  // Must initialize queryClient from useQueryClient not use getQueryClient from server

  const { error, isPending, mutate, reset, data } = useMutation({
    mutationFn: getAllProduct,
    onSuccess: (data: ProductDto[]) => {},
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { getAllProduct: mutate, isPending, error, data };
};

export const useGetProductSearch = () => {
  // const setUser = useAuthStore()((state) => state.setUser);
  // Must initialize queryClient from useQueryClient not use getQueryClient from server

  const { error, isPending, mutate, reset, data, isSuccess } = useMutation({
    mutationFn: getProductSearch,
    onSuccess: (data: ProductSearchResultDto) => {},
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { getProductSearch: mutate, isPending, error, data, isSuccess };
};

export const useGetProductByCategory = () => {
  const { error, isPending, mutate, reset, data, isSuccess } = useMutation({
    mutationFn: getProductByCategory,
    onSuccess: (data: ProductSearchResultDto) => {},
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { getProductByCategory: mutate, isPending, error, data, isSuccess };
};