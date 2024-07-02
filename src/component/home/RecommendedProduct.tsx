"use client";
import { MAX_WIDTH_APP } from "@/constant/css";
import { Box, useTheme } from "@mui/material";

import { useGetAllProductRecommended } from "@/api/product/query";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
import { useEffect } from "react";
import ListProductComponent from "../common/show-list-product/ListProductComponent";


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
