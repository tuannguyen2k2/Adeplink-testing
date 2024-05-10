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
};

export type SignUpSupplierForm = {
  category: string;
  country: string;
  state: string;
  city: string;
  yearEstablished: number;
  numberOfEmployees: number;
};
