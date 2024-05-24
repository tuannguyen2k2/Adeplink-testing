"use client";
import { MAX_WIDTH_APP } from "@/constant/css";
import { Box, Container, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import SupplierBanner from "@/assets/images/supplier_banner.jpg";
import SupplierInfo from "./SupplierInfo";
const SupplierDetail = () => {
  const theme = useTheme();
  return (
    <Container
      sx={{
        mt: "184px",
        p: { xs: "20px!important", sm: "0 88px!important" },
        maxWidth: `${MAX_WIDTH_APP}!important`,
        fontFamily: theme.fontFamily.secondary,
      }}
    >
      <Box
        width={"100%"}
        height={160}
        mb={"32px"}
        border={`1px solid ${theme.blue[100]}`}
        borderRadius={"16px"}
      >
        <Image
          src={SupplierBanner}
          alt="supplier banner"
          style={{ borderRadius: "16px" }}
        />
      </Box>
      <SupplierInfo />
      <Box
        width={"100%"}
        p={"16px"}
        border={`1px solid ${theme.blue[100]}`}
        boxShadow={"0 2px 2px rgba(0, 0, 0, 0.1)"}
        borderRadius={"16px"}
        mt={"32px"}
      >
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontWeight: theme.fontWeight.semiBold,
            bgcolor: theme.blue[100],
            fontFamily: theme.fontFamily.secondary,
            p: "8px 16px",
            borderRadius: "8px",
            mb: "16px",
          }}
        >
          Photos
        </Typography>
        <Box display={"flex"} justifyContent={"space-between"}>
          {Array(5)
            .fill(null)
            .map((_, index) => {
              return (
                <Box width={224} height={224} position={"relative"} key={index}>
                  <Image
                    src={
                      "https://th.bing.com/th/id/OIP.Zfeg2aQarGBA5op6udDRXAHaEc?w=1000&h=600&rs=1&pid=ImgDetMain"
                    }
                    alt={""}
                    fill
                    objectFit="fill"
                    className="rounded-lg"
                  />
                </Box>
              );
            })}
        </Box>
      </Box>
      <Box
        width={"100%"}
        p={"16px"}
        border={`1px solid ${theme.blue[100]}`}
        boxShadow={"0 2px 2px rgba(0, 0, 0, 0.1)"}
        borderRadius={"16px"}
        mt={"32px"}
      >
        <Typography
          sx={{
            color: theme.palette.primary.main,
            fontWeight: theme.fontWeight.semiBold,
            fontFamily: theme.fontFamily.secondary,
            p: "8px 16px 4px 10px",
            mb: "16px",
            borderBottom: `2px solid ${theme.blue[1000]}`,
          }}
        >
          Reviews and rating
        </Typography>
        {/* Component Rating */}
      </Box>
    </Container>
  );
};

export default SupplierDetail;
