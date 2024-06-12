import axiosConfig from "@/config/axiosConfig";
import { PriceProductDetailType } from "@/interface/common";
import { AxiosRequestConfig } from "axios";

export const addToCart = async (data: {
  quantity: number;
  product_id: string;
  variant_id?: string;
  min_order: number;
  price: PriceProductDetailType[];
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

export const deleteCartItem = async (data: {
  product_id: string;
  variant_id?: string;
  quantity?: number;
}) => {
  data.quantity = 1;
  return await axiosConfig
    .delete("cart", { data: data })
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};

export const updateCartItem = async (data: {
  product_id: string;
  variant_id?: string;
  quantity?: number;
  min_order: number;
  price: PriceProductDetailType[];
}) => {
  return await axiosConfig
    .put(`cart`, data)
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};

export const tickCartItem = async (data: {
  product_id: string;
  variant_id?: string;
  is_tick: boolean;
}) => {
  return await axiosConfig
    .put(`cart/tick`, data)
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};

export const tickAllCartItem = async (data: {
  id: string;
  is_tick: boolean;
}) => {
  return await axiosConfig
    .put(`cart/tick-all`, data)
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};
