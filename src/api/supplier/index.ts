import axiosConfig from "@/config/axiosConfig";
import { SortOption } from "@/constant/enum";
import {
  FilterSupplierDto,
  IResponse,
  Metadata,
  PaginationDto,
  RatingFilter,
  SupplierDto,
} from "@/interface/common";

type GetSearchSupplierType = {
  companies: SupplierDto[];
  categories: Object;
  countries: string[];
  metadata: Metadata;
};



export const getSearchSupplier = async (
  filter: FilterSupplierDto,
  sortOrder: string,
  pagination: PaginationDto
): Promise<IResponse<GetSearchSupplierType>> => {
  return await axiosConfig
    .post(
      `/company/suppliers/search?page=${pagination.page}&limit=${pagination.limit}`,
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
        is_newest: sortOrder === SortOption.Newest,
        is_sorted: false,
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error);
    });
};

export const getSupplierReview = async (
  slug: string,
  filter: PaginationDto & RatingFilter
) => {
  const params = new URLSearchParams();
  filter.star && params.append("star", String(filter.star));
  filter.with_media === true
    ? params.append("with_media", "true")
    : params.append("with_media", "false");
  filter.page && params.append("page", String(filter.page));
  filter.limit && params.append("limit", String(filter.limit));
  return await axiosConfig
    .get(`/company/${slug}/reviews`, { params: params })
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error);
    });
};
