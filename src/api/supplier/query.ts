import { useMutation } from "@tanstack/react-query";
import { getSupplierDetailBySlug } from "./api";
import { SupplierDetailDto } from "@/interface/common";

export const useGetSupplierDetailBySlug = () => {
  const { error, isPending, mutate, reset, data, isSuccess } = useMutation({
    mutationFn: getSupplierDetailBySlug,
    onSuccess: (data: SupplierDetailDto) => {},
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { getSupplierDetailBySlug: mutate, isPending, error, data, isSuccess };
};
