import axiosConfig from "@/config/axiosConfig";
import { AddressDto, AddressFormType } from "@/interface/common";
import { SupplierDto } from "@/interface/user";

export const signUpBecomeSupplier = async (data: SupplierDto) => {
  return await axiosConfig
    .patch("user/supplier", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const saveAddress = async (data: AddressDto) => {
  return await axiosConfig
    .post("address", data)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const setDefaultAddress = async (address_id: string) => {
  return await axiosConfig
    .post(`/address/${address_id}/set_default`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const editAddress = async (data: { id: string; data: AddressDto }) => {
  return await axiosConfig
    .patch("address", { ...data.data, id: data.id })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const deleteAddress = async (address_id: string) => {
  return await axiosConfig
    .delete(`/address/${address_id}`)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getAddresses = async () => {
  return await axiosConfig
    .get("address")
    .then((response) => response.data.data)
    .catch((error) => {
      throw error;
    });
};
