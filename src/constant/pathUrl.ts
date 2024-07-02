import Cookies from "js-cookie";

const locale = Cookies.get("NEXT_LOCALE");
const protocol =
  typeof window !== "undefined" && new URL(window.location.href).protocol;
const host =
  typeof window !== "undefined" && new URL(window.location.href).host;
export const HOST_NAME = `${protocol}//${host}`;

export const HOME_PATH_URL = `/${locale}`;

export const AUTH_PATH_URL = {
  LOGIN: `/${locale}/auth/login`,
  SIGN_UP: `/${locale}/auth/signup`,
  FORGET_PASSWORD: `/${locale}/auth/forget-password`,
  CHANGE_PASSWORD: `/${locale}/auth/change-password`,
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
export const CHECKOUT_PATH_URL = `/${locale}/check-out`;
export const SEND_REQUEST_PATH_URL = `/${locale}/send-request`;
export const CHECKOUT_REVIEW_PATH_URL = `/${locale}/check-out/review`;
export const CHECKOUT_SUCCESSFULLY = `/${locale}/check-out/successfully`;
export const CHECKOUT_UNSUCCESSFULLY = `/${locale}/check-out/unsuccessfully`;
// admin
export const ADMIN_PATH_SUPPLIERS_URL = `/${locale}/admin/users/suppliers`;

export const ADMIN_PATH_SUPPLIERS_PENDING_URL = `/${locale}/admin/users/suppliers/approving-supplier`;

// my account
export const ACCOUNT_PROFILE_URL = `/${locale}/my-account/profile`;

export const ACCOUNT_SETTINGS_URL = `/${locale}/my-account/settings`;

export const ACCOUNT_ADDRESS_URL = `/${locale}/my-account/address`;

export const CREATE_ADDRESS_URL = `/${locale}/my-account/address/create`;
