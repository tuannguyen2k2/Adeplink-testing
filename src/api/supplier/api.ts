import axiosConfig from "@/config/axiosConfig";

export const getSupplierDetailBySlug = async (slug: string) => {
  return await axiosConfig
    .get(`/company/${slug}`)
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error);
    });
};
