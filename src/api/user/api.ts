import axiosConfig from "@/config/axiosConfig";
import {
  SupplierDto
} from "@/interface/user";

export const signUpBecomeSupplier = async (data: SupplierDto) => {
  return await axiosConfig
    .patch("user/supplier", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
