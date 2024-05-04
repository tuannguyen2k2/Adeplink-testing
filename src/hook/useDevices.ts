"use client";
import { useMediaQuery, useTheme } from "@mui/material";
const useDevices = () => {
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.down("lg"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return { isLaptop, isTablet, isMobile };
};

export default useDevices;
