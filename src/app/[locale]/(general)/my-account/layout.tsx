import SidebarAccount from "@/component/my-account/sidebar";
import { MARGIN_BOTTOM_ON_FOOTER, MAX_WIDTH_APP } from "@/constant/css";
import { Box, Container } from "@mui/material";
import React from "react";

const AccountPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#F8FBFF",
        display: "flex",
        width: "100%",
      }}
    >
      <Container
        sx={{
          mt: "111px",
          p: { xs: "20px!important", md: "0 88px!important" },
          maxWidth: `${MAX_WIDTH_APP}!important`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "32px",
            height: "100%",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <SidebarAccount />
          <Box
            sx={{
              flex: 1,
              paddingTop: { xs: "0px", md: "80px" },
              pb: "60px",
            }}
          >
            {children}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AccountPage;
