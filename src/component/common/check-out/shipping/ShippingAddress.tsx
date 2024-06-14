"use client";
import { userSelector } from "@/store/selector";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import CheckboxComponent from "../../CheckboxComponent";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import BillingAddressForm from "./BillingAddressForm";

export const ShippingAddress = () => {
  const theme = useTheme();
  const [checkSame, setCheckSame] = useState(false);
  const user = useSelector(userSelector);

  return (
    <Box>
      <Box
        sx={{ border: `1px solid ${theme.blue[100]}`, p: "16px" }}
        borderRadius={"16px"}
      >
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography
            fontWeight={theme.fontWeight.semiBold}
            fontFamily={theme.fontFamily.secondary}
          >
            Shipping address
          </Typography>
          <Box component={"button"} color={theme.palette.primary.main}>
            Change
          </Box>
        </Box>
        <Divider sx={{ borderColor: theme.blue[100], m: "10px 0 30px" }} />
        <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
          <Typography
            fontWeight={theme.fontWeight.medium}
            fontFamily={theme.fontFamily.secondary}
          >
            {user?.name}
          </Typography>
          <Typography fontFamily={theme.fontFamily.secondary}>
            {user?.phone}
          </Typography>
          <Typography fontFamily={theme.fontFamily.secondary}>
            202 Le Lai, Pham Ngu Lao Ward, District 1, Ho Chi Minh city, 70000,
            Vietnam
          </Typography>
        </Box>
      </Box>
      <Box display={"flex"} gap={"10px"} alignItems={"center"} my={"20px"}>
        <CheckboxComponent
          id={"Check same"}
          checked={checkSame}
          handleOnCheck={(e: ChangeEvent<HTMLInputElement>) =>
            setCheckSame(!checkSame)
          }
        />
        <Typography fontFamily={theme.fontFamily.secondary}>
          My billing and delivery information are the same.
        </Typography>
      </Box>
      <BillingAddressForm />
    </Box>
  );
};

export default ShippingAddress;
