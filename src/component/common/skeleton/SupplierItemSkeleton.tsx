import React from "react";
import { Box, Skeleton, useTheme } from "@mui/material";

const SupplierItemSkeleton = () => {
  const theme = useTheme();
  return (
    <Box
      width={"100%"}
      height={"fit-content"}
      display={"flex"}
      bgcolor={"common.white"}
      justifyContent={"space-between"}
      p={"16px"}
      mb={3}
      borderRadius={"10px"}
      border={`1px solid ${theme.blue[100]}`}
    >
      <Skeleton
        variant="rectangular"
        width={"88px"}
        height={"88px"}
        sx={{ borderRadius: "8px" }}
      />
      <Box width={"40%"}>
        <Skeleton width={"100%"} height={30} />
        <Skeleton width={"60%"} height={30} />
        <Skeleton width={"50%"} height={30} />
      </Box>
      <Box
        width={"40%"}
        display={"flex"}
        justifyContent={"flex-end"}
        height={"fit-content"}
        gap={"8px"}
        sx={{ mr: 2 }}
      >
        <Skeleton
          variant="rectangular"
          width={"40%"}
          height={42}
          sx={{ borderRadius: "8px" }}
        />
        <Skeleton
          variant="rectangular"
          width={"40%"}
          height={42}
          sx={{ borderRadius: "8px" }}
        />
      </Box>
    </Box>
  );
};

export default SupplierItemSkeleton;
