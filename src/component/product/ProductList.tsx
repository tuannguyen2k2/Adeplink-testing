"use client";
import Product2 from "@/assets/images/product2.jpg";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
import { ProductSearchDto } from "@/interface/common";
import { convertImage } from "@/utils";
import {
  Box,
  Divider,
  Fade,
  Grid,
  Pagination,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next-nprogress-bar";
import { Price } from "../common/show-list-product/Price";
import NoImage from "@/assets/images/no-image.png";
import { DataArray } from "@mui/icons-material";
import { useEffect, useState } from "react";
type ProductListType = {
  data?: ProductSearchDto[];
};

const ProductList = ({ data }: ProductListType) => {
  const router = useRouter();
  const theme = useTheme();
  if (data && data.length == 0) {
    return;
  }

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
            sm={12}
            md={6}
            lg={4}
            xl={4}
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingLeft: "0!important",
              paddingTop: {
                xl: index > 2 ? "20px!important" : "0!important",
                lg: index > 2 ? "20px!important" : "0!important",
                md: index > 1 ? "20px!important" : "0!important",
                sm: index > 0 ? "20px!important" : "0!important",
              },
            }}
          >
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;

const ProductItem = ({ product }: { product: ProductSearchDto }) => {
  const theme = useTheme();
  const router = useRouter();

  const [image, setImage] = useState<string>();

  useEffect(() => {
    if (product.image[0]?.image_url) {
      setImage(product.image[0]?.image_url);
    }
  }, [product]);

  const handleMouseEnter = () => {
    if (product.image[1]?.image_url) {
      setImage(product.image[1]?.image_url);
    }
  };

  const handleMouseLeave = () => {
    if (product.image[0]?.image_url && image !== product.image[0]?.image_url) {
      setImage(product.image[0]?.image_url);
    }
  };
  return (
    <Box
      component={"button"}
      width={"300px"}
      height={"100%"}
      display={"flex"}
      flexDirection={"column"}
      bgcolor={"common.white"}
      p={"16px"}
      borderRadius={"16px"}
      textAlign={"start"}
      border={`1px solid ${theme.blue[100]}`}
      sx={{
        "&:hover": {
          border: `1px solid ${theme.palette.primary.main}`,
        },
      }}
      onClick={() =>
        router.push(`${PRODUCT_PATH_URL.PRODUCT_DETAIL}/${product.slug}`)
      }
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      position={"relative"}
    >
      <Box width={268} height={268}>
        <Fade
          in={image !== undefined && image == product.image[1]?.image_url}
          timeout={500}
        >
          <Box width={268} height={268} position={"absolute"}>
            <Image
              src={convertImage(product.image[1]?.image_url) || NoImage}
              alt="product"
              width={268}
              height={268}
              style={{ borderRadius: "8px", height: "100%" }}
            />
          </Box>
        </Fade>
        <Fade
          in={image !== undefined && image == product.image[0]?.image_url}
          timeout={500}
        >
          <Box width={268} height={268} position={"absolute"}>
            <Image
              src={convertImage(product.image[0]?.image_url) || NoImage}
              alt="product"
              width={268}
              height={268}
              style={{ borderRadius: "8px", height: "100%" }}
            />
          </Box>
        </Fade>
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
        <Box component={"button"}>
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
              height: "50px",
            }}
          >
            {product.name}
          </Typography>
        </Box>
        <Box height={"1px"} width={1} bgcolor={theme.blue[600]} mb={1} />
        <Price price={product.price} />
        <Box display={"flex"} gap={0.5} color={theme.palette.grey[400]}>
          <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
            MOQ
          </Typography>
          <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
            {product.min_order}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
