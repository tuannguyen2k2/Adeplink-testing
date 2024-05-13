import axiosConfig from "@/config/axiosConfig";

export const getAllBanner = async () => {
  return await axiosConfig
    .get("banner")
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};
