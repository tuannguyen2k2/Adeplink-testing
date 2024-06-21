import { useMutation } from "@tanstack/react-query";
import { getDistrictsVN, getProvincesVN } from "./api";
import { CityType, StateType } from "@/interface/common";

export const useGetProvincesVN = () => {
  const { error, isPending, mutate, reset, data, isSuccess } = useMutation({
    mutationFn: getProvincesVN,
    onSuccess: (data: StateType[]) => data,
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { getProvincesVN: mutate, isPending, error, data, isSuccess };
};

export const useGetDistrictsVN = () => {
  const { error, isPending, mutate, reset, data, isSuccess } = useMutation({
    mutationFn: getDistrictsVN,
    onSuccess: (data: CityType[]) => data,
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { getDistrictsVN: mutate, isPending, error, data, isSuccess };
};
