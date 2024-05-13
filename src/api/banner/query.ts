import { useMutation } from "@tanstack/react-query";
import { getAllBanner } from "./api";
import { BannerDto } from "@/interface/user";

export const useGetAllBanner = () => {
  // const setUser = useAuthStore()((state) => state.setUser);
  // Must initialize queryClient from useQueryClient not use getQueryClient from server

  const { error, isPending, mutate, reset, data } = useMutation({
    mutationFn: getAllBanner,
    onSuccess: (data: BannerDto[]) => {},
    onError: (err) => {
      setTimeout(() => {
        reset();
      }, 2000);
    },
  });
  return { getAllBanner: mutate, isPending, error, data };
};
