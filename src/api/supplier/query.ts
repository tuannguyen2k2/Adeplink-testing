import { useMutation } from "@tanstack/react-query";
import { getRecommendSupplier, getSupplierDetailBySlug } from "./api";
import {
  GetRecommendSupplierType,
  SupplierDetailDto,
} from "@/interface/common";
import { getSearchSupplier } from ".";

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
