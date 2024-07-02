import { useMutation } from "@tanstack/react-query";
import {
  getProductOfSupplier,
  getRecommendSupplier,
  getSearchSupplier,
  getSupplierDetailBySlug,
} from "./api";
import {
  GetRecommendSupplierType,
  GetSearchSupplierType,
  ProductDto,
  SupplierDetailDto,
} from "@/interface/common";

export const useGetSupplierDetailBySlug = () => {
  const { error, isPending, mutate, reset, data, isSuccess } = useMutation({
    mutationFn: getSupplierDetailBySlug,
    onSuccess: (data: SupplierDetailDto) => data,
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { getSupplierDetailBySlug: mutate, isPending, error, data, isSuccess };
};

export const useGetProductOfSupplier = () => {
  const { error, isPending, mutate, reset, data, isSuccess } = useMutation({
    mutationFn: getProductOfSupplier,
    onSuccess: (data: { product: ProductDto[]; total_page: number }) => data,
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { getProductOfSupplier: mutate, isPending, error, data, isSuccess };
};

export const useGetRecommendSupplier = () => {
  const { error, isPending, mutate, reset, data, isSuccess } = useMutation({
    mutationFn: getRecommendSupplier,
    onSuccess: (data: GetRecommendSupplierType[]) => data,
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { getRecommendSupplier: mutate, isPending, error, data, isSuccess };
};

export const useGetSearchSupplier = () => {
  const { error, isPending, mutate, reset, data, isSuccess } = useMutation({
    mutationFn: getSearchSupplier,
    onSuccess: (data: GetSearchSupplierType) => data,
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { getSearchSupplier: mutate, isPending, error, data, isSuccess };
};
