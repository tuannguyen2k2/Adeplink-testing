import { Box, Skeleton } from "@mui/material";

const ProductCharacteristicsSkeleton = () => {
  return (
    <Box width={"50%"}>
      <Skeleton animation="wave" />
      <Skeleton animation="wave" width={"50%"} />
      <Skeleton animation="wave" width={"30%"} />
      <Skeleton
        animation="wave"
        variant="rectangular"
        height={600}
        sx={{ borderRadius: "8px", mt: "20px" }}
      />
    </Box>
  );
};

export default ProductCharacteristicsSkeleton;
