import axiosConfig from "@/config/axiosConfig";

export const getAllCategoryRoot = async () => {
  return await axiosConfig
    .get("category/root")
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};

export const getCategoriesHierarchy = async () => {
  return await axiosConfig
    .get("category/hierarchy")
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};


export const getCategoriesChildren = async (id: string) => {
  return await axiosConfig
    .get(`category/${id}/children`)
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};
