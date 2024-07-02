"use client";
import { CHECKOUT_PATH_URL, HOME_PATH_URL } from "@/constant/pathUrl";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { useRouter } from "next-nprogress-bar";

type OrderSummaryType = {
  totalItems: number;
  hasCheckOut: boolean;
  isAllSupplierSent: boolean;
};

const OrderSummary = ({
  totalItems,
  hasCheckOut,
  isAllSupplierSent,
}: OrderSummaryType) => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Box
      width={"32%"}
      p={"16px"}
      borderRadius={"8px"}
      border={`1px solid ${theme.blue[100]}`}
      boxShadow={`0px 4px 20px 2px rgba(0, 0, 0, 0.1)`}
      height={"fit-content"}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography
          fontFamily={theme.fontFamily.secondary}
          color={theme.black[200]}
          fontWeight={theme.fontWeight.semiBold}
          fontSize={20}
        >
          Order summary
        </Typography>
        <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
          Total: {totalItems} items
        </Typography>
      </Box>
      <Divider sx={{ borderColor: theme.blue[600], mt: "10px", mb: "20px" }} />
      {hasCheckOut && !isAllSupplierSent && (
        <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
          Please complete your quote requests to proceed to the checkout page.
        </Typography>
      )}
      {isAllSupplierSent && (
        <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
          Your RFQs have been successfully sent to all the selected suppliers.
        </Typography>
      )}
      {!hasCheckOut && !isAllSupplierSent && (
        <Typography
          fontFamily={theme.fontFamily.secondary}
          fontSize={14}
          mb={"60px"}
        >
          Please complete your quote requests.
        </Typography>
      )}
      {hasCheckOut && isAllSupplierSent && (
        <Button
          fullWidth
          onClick={() => router.push(CHECKOUT_PATH_URL)}
          sx={{
            p: "12px 16px",
            bgcolor: `${theme.palette.primary.main}!important`,
            color: "white",
            borderRadius: "8px",
            mt: "24px",
            fontFamily: theme.fontFamily.secondary,
          }}
        >
          Continue
        </Button>
      )}
      {!hasCheckOut && isAllSupplierSent && (
        <Button
          fullWidth
          onClick={() => router.push(HOME_PATH_URL)}
          sx={{
            p: "12px 16px",
            bgcolor: `${theme.palette.primary.main}!important`,
            color: "white",
            borderRadius: "8px",
            mt: "24px",
            fontFamily: theme.fontFamily.secondary,
          }}
        >
          Back to Homepage
        </Button>
      )}
      {hasCheckOut && !isAllSupplierSent && (
        <Box
          fontFamily={theme.fontFamily.secondary}
          fontSize={14}
          textAlign={"center"}
          my={"20px"}
        >
          or
          <Typography
            component={"strong"}
            fontFamily={theme.fontFamily.secondary}
            fontSize={14}
            color={theme.palette.primary.main}
            fontWeight={theme.fontWeight.medium}
            onClick={() => router.push(CHECKOUT_PATH_URL)}
            sx={{ cursor: "pointer" }}
          >
            &nbsp;Skip to Checkout&nbsp;
          </Typography>
          now
        </Box>
      )}
    </Box>
  );
};

export default OrderSummary;
