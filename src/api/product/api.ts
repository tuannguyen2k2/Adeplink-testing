import axiosConfig from "@/config/axiosConfig";
import { FilterProductDto } from "@/interface/common";
import { FilterSearchType } from "antd/es/table/interface";

export const getAllProductRecommended = async () => {
  return await axiosConfig
    .get("product/recommended")
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};

export const getProductSearch = async (data: FilterProductDto) => {
  if (data.keyword == "") {
    return;
  }
  const params = new URLSearchParams();
  if (data.category_ids) {
    data.category_ids.forEach((categoryId) => {
      params.append("category_ids", categoryId);
    });
  }
  if (data.countries) {
    data.countries.forEach((country) => {
      params.append("countries", country);
    });
  }
  data.keyword && params.append("keyword", data.keyword);
  data.from_price && params.append("from_price", data.from_price);
  data.to_price && params.append("to_price", data.to_price);
  data.moq && params.append("moq", data.moq);
  data.limit && params.append("limit", data.limit);
  data.page && params.append("page", data.page);
  return await axiosConfig
    .get("product/search", { params: params })
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};

export const getProductDetailBySlug = async (slug: string) => {
  return await axiosConfig
    .get(`product/${slug}`)
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};

export const getProductByCategory = async (data: FilterProductDto) => {
  const params = new URLSearchParams();
  data.product_category_id &&
    params.append("product_category_id", data.product_category_id);
  if (data.category_ids) {
    data.category_ids.forEach((categoryId) => {
      params.append("category_ids", categoryId);
    });
  }
  if (data.countries) {
    data.countries.forEach((country) => {
      params.append("countries", country);
    });
  }
  data.keyword && params.append("keyword", data.keyword);
  data.from_price && params.append("from_price", data.from_price);
  data.to_price && params.append("to_price", data.to_price);
  data.moq && params.append("moq", data.moq);
  data.limit && params.append("limit", data.limit);
  data.page && params.append("page", data.page);
  return await axiosConfig
    .get("category/product", { params: params })
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};

export const getRatingByProductId = async (
  productId: string,
  vote_score?: number
) => {
  const params = new URLSearchParams();
  vote_score && params.append("vote_score", String(vote_score));
  return await axiosConfig
    .get(`/vote?product_id=${productId}`, { params: params })
    .then((response) => response.data.data)
    .catch((error) => {
      throw Error(error);
    });
};

export const getVariantChoose = async (data: {
  product_id: string;
  choices: string[];
  moq: number;
}) => {
  return await axiosConfig
    .post(`/product/variant/choose`, data)
    .then((response) => response.data.data)
    .catch((error) => {
      throw Error(error);
    });
};
