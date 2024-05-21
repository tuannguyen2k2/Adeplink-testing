"use client";
import Product2 from "@/assets/images/product2.jpg";
import { SupplierDto } from "@/interface/common";
import { Box, Grid, Pagination, Typography, useTheme } from "@mui/material";
import Image from "next/image";

type SupplierListType = {
  data?: SupplierDto[];
};

const SupplierList = ({ data }: SupplierListType) => {
  const theme = useTheme();
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
      width={"100%"}
    >
      <Grid container spacing={10} width={"100%"} marginLeft={0} mt={0}>
        {data?.map((supplier: SupplierDto, index: number) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            key={supplier?.id}
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
                  {supplier.category}
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
                  {supplier.name}
                </Typography>
                <Box
                  height={"1px"}
                  width={1}
                  bgcolor={theme.blue[600]}
                  mt={2}
                  mb={1}
                />         
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





export default SupplierList;
