import React from "react";
import { Box, Divider, Skeleton, useTheme } from "@mui/material";
import Image from "next/image";
import NoImage from "@/assets/images/no-image.png";

const ProductItemSkeleton = () => {
  const theme = useTheme();
  return (
    <Box sx={{ width: 242, height: 396, p: "16px", backgroundColor: "white", borderRadius: "16px", border: `1px solid ${theme.blue[100]}` }}>
      <Box width={210} height={210} position={"relative"}>
        <Image src={NoImage} alt="" fill objectFit="fill" className="rounded-lg" />
      </Box>
      <Skeleton width={130} />
      <Skeleton />
      <Skeleton sx={{ mb: 2 }} />
      <Divider sx={{ borderColor: theme.blue[600] }} />
      <Skeleton sx={{ mt: 1 }} />
      <Skeleton width={100} />
    </Box>
  );
};

export default ProductItemSkeleton;
