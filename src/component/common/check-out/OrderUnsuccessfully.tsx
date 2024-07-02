/* eslint-disable react/no-unescaped-entities */
"use client";
import {
  Box,
  Button,
  Container,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import OrderUnsuccessfullyImage from "@/assets/images/order-unsuccessfully.png";
import ListProductComponent from "../show-list-product/ListProductComponent";
import { CHECKOUT_PATH_URL, PRODUCT_PATH_URL } from "@/constant/pathUrl";
import { ProductDto } from "@/interface/common";
import { useGetAllProductRecommended } from "@/api/product/query";
import { useEffect } from "react";
import { MARGIN_BOTTOM_ON_FOOTER, MAX_WIDTH_APP } from "@/constant/css";
import { useRouter } from "next-nprogress-bar";
const OrderUnsuccessfully = () => {
  const theme = useTheme();
  const { getAllProductRecommended, data } = useGetAllProductRecommended();
  useEffect(() => {
    getAllProductRecommended();
  }, []);
  const router = useRouter();
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
          Order Unsuccessfully
        </Typography>
        <Image src={OrderUnsuccessfullyImage} alt="order-unsuccessfully" />
        <Typography
          fontWeight={theme.fontWeight.bold}
          fontSize={20}
          fontFamily={theme.fontFamily.secondary}
        >
          We 're sorry
        </Typography>
        <Typography fontSize={16} fontFamily={theme.fontFamily.secondary}>
          Your payment did not go through. Please review your payment details
          and try again.
        </Typography>
        <Button
          sx={{
            bgcolor: `${theme.palette.primary.main}!important`,
            color: "white",
            fontFamily: theme.fontFamily.secondary,
            fontSize: 14,
            p: "12px 16px",
            borderRadius: "8px",
            width: 183,
          }}
          onClick={() => router.push(CHECKOUT_PATH_URL)}
        >
          Retry
        </Button>
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

export default OrderUnsuccessfully;
