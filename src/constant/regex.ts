export const checkEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
export const checkUpper = new RegExp(/(?=.*[A-Z])/);
export const checkNumber = new RegExp(/(?=.*[0-9])/);
export const CheckSpecial = new RegExp(/[^A-Za-z0-9]/);
export const checkSpecialChar1 = /^[a-zA-Z\u00C0-\u1EF9\s]+$/;
export const checkSpecialChar2 = /^[a-zA-Z0-9\s\u00C0-\u1EF9]+$/;
export const checkLength = new RegExp(/^(?=.{8,32}$)/);
export const freeEmailDomains =
  /^((?!@(gmail|outlook|yahoo|protonmail|zoho|aol|mail|gmx|yandex|icloud|tutanota|fastmail|hushmail|lycos|inbox|rediffmail|mailfence)\.com).)*$/;
