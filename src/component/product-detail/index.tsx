"use client";
import { MAX_WIDTH_APP } from "@/constant/css";
import { Box, Container, Divider, useTheme } from "@mui/material";
import Cart from "./Cart";
import ProductInfo from "./ProductInfo";
import SupplierInfo from "./SupplierInfo";
import DescriptionInfo from "./DescriptionInfo";
import ListProductComponent from "../common/show-list-product/ListProductComponent";
import { ProductDto } from "@/interface/common";
import { useEffect } from "react";
import { useGetProductDetailBySlug } from "@/api/product/query";

const ProductDetail = ({ slug }: { slug: string }) => {
  const { getProductDetailBySlug, data } = useGetProductDetailBySlug();
  useEffect(() => {
    getProductDetailBySlug(slug);
  }, [slug]);

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
      <ProductInfo data={data} />
      <SupplierInfo data={data?.supplier} />
      <DescriptionInfo data={data} />
      <Box sx={{ mt: 2 }}>
        <Divider sx={{ borderColor: theme.blue[600], mb: 3 }} />
        <ListProductComponent
          title={"Supplier’s Other Products"}
          url={"#"}
          data={data?.supplier_products}
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Divider sx={{ borderColor: theme.blue[600], mb: 3 }} />
        <ListProductComponent
          title={"Recommended Products"}
          url={"#"}
          data={data?.recommend_products as ProductDto[]}
        />
      </Box>
    </Container>
  );
};

export default ProductDetail;
