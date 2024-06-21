import { useMutation } from "@tanstack/react-query";
import { postOrder } from "./api";
import { OrderResponseType } from "@/interface/common";

export const usePostOrder = () => {
    const { error, isPending, mutate, reset, data, isSuccess } = useMutation({
      mutationFn: postOrder,
      onSuccess: (data: OrderResponseType) => data,
      onError: (err) => {
        setTimeout(() => {
          reset();
        }, 2000);
      },
    });
    return { postOrder: mutate, isPending, error, data, isSuccess };
  };