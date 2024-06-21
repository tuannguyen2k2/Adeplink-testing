"use client";
import React from "react";
import HeaderAdmin from "@/component/admin/header/HeaderAdmin";
import SidebarAdmin from "@/component/admin/sidebar";
import { Box } from "@mui/material";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <Box
      sx={{
        backgroundColor: "#FDFEFF",
        display: "flex",
        flexGrow: 1,
        height: "auto",
        justifyContent: "center",
        padding: "80px 30px 60px",
      }}
    >
      <HeaderAdmin />
      <Box sx={{ display: "flex", position: "relative", height: "100%" }}>
        <SidebarAdmin />
        <Box
          sx={{
            paddingTop: "70px",

            color: "#000000",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AdminLayout;
