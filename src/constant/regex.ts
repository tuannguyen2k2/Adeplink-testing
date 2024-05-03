export const checkEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
export const checkUpper = new RegExp(/(?=.*[A-Z])/);
export const checkNumber = new RegExp(/(?=.*[0-9])/);
export const CheckSpecial = new RegExp(/[^A-Za-z0-9]/);
// export const CheckSpecial = new RegExp(/(?=.*[!@#$%^&*+-<>=])/);
export const checkLength = new RegExp(/^(?=.{8,32}$)/);