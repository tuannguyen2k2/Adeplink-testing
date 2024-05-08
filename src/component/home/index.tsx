"use client";
import Banner from "@/component/home/Banner";
import Category from "@/component/home/category/Category";
import RecommendedProduct from "@/component/home/RecommendedProduct";
import Supplier from "@/component/home/Supplier";
import { MAX_WIDTH_APP } from "@/constant/css";
import useDevices from "@/hook/useDevices";
import { userSelector } from "@/store/selector";
import { Box, Container } from "@mui/material";
import { useSelector } from "react-redux";

export default function Home() {
  const { isMobile } = useDevices();

  return (
    <>
      <Box>
        <Container
          sx={{
            mt: "184px",
            p: isMobile ? "20px!important" : "0 88px!important",
            maxWidth: `${MAX_WIDTH_APP}!important`,
          }}
        >
          <Banner />
          <Supplier />
          <Category />
        </Container>
      </Box>
      <RecommendedProduct />
    </>
  );
}
