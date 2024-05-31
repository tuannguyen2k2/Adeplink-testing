import axiosConfig from "@/config/axiosConfig";

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

export const deleteCart = async (data: {
  product_id?: string;
  variant_id?: string;
}) => {
  if(!data){
    return;
  }
  return await axiosConfig
    .delete("cart")
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};
