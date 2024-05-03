"use client";
import { createTheme } from "@mui/material/styles";
import { ThemeOptions as ThemeOptionsOld } from "@mui/material/styles/createTheme";
const themeColors = {
  blue: {
    100: "#F0F6FF",
    200: "#C9DEFF",
    300: "#DEEAF5",
    400: "#1071FF",
    500: "#0C71BA",
    600: "#E6EFFB",
    700: "#DBE9FE",
    800: "#0C71B9",
  },
  black: {
    main: "#000",
    100: "#3F4958",
    200: "#0C0C0C",
    300: "#2E3A4A",
  },
  red: {
    100: "#FF4E00",
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
      100: "#EAECEE",
      200: "#F6F8FB",
      300: "#808080",
      400: "#737B7D",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
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
