import { Box, Rating, Skeleton } from "@mui/material";
import React from "react";

const ReviewComponentSkeleton = () => {
  return (
    <Box
      sx={{
        border: "1px solid #F0F6FF",
        borderRadius: "8px",
        padding: "16px",
        mt: 3,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Skeleton width={220} height={35} />
      <Rating readOnly color="skeleton" />
      <Skeleton variant="text" width={180} height={35} />
      <Skeleton width={180} height={35} />
      <Skeleton width={600} height={120} />
      <Box display={"flex"} height={"72px"} sx={{ gap: 4 }}>
        {Array.from(Array(6)).map((_, id) => (
          <Skeleton variant="rectangular" width={72} height={72} key={id} />
        ))}
      </Box>
    </Box>
  );
};

export default ReviewComponentSkeleton;
