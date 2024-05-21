"use client";
import { MAX_WIDTH_APP } from "@/constant/css";
import { Container, useTheme } from "@mui/material";
import Cart from "./Cart";
import ProductInfo from "./ProductInfo";
import OtherInfo from "./OtherInfo";

const ProductDetail = () => {
  const theme = useTheme();
  return (
    <Container
      sx={{
        mt: "184px",
        p: { xs: "20px!important", sm: "0 88px!important" },
        maxWidth: `${MAX_WIDTH_APP}!important`,
        fontFamily: theme.fontFamily.secondary,
      }}
    >
      <Cart />
      <ProductInfo />
      <OtherInfo />
    </Container>
  );
};

export default ProductDetail;
