import { useMutation } from "@tanstack/react-query";

import { ProductDetailDto, ProductDto, ProductRatingDto, ProductSearchResultDto } from "@/interface/common";
import { getAllProductRecommended, getProductByCategory, getProductDetailBySlug, getProductSearch, getRatingByProductId } from "./api";

export const useGetAllProductRecommended = () => {
  // const setUser = useAuthStore()((state) => state.setUser);
  // Must initialize queryClient from useQueryClient not use getQueryClient from server

  const { error, isPending, mutate, reset, data } = useMutation({
    mutationFn: getAllProductRecommended,
    onSuccess: (data: ProductDto[]) => {},
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { getAllProductRecommended: mutate, isPending, error, data };
};

export const useGetProductDetailBySlug = () => {
  // const setUser = useAuthStore()((state) => state.setUser);
  // Must initialize queryClient from useQueryClient not use getQueryClient from server

  const { error, isPending, mutate, reset, data, isSuccess } = useMutation({
    mutationFn: getProductDetailBySlug,
    onSuccess: (data: ProductDetailDto) => {},
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { getProductDetailBySlug: mutate, isPending, error, data, isSuccess };
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

export const useGetRatingByProductId = () => {
  const { error, isPending, mutate, reset, data, isSuccess } = useMutation({
    mutationFn: getRatingByProductId,
    onSuccess: (data: ProductRatingDto) => {},
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { getRatingByProductId: mutate, isPending, error, data, isSuccess };
};
