import axiosConfig from "@/config/axiosConfig";
import { PaginationDto } from "@/interface/common";

export const getSupplierDetailBySlug = async (slug: string) => {
  return await axiosConfig
    .get(`/company/${slug}`)
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error);
    });
};

export const getRecommendSupplier = async (limit: number) => {
  return await axiosConfig
    .get(`/company/suppliers?limit=${limit}`)
    .then((response) => response.data.data)
    .catch((error) => {
      throw Error(error);
    });
};