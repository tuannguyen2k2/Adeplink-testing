"use client";
import Banner from "@/component/home/Banner";
import Category from "@/component/home/category/Category";
import RecommendedProduct from "@/component/home/RecommendedProduct";
import Supplier from "@/component/home/Supplier";
import { MARGIN_BOTTOM_ON_FOOTER, MAX_WIDTH_APP } from "@/constant/css";
import { Box, Container } from "@mui/material";

export default function Home() {
  return (
    <Box mb={MARGIN_BOTTOM_ON_FOOTER}>
      <Box>
        <Container
          sx={{
            mt: "184px",
            p: { xs: "20px!important", md: "0 88px!important" },
            maxWidth: `${MAX_WIDTH_APP}!important`,
          }}
        >
          <Banner />
          <Supplier />
          <Category />
        </Container>
      </Box>
      <RecommendedProduct />
    </Box>
  );
}
