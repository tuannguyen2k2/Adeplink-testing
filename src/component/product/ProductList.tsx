"use client";
import Product2 from "@/assets/images/product2.jpg";
import { ProductSearchDto } from "@/interface/common";
import { Box, Grid, Pagination, Typography, useTheme } from "@mui/material";
import Image from "next/image";

type ProductListType = {
  data?: ProductSearchDto[];
};

const ProductList = ({ data }: ProductListType) => {
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
              <Image src={Product2} alt="product" width={268} height={268} />
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
                <Typography
                  color={theme.black[200]}
                  fontWeight={theme.fontWeight.semiBold}
                  fontFamily={theme.fontFamily.secondary}
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2,
                    overflow: "hidden",
                    mb: 1,
                  }}
                >
                  {product.name}
                </Typography>
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
      <Pagination
        count={10}
        color="primary"
        shape="rounded"
        sx={{ justifyContent: "center", mt: "20px" }}
      />
    </Box>
  );
};

type PriceType = {
  price: {
    total_range_price: number;
    min_price: number;
    max_price: number;
  };
};

const Price = ({ price }: PriceType) => {
  const theme = useTheme();
  if (price.total_range_price == 0) {
    return (
      <Typography
        fontSize={14}
        color={theme.blue[500]}
        fontWeight={theme.fontWeight.regular}
        fontFamily={theme.fontFamily.secondary}
      >
        Contact for best prices
      </Typography>
    );
  } else if (price.total_range_price == 1) {
    return (
      <Box display={"flex"} gap={0.5}>
        <Typography
          fontSize={14}
          color={theme.blue[500]}
          fontWeight={theme.fontWeight.regular}
          fontFamily={theme.fontFamily.secondary}
        >
          Starting at
        </Typography>
        <Typography
          fontSize={14}
          color={theme.blue[500]}
          fontWeight={theme.fontWeight.medium}
          fontFamily={theme.fontFamily.secondary}
        >
          ${price.min_price}.00
        </Typography>
      </Box>
    );
  } else if (price.total_range_price >= 2) {
    return (
      <Box display={"flex"} gap={0.5}>
        <Typography
          fontSize={14}
          color={theme.blue[500]}
          fontWeight={theme.fontWeight.regular}
          fontFamily={theme.fontFamily.secondary}
        >
          From
        </Typography>
        <Typography
          fontSize={14}
          color={theme.blue[500]}
          fontWeight={theme.fontWeight.medium}
          fontFamily={theme.fontFamily.secondary}
        >
          ${price.min_price}.00
        </Typography>
        <Typography
          fontSize={14}
          color={theme.blue[500]}
          fontWeight={theme.fontWeight.regular}
          fontFamily={theme.fontFamily.secondary}
        >
          to
        </Typography>
        <Typography
          fontSize={14}
          color={theme.blue[500]}
          fontWeight={theme.fontWeight.medium}
          fontFamily={theme.fontFamily.secondary}
        >
          ${price.max_price}.00
        </Typography>
      </Box>
    );
  }
};

export default ProductList;
