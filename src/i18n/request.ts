import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { routing, LOCALE_COOKIE, isLocale } from "./routing";

export default getRequestConfig(async () => {
  const cookieLocale = (await cookies()).get(LOCALE_COOKIE)?.value;
  const locale = isLocale(cookieLocale) ? cookieLocale : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
