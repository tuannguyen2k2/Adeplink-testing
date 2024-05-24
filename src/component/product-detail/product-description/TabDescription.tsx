import React from "react";
import { Box, useTheme } from "@mui/material";

const TabDescription = () => {
  const theme = useTheme()
  return (
    <Box sx={{fontFamily: theme.fontFamily.secondary, fontWeight: theme.fontWeight.regular, fontSize: 14}}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Sem
      integer vitae justo eget. Diam vel quam elementum pulvinar. Fringilla urna porttitor rhoncus dolor purus. Scelerisque viverra mauris in aliquam sem. Urna porttitor rhoncus
      dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Sem
      integer vitae justo eget. Diam vel quam elementum pulvinar. Fringilla urna porttitor rhoncus dolor purus. Scelerisque viverra mauris in aliquam sem. Urna porttitor rhoncus
      dolor
    </Box>
  );
};

export default TabDescription;
