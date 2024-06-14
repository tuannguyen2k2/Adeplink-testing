"use client";
import { createTheme } from "@mui/material/styles";
import { ThemeOptions as ThemeOptionsOld } from "@mui/material/styles/createTheme";
const themeColors = {
  boxShadow: {
    100: "0 2px 2px rgba(0, 0, 0, 0.1)",
  },
  blue: {
    100: "#F0F6FF",
    200: "#C9DEFF",
    300: "#DEEAF5",
    400: "#1071FF",
    500: "#0C71BA",
    600: "#E6EFFB",
    700: "#DBE9FE",
    800: "#0C71B9",
    900: "#9FC9ED",
    1000: "#1795E0",
    1100: "#F8FBFF",
  },
  black: {
    main: "#000",
    100: "#3F4958",
    200: "#0C0C0C",
    300: "#2E3A4A",
    400: "#777777",
  },
  red: {
    100: "#FF4E00",
    200: "#d51616",
    300: "#DC2626",
  },
  yellow: {
    100: "#FFAD5F",
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
  },
  fontFamily: {
    secondary: "Montserrat, san-serif",
  },
} as const;
const themeOptions: ThemeOptionsOld = {
  ...themeColors,
  palette: {
    primary: {
      main: "#0B7ECA",
    },
    grey: {
      50: "#D9D9D9",
      100: "#EAECEE",
      200: "#F6F8FB",
      300: "#808080",
      400: "#737B7D",
      500: "#CFD2D5",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            border: 0,
          },
          "&.Mui-focused": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: 0,
            },
          },
        },
      },
    },
  },
};

type CustomTheme = {
  [Key in keyof typeof themeColors]: (typeof themeColors)[Key];
};
declare module "@mui/material/styles/createTheme" {
  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}

export const theme = createTheme({ ...themeColors, ...themeOptions });
