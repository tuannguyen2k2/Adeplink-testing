import axiosConfig from "@/config/axiosConfig";

export const getAllCategoryRoot = async () => {
  return await axiosConfig
    .get("categories/root")
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};

export const getCategoriesHierarchy = async () => {
  return await axiosConfig
    .get("categories/hierarchy")
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};
