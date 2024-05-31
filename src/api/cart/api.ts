import axiosConfig from "@/config/axiosConfig";
import { AxiosRequestConfig } from "axios";

export const addToCart = async (data: {
  quantity: number;
  product_id: string;
  variant_id: string;
}) => {
  return await axiosConfig
    .post("cart", data)
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};

export const getCart = async () => {
  return await axiosConfig
    .get("cart")
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};

export const deleteCartItem = async (data: string) => {
  const dataDele = {
    variant_id: data,
  };

  return await axiosConfig
    .delete("cart", { data: dataDele })
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};
