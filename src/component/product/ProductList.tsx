"use client";
import Product2 from "@/assets/images/product2.jpg";
import { Box, Grid, Pagination, Typography, useTheme } from "@mui/material";
import Image from "next/image";

const ProductList = () => {
  const theme = useTheme();
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid container spacing={10} width={"100%"} marginLeft={0} mt={0}>
        {Array.from(Array(15)).map((_, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            key={index}
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingLeft: "0!important",
              paddingTop: index > 2 ? "20px!important" : "0!important",
            }}
          >
            <Box
              width={"300px"}
              height={"100%"}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              bgcolor={"common.white"}
              p={"16px"}
              borderRadius={"10px"}
              border={`1px solid ${theme.blue[100]}`}
            >
              <Image src={Product2} alt="product" width={268} height={268} />
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
                <Box display={"flex"} gap={0.5} color={theme.palette.grey[400]}>
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
      <Pagination
        count={10}
        color="primary"
        shape="rounded"
        sx={{ justifyContent: "center", mt: "20px" }}
      />
    </Box>
  );
};

export default ProductList;
