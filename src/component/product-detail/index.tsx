"use client";
import { useGetProductDetailBySlug } from "@/api/product/query";
import { MAX_WIDTH_APP } from "@/constant/css";
import { ProductDto, TemporaryCartType } from "@/interface/common";
import { Box, Container, Divider, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import ListProductComponent from "../common/show-list-product/ListProductComponent";
import DescriptionInfo from "./DescriptionInfo";
import ProductInfo from "./ProductInfo";
import SupplierInfo from "./SupplierInfo";
import TemporaryCart from "./TemporaryCart";

const ProductDetail = ({ slug }: { slug: string }) => {
  const { getProductDetailBySlug, data } = useGetProductDetailBySlug();
  const [temporaryCart, setTemporaryCart] = useState<TemporaryCartType[]>([]);
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
      <TemporaryCart
        temporaryCart={temporaryCart}
        setTemporaryCart={setTemporaryCart}
        data={data}
      />
      <ProductInfo
        data={data}
        temporaryCart={temporaryCart}
        setTemporaryCart={setTemporaryCart}
      />
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
