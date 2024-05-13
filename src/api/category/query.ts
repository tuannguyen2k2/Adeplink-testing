import { useMutation } from "@tanstack/react-query";

import { CategoriesHierarchyDto, CategoryDto } from "@/interface/common";
import { getAllCategoryRoot, getCategoriesHierarchy } from "./api";


export const useGetAllCategoryRoot = () => {
  // const setUser = useAuthStore()((state) => state.setUser);
  // Must initialize queryClient from useQueryClient not use getQueryClient from server

  const { error, isPending, mutate, reset, data } = useMutation({
    mutationFn: getAllCategoryRoot,
    onSuccess: (data: CategoryDto[]) => {},
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { getAllCategoryRoot: mutate, isPending, error, data };
};

export const useGetCategoriesHierarchy = () => {

  const { error, isPending, mutate, reset, data } = useMutation({
    mutationFn: getCategoriesHierarchy,
    onSuccess: (data: CategoriesHierarchyDto[]) => {},
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { getCategoriesHierarchy: mutate, isPending, error, data };
};

