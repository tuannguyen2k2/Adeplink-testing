import { CategoryDto, StateType } from "@/interface/common";
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
  country: string;
  confirm?: string;
  isCheck: boolean;
};

export type SignUpSupplierForm = {
  category: CategoryDto;
  country: string;
  state: string;
  city: string;
  yearEstablished: string;
  numberOfEmployees: string;
};
