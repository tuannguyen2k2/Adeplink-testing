import axiosConfig from "@/config/axiosConfig";
import { IResponse, IResponseWithMetadata, Metadata, PaginationDto, SupplierDto } from "@/interface/common";

type GetSupplierType = {
  companies: SupplierDto[]
  categories: any
  countries: any
  metadata: Metadata
}

export const getAllSupplier = async (pagination: PaginationDto): Promise<IResponse<GetSupplierType>> => {
  return await axiosConfig
    .post(`/company/suppliers/?page=${pagination.page}&limit=${pagination.limit}`, {})
    .then((response) => response.data)
    .catch((error) => {
      throw Error(error);
    });
};
