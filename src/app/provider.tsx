"use client";
import { queryClientConfig } from "@/lib/queryClient";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { ThemeProvider } from "next-themes";
import { useState } from "react";
import { useLocale } from "next-intl";
import {
  Box,
  Container,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material";
import { theme } from "@/utils/theme";
import { Provider as ReduxProvider } from "react-redux";
import store from "@/store";
import { ProgressProvider } from "./AppProvider";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));
  return (
    <QueryClientProvider client={queryClient}>
      <ProgressProvider>
        <ReduxProvider store={store}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MuiThemeProvider theme={theme}>
              <ThemeProvider
                attribute="class"
                enableSystem={false}
                defaultTheme="light"
              >
                <TooltipProvider>{children}</TooltipProvider>
                <ReactQueryDevtools />
              </ThemeProvider>
            </MuiThemeProvider>
          </LocalizationProvider>
        </ReduxProvider>
      </ProgressProvider>
    </QueryClientProvider>
  );
}
