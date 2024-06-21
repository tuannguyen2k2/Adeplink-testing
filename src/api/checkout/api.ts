import axiosConfig from "@/config/axiosConfig";
import { OrderFormType } from "@/interface/common";

export const postOrder = async (data: OrderFormType) => {
  return await axiosConfig
    .post(`/order`, data)
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error);
    });
};
