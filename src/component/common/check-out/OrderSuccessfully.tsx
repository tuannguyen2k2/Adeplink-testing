"use client";
import { Box, Button, Container, Divider, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import OrderSuccessfullyImage from "@/assets/images/order_successful.png";
import ListProductComponent from "../show-list-product/ListProductComponent";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
import { ProductDto } from "@/interface/common";
import { useGetAllProductRecommended } from "@/api/product/query";
import { useEffect } from "react";
import { MARGIN_BOTTOM_ON_FOOTER, MAX_WIDTH_APP } from "@/constant/css";
const OrderSuccessfully = () => {
  const theme = useTheme();
  const { getAllProductRecommended, data } = useGetAllProductRecommended();
  useEffect(() => {
    getAllProductRecommended();
  }, []);
  return (
    <Container
      sx={{
        mt: "184px",
        p: { xs: "20px!important", md: "0 88px!important" },
        maxWidth: `${MAX_WIDTH_APP}!important`,
        mb: MARGIN_BOTTOM_ON_FOOTER,
      }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        gap={"30px"}
      >
        <Typography
          fontWeight={theme.fontWeight.bold}
          fontSize={24}
          fontFamily={theme.fontFamily.secondary}
        >
          Order Successfully
        </Typography>
        <Image src={OrderSuccessfullyImage} alt="order-successfully" />
        <Typography
          fontWeight={theme.fontWeight.bold}
          fontSize={20}
          fontFamily={theme.fontFamily.secondary}
        >
          Thank you for your order!
        </Typography>
        <Typography fontSize={16} fontFamily={theme.fontFamily.secondary}>
          Your order has been received! Your suppliers will start preparing your
          order and get it on its way to you.
        </Typography>
        <Button
          sx={{
            bgcolor: `${theme.palette.primary.main}!important`,
            color: "white",
            fontFamily: theme.fontFamily.secondary,
            fontSize: 14,
            p: "12px 16px",
            borderRadius: "8px",
          }}
        >
          View your orders
        </Button>
        <Typography fontSize={16} fontFamily={theme.fontFamily.secondary}>
          While you wait, browse our range of products to find additional
          options that can enhance your business operations.
        </Typography>
      </Box>
      <Divider sx={{ borderColor: theme.blue[100], my: "32px" }} />
      <ListProductComponent
        title={"Recommended Products"}
        url={PRODUCT_PATH_URL.PRODUCT_LIST}
        data={data}
      />
    </Container>
  );
};

export default OrderSuccessfully;
