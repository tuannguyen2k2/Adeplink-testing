import { ProductDto } from "@/interface/common";
import { Box, Divider, Grid, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import React from "react";

const ProductItemComponent = ({ product }: { product: ProductDto }) => {
  const theme = useTheme();
  return (
    <Box sx={{ p: "16px", backgroundColor: 'white', borderRadius: '16px' }}>
      <Box width={210} height={210} position={"relative"}>
        <Image src={"https://th.bing.com/th/id/OIP.Zfeg2aQarGBA5op6udDRXAHaEc?w=1000&h=600&rs=1&pid=ImgDetMain"} alt={""} fill objectFit="fill" className="rounded-lg" />
      </Box>
      <Box height={70} sx={{ mb: 2 }}>
        <Typography sx={{ fontFamily: theme.fontFamily.secondary, fontSize: 14, color: theme.palette.primary.main, mt: 2 }}>Category</Typography>
        <Typography
          sx={{
            fontFamily: theme.fontFamily.secondary,
            fontSize: 16,
            fontWeight: theme.fontWeight.semiBold,
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
      <Divider sx={{ borderColor: theme.blue[600] }} />
      <Box sx={{display: 'flex'}}>
      <Typography sx={{ fontFamily: theme.fontFamily.secondary, fontWeight: theme.fontWeight.regular, color: theme.blue[500] }}>From&nbsp;</Typography>
      <Typography sx={{ fontFamily: theme.fontFamily.secondary, fontWeight: theme.fontWeight.medium, color: theme.blue[500] }}>$45.00&nbsp;</Typography>
      <Typography sx={{ fontFamily: theme.fontFamily.secondary, fontWeight: theme.fontWeight.regular, color: theme.blue[500] }}>to&nbsp;</Typography>
      <Typography sx={{ fontFamily: theme.fontFamily.secondary, fontWeight: theme.fontWeight.medium, color: theme.blue[500] }}>$100.00</Typography>
      </Box>
      <Box sx={{ fontFamily: theme.fontFamily.secondary, color: theme.palette.grey[400], display: "flex" }}>
        <Typography sx={{ fontFamily: theme.fontFamily.secondary, fontWeight: theme.fontWeight.regular }}>MOQ:&nbsp;</Typography>
        <Typography sx={{ fontFamily: theme.fontFamily.secondary, fontWeight: theme.fontWeight.medium }}>1000</Typography>
      </Box>
    </Box>
  );
};

export default ProductItemComponent;
