"use client";

import SupplierListPage from "@/component/admin/supplier-list";
import { MAX_WIDTH_APP } from "@/constant/css";
import { Container } from "@mui/material";

const SupplierList = () => {
  return (
    <Container
      sx={{
        p: { xs: "20px!important", md: "0 88px!important" },
        maxWidth: `${MAX_WIDTH_APP}!important`,
        backgroundColor: "#FDFEFF",
      }}
    >
      <SupplierListPage />
    </Container>
  );
};

export default SupplierList;
