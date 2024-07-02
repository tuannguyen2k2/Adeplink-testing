"use client";
import { useGetAllProductRecommended, useGetProductDetailBySlug } from "@/api/product/query";
import { MARGIN_BOTTOM_ON_FOOTER, MAX_WIDTH_APP } from "@/constant/css";
import { PRODUCT_PATH_URL, SUPPLIER_PATH_URL } from "@/constant/pathUrl";
import { ProductDto } from "@/interface/common";
import { Box, Container, Divider, useTheme } from "@mui/material";
import { useEffect } from "react";
import ListProductComponent from "../common/show-list-product/ListProductComponent";
import DescriptionInfo from "./DescriptionInfo";
import ProductInfo from "./ProductInfo";
import SupplierInfo from "./SupplierInfo";

const ProductDetail = ({ slug }: { slug: string }) => {
  const { getProductDetailBySlug, data } = useGetProductDetailBySlug();
  const { getAllProductRecommended, data: productRecommended } = useGetAllProductRecommended();
  useEffect(() => {
    getAllProductRecommended();
  }, []);
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
        mb: MARGIN_BOTTOM_ON_FOOTER,
      }}
    >
      
      <ProductInfo
        data={data}
      />
      <SupplierInfo data={data?.supplier} />
      <DescriptionInfo data={data} />
      <Box sx={{ mt: "32px" }}>
        <Divider sx={{ borderColor: theme.blue[600], mb: "32px" }} />
        <ListProductComponent
          title={"Supplier’s Other Products"}
          url={`${SUPPLIER_PATH_URL.SUPPLIER_DETAIL}/${data?.supplier.slug}`}
          data={data?.supplier_products}
        />
      </Box>
      <Box sx={{ mt: "32px" }}>
        <Divider sx={{ borderColor: theme.blue[600], mb: "32px" }} />
        <ListProductComponent
          title={"Recommended Products"}
          url={PRODUCT_PATH_URL.PRODUCT_LIST}
          data={productRecommended}
        />
      </Box>
    </Container>
  );
};

export default ProductDetail;
