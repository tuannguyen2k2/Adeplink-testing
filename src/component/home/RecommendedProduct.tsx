"use client";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { MdArrowForwardIos } from "react-icons/md";
import Product2 from "@/assets/images/product2.jpg";
import { MAX_WIDTH_APP } from "@/constant/css";

import useDevices from "@/hook/useDevices";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const RecommendedProduct = () => {
  const { isMobile } = useDevices();
  const theme = useTheme();
  const locale = Cookies.get("NEXT_LOCALE");
  const router = useRouter();
  return (
    <Box
      bgcolor={theme.blue[100]}
      display={"flex"}
      justifyContent={"center"}
      mt={"100px"}
    >
      <Box
        px={"88px"}
        py={"24px"}
        p={isMobile ? "0 20px 20px" : "24px 88px"}
        maxWidth={MAX_WIDTH_APP}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mb={"100px"}
        >
          <Typography
            fontSize={20}
            fontWeight={theme.fontWeight.bold}
            fontFamily={theme.fontFamily.secondary}
          >
            Recommended Products
          </Typography>
          <Box
            component={"button"}
            onClick={() => router.push(`/${locale}/recommend-product`)}
            display={"flex"}
            alignItems={"center"}
            gap={1}
            sx={{
              "&:hover": {
                color: theme.palette.primary.main,
                svg: {
                  fill: theme.palette.primary.main,
                },
              },
            }}
            color={theme.black[200]}
            fontSize={14}
            fontFamily={theme.fontFamily.secondary}
            fontWeight={theme.fontWeight.medium}
          >
            Explore more
            <MdArrowForwardIos size={14} color="#0C0C0C" />
          </Box>
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <Grid container spacing={10} width={"100%"} marginLeft={0}>
            {Array.from(Array(15)).map((_, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={12 / 5}
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingLeft: "0!important",
                  paddingTop: "32px!important",
                }}
              >
                <Box
                  width={"242px"}
                  height={"100%"}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  bgcolor={"common.white"}
                  p={"16px"}
                  borderRadius={"10px"}
                >
                  <Image
                    src={Product2}
                    alt="product"
                    width={210}
                    height={210}
                  />
                  <Box>
                    <Typography
                      color={theme.blue[500]}
                      fontSize={14}
                      mt={2}
                      mb={1}
                      fontWeight={theme.fontWeight.regular}
                      fontFamily={theme.fontFamily.secondary}
                    >
                      Category
                    </Typography>
                    <Typography
                      color={theme.black[200]}
                      fontWeight={theme.fontWeight.semiBold}
                      fontFamily={theme.fontFamily.secondary}
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        mb: 1,
                      }}
                    >
                      Name of Product Name of Product Name of Product Name of
                      Product
                    </Typography>
                    <Box
                      height={"1px"}
                      width={1}
                      bgcolor={theme.blue[600]}
                      mt={2}
                      mb={1}
                    />
                    <Box display={"flex"} gap={0.5} fontSize={14}>
                      <Typography
                        color={theme.blue[500]}
                        fontWeight={theme.fontWeight.regular}
                        fontFamily={theme.fontFamily.secondary}
                      >
                        From
                      </Typography>
                      <Typography
                        color={theme.blue[500]}
                        fontWeight={theme.fontWeight.medium}
                        fontFamily={theme.fontFamily.secondary}
                      >
                        $45.00
                      </Typography>
                      <Typography
                        color={theme.blue[500]}
                        fontWeight={theme.fontWeight.regular}
                        fontFamily={theme.fontFamily.secondary}
                      >
                        to
                      </Typography>
                      <Typography
                        color={theme.blue[500]}
                        fontWeight={theme.fontWeight.medium}
                        fontFamily={theme.fontFamily.secondary}
                      >
                        $100.00
                      </Typography>
                    </Box>
                    <Box
                      display={"flex"}
                      gap={0.5}
                      color={theme.palette.grey[400]}
                    >
                      <Typography fontFamily={theme.fontFamily.secondary}>
                        MOQ
                      </Typography>
                      <Typography fontFamily={theme.fontFamily.secondary}>
                        1000
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default RecommendedProduct;
