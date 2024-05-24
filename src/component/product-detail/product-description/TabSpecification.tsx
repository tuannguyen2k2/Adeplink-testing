import { Box, Divider, Typography, useTheme } from "@mui/material";
import React from "react";

const dummyData = [
  { id: 1, name: "Printing Methods", value: "Digital Print etc," },
  { id: 2, name: "Gender", value: "Unisex" },
  { id: 3, name: "Place of Origin", value: "China" },
  { id: 4, name: "Product Type", value: "Sportswear" },
];

const TabSpecification = () => {
  const theme = useTheme();
  return (
    <React.Fragment>
      <Typography sx={{ fontWeight: theme.fontWeight.bold, mb: 2 }}>Industry-specific attributes</Typography>
      <Box>
        {dummyData.map((item) => (
          <Box key={item.id} sx={{ display: "flex", alignItems: "center", fontSize: 14 }}>
            <Box sx={{ height: 44, width: 186, border: "1px solid #EAECF0", display: "flex", alignItems: "center", padding: '12px 24px', backgroundColor: '#F4F4F4',  fontWeight: theme.fontWeight.medium, }}>{item.name}</Box>
            {/* <Divider orientation="vertical" flexItem/> */}
            <Box sx={{ height: 44, width: 186, border: "1px solid #EAECF0", display: "flex", alignItems: "center", padding: '12px 24px',  fontWeight: theme.fontWeight.regular }}>{item.value}</Box>
          </Box>
        ))}
      </Box>
    </React.Fragment>
  );
};

export default TabSpecification;
