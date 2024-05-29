"use client";
import Product2 from "@/assets/images/product2.jpg";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
import { ProductSearchDto } from "@/interface/common";
import { convertImage } from "@/utils";
import { Box, Grid, Pagination, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next-nprogress-bar";
import { Price } from "../common/show-list-product/Price";

type ProductListType = {
  data?: ProductSearchDto[];
};

const ProductList = ({ data }: ProductListType) => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
      width={"100%"}
    >
      <Grid container spacing={10} width={"100%"} marginLeft={0} mt={0}>
        {data?.map((product: ProductSearchDto, index: number) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            key={product?.id}
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingLeft: "0!important",
              paddingTop: index > 2 ? "20px!important" : "0!important",
            }}
          >
            <Box
              width={"300px"}
              height={"100%"}
              display={"flex"}
              flexDirection={"column"}
              bgcolor={"common.white"}
              p={"16px"}
              borderRadius={"10px"}
              border={`1px solid ${theme.blue[100]}`}
            >
              <Box width={268} height={268}>
                <Image
                  src={
                    convertImage(product?.image[0]?.image_url) ||
                    "https://th.bing.com/th/id/OIP.Zfeg2aQarGBA5op6udDRXAHaEc?w=1000&h=600&rs=1&pid=ImgDetMain"
                  }
                  alt="product"
                  width={268}
                  height={268}
                  style={{ borderRadius: "8px", height: "100%" }}
                />
              </Box>
              <Box>
                <Typography
                  color={theme.blue[500]}
                  fontSize={14}
                  mt={2}
                  mb={1}
                  fontWeight={theme.fontWeight.regular}
                  fontFamily={theme.fontFamily.secondary}
                >
                  {product.category}
                </Typography>
                <Box
                  component={"button"}
                  onClick={() =>
                    router.push(
                      `${PRODUCT_PATH_URL.PRODUCT_DETAIL}/${product.slug}`
                    )
                  }
                >
                  <Typography
                    color={theme.black[200]}
                    fontWeight={theme.fontWeight.semiBold}
                    fontFamily={theme.fontFamily.secondary}
                    textAlign={"start"}
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      mb: 1,
                      cursor: "pointer",
                    }}
                  >
                    {product.name}
                  </Typography>
                </Box>
                <Box
                  height={"1px"}
                  width={1}
                  bgcolor={theme.blue[600]}
                  mt={2}
                  mb={1}
                />
                <Price price={product.price} />
                <Box display={"flex"} gap={0.5} color={theme.palette.grey[400]}>
                  <Typography fontFamily={theme.fontFamily.secondary}>
                    MOQ
                  </Typography>
                  <Typography fontFamily={theme.fontFamily.secondary}>
                    {product.min_order}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
