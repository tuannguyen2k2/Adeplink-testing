import { CategoryDto } from "@/interface/common";
import { ICountry, IState, ICity } from "country-state-city";
export type LoginForm = {
  username: string;
  password: string;
  isRemember: boolean;
};

export type ChangePasswordForm = {
  password: string;
  confirmPassword: string;
};

export type SignUpBuyerForm = {
  email: string;
  password: string;
  fullname: string;
  companyName: string;
  phoneNumber: string;
  country: ICountry;
  confirm?: string;
};

export type SignUpSupplierForm = {
  category: CategoryDto;
  country: ICountry;
  state: IState;
  city: ICity;
  yearEstablished: string;
  numberOfEmployees: string;
};
