import axiosConfig from "@/config/axiosConfig";

export const getAllProduct = async () => {
  return await axiosConfig
    .get("product")
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};
