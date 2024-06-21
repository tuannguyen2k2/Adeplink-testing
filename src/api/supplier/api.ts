import axiosConfig from "@/config/axiosConfig";
import { SortOption } from "@/constant/enum";
import { FilterSupplierDto, PaginationDto } from "@/interface/common";

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

export const getSearchSupplier = async (filter: FilterSupplierDto) => {
  return await axiosConfig
    .post(
      `/company/suppliers/search?page=${filter.page}&limit=${filter.limit}`,
      {
        keyword: filter.keyword === "" ? undefined : filter.keyword,
        countries:
          filter.countries && filter.countries.length === 0
            ? undefined
            : filter.countries,
        category_ids:
          filter.category_ids && filter.category_ids.length === 0
            ? undefined
            : filter.category_ids,
        is_newest: filter.is_newest,
        is_sorted: filter.is_sorted,
      }
    )
    .then((response) => response.data.data)
    .catch((error) => {
      throw Error(error);
    });
};
