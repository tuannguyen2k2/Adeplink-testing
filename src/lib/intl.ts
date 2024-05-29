import { notFound } from "next-nprogress-bar";
import { getRequestConfig } from "next-intl/server";

const locales = ["en", "vn"];

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
