import React from "react";
import { Box, useTheme } from "@mui/material";

const TabDescription = ({ description }: { description?: string }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        fontFamily: theme.fontFamily.secondary,
        fontWeight: theme.fontWeight.regular,
        fontSize: 14,
      }}
    >
      {description}
    </Box>
  );
};

export default TabDescription;
