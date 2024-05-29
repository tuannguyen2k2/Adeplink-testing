"use client";
import { Box, Divider, Grid, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { MdArrowForwardIos } from "react-icons/md";
import Product2 from "@/assets/images/product2.jpg";
import { MAX_WIDTH_APP } from "@/constant/css";

import useDevices from "@/hook/useDevices";
import Cookies from "js-cookie";
import { useRouter } from "next-nprogress-bar";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
import ListProductComponent from "../common/show-list-product/ListProductComponent";
import { ProductDto } from "@/interface/common";
import { useGetAllProductRecommended } from "@/api/product/query";
import { useEffect } from "react";


const RecommendedProduct = () => {
  const theme = useTheme();
  const { getAllProductRecommended, data } = useGetAllProductRecommended();
  useEffect(() => {
    getAllProductRecommended();
  }, []);
  return (
    <Box
      bgcolor={theme.blue[100]}
      display={"flex"}
      justifyContent={"center"}
      mt={"100px"}
    >
      <Box
        px={"88px"}
        py={"24px"}
        p={{ xs: "0 20px 20px", sm: "24px 88px" }}
        maxWidth={MAX_WIDTH_APP}
        width={"100%"}
      >
        <ListProductComponent
          title={"Recommended Products"}
          url={PRODUCT_PATH_URL.PRODUCT_LIST}
          data={data}
        />
      </Box>
    </Box>
  );
};

export default RecommendedProduct;
