import { NextIntlClientProvider, useMessages } from "next-intl";

import { cookies } from "next/headers";
import AppProvider from "./AppProvider";
import "./globals.css";
import ReactQueryProvider from "./provider";
import Router from "next-nprogress-bar";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const messages = useMessages();
  return (
    <html lang={locale}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={` bg-white h-screen`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReactQueryProvider>
            <AppProvider initialSessionToken={sessionToken?.value as string}>
              {children}
            </AppProvider>
          </ReactQueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
