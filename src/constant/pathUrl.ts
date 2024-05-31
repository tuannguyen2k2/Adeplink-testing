import Cookies from "js-cookie";

const locale = Cookies.get("NEXT_LOCALE");

export const HOME_PATH_URL = `/${locale}`;

export const AUTH_PATH_URL = {
  LOGIN: `/${locale}/auth/login`,
  SIGN_UP: `/${locale}/auth/signup`,
  FORGET_PASSWORD: `/${locale}/auth/forget-password`,
  CHANGE_PASSWORD: `/${locale}/auth/change-password`
};

export const PRODUCT_PATH_URL = {
  PRODUCT_LIST: `/${locale}/product`,
  PRODUCT_DETAIL: `/${locale}/product/product-detail`,
};

export const SUPPLIER_PATH_URL = {
  SUPPLIER_LIST: `/${locale}/supplier`,
  SUPPLIER_DETAIL: `/${locale}/supplier/supplier-detail`,
};

export const CART_PATH_URL = `/${locale}/cart`;