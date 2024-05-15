import axiosConfig from "@/config/axiosConfig";
import { FilterProductDto } from "@/interface/common";
import { FilterSearchType } from "antd/es/table/interface";

export const getAllProduct = async () => {
  return await axiosConfig
    .get("product")
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};

export const getProductSearch = async (data: FilterProductDto) => {
  console.log(data);
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
  return await axiosConfig
    .get("product/search", { params: params })
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};
