import { ProductDto } from "@/interface/common";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import React from "react";
import { Price } from "./Price";
import { convertImage } from "@/utils";
import NoImage from "@/assets/images/no-image.png";
import { useRouter } from "next-nprogress-bar";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
const ProductItemComponent = ({ product }: { product: ProductDto }) => {
  const router = useRouter();
  const theme = useTheme();
  return (
    <Box
      sx={{
        width: 242,
        p: "16px",
        backgroundColor: "white",
        borderRadius: "16px",
        border: `1px solid ${theme.blue[100]}`,
      }}
    >
      <Box width={210} height={210} position={"relative"}>
        <Image
          src={convertImage(product.image[0]?.image_url) || NoImage}
          alt={"image"}
          fill
          objectFit="fill"
          className="rounded-lg"
        />
      </Box>
      <Box height={70} sx={{ mb: 2 }}>
        <Typography
          sx={{
            fontFamily: theme.fontFamily.secondary,
            fontSize: 14,
            color: theme.palette.primary.main,
            mt: 2,
          }}
        >
          {product.category}
        </Typography>
        <Box
          component={"button"}
          width={"100%"}
          onClick={() =>
            router.push(`${PRODUCT_PATH_URL.PRODUCT_DETAIL}/${product.slug}`)
          }
        >
          <Typography
            sx={{
              fontFamily: theme.fontFamily.secondary,
              fontSize: 16,
              fontWeight: theme.fontWeight.semiBold,
              textAlign: "start",
              mt: 1,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
          >
            {product.name}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ borderColor: theme.blue[600] }} />
      <Price price={product.price} />
      <Box
        sx={{
          fontFamily: theme.fontFamily.secondary,
          color: theme.palette.grey[400],
          display: "flex",
        }}
      >
        <Typography
          sx={{
            fontFamily: theme.fontFamily.secondary,
            fontWeight: theme.fontWeight.regular,
          }}
        >
          MOQ:&nbsp;
        </Typography>
        <Typography
          sx={{
            fontFamily: theme.fontFamily.secondary,
            fontWeight: theme.fontWeight.medium,
          }}
        >
          {product.min_order}
        </Typography>
      </Box>
    </Box>
  );
};

export default ProductItemComponent;
