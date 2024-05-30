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
      <Skeleton variant="rectangular" width={"88px"} height={"88px"} sx={{mt: 1, borderRadius: '8px'}}/>
      <Box>
        <Skeleton width={500} height={30} />
        <Skeleton width={200} height={30} />
        <Skeleton width={300} height={30} />
      </Box>
      <Box display={"flex"} justifyContent={"flex-end"} height={"fit-content"}>
        <Skeleton width={93} height={50} sx={{ mr: 2 }} />
        <Skeleton width={118} height={50} />
      </Box>
    </Box>
  );
};

export default SupplierItemSkeleton;
