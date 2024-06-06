"use client";
import { getSearchSupplier } from "@/api/supplier";
import { getRecommendSupplier } from "@/api/supplier/api";
import { useGetRecommendSupplier } from "@/api/supplier/query";
import NoImage from "@/assets/images/no-image.png";
import { SUPPLIER_PATH_URL } from "@/constant/pathUrl";
import { SUPPLIER_HOME_KEY } from "@/constant/queryKey";
import useDevices from "@/hook/useDevices";
import { convertImage } from "@/utils";
import {
  Box,
  Button,
  Grid,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import { useEffect } from "react";
import { MdArrowForward } from "react-icons/md";

const Supplier = () => {
  const theme = useTheme();
  const router = useRouter();
  const {
    data: supplierData,
    getRecommendSupplier,
    isPending,
  } = useGetRecommendSupplier();
  console.log(supplierData);
  useEffect(() => {
    getRecommendSupplier(6);
  }, []);

  const SupplierSkeleton = () => (
    <Box
      display={"flex"}
      bgcolor={theme.blue[100]}
      sx={{ cursor: "pointer" }}
      p={"16px"}
      borderRadius={"8px"}
    >
      <Skeleton
        variant="rectangular"
        width={100}
        height={72}
        sx={{ borderRadius: "8px" }}
      />
      <Box width={"100%"} sx={{ ml: 2 }}>
        <Skeleton />
        <Skeleton width={"60%"} />
        <Skeleton width={"40%"} />
      </Box>
    </Box>
  );

  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      gap={{ xs: "20px", md: 0 }}
      mt={"105px"}
      width={"100%"}
      sx={{ flexDirection: { xs: "column", md: "row" } }}
    >
      <Typography
        textAlign={{ xs: "center", md: "start" }}
        color={theme.black[200]}
        fontSize={16}
        fontWeight={theme.fontWeight.bold}
      >
        {"Trusted by the World's Top Customers & Suppliers"}
      </Typography>
      <Box width={"114%"}>
        <Grid container spacing={2}>
          {isPending || !supplierData ? (
            Array.from(Array(5)).map((_, id) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
                key={id}
                pt={"16px!important"}
                pl={"24px!important"}
              >
                <SupplierSkeleton key={id} />
              </Grid>
            ))
          ) : (
            <>
              {supplierData?.map((item, index) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  key={index}
                  pt={"16px!important"}
                  pl={"24px!important"}
                >
                  <Box
                    display={"flex"}
                    bgcolor={theme.blue[100]}
                    sx={{ cursor: "pointer" }}
                    p={"16px"}
                    borderRadius={"8px"}
                    onClick={() =>
                      router.push(
                        `${SUPPLIER_PATH_URL.SUPPLIER_DETAIL}/${item.slug}`
                      )
                    }
                  >
                    <Box width={72} height={72}>
                      <Image
                        src={convertImage(item.image) ?? NoImage}
                        alt="supplier"
                        width={72}
                        height={72}
                        style={{ height: "100%", maxWidth: 72 }}
                      />
                    </Box>
                    <Box
                      display={"flex"}
                      flexDirection={"column"}
                      justifyContent={"space-between"}
                      ml={2}
                    >
                      <Typography
                        fontSize={14}
                        color={theme.black[200]}
                        sx={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                        }}
                      >
                        {item.company_name}
                      </Typography>
                      <Box>
                        <Typography
                          fontSize={12}
                          color={theme.palette.grey[300]}
                          sx={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 1,
                            overflow: "hidden",
                          }}
                        >
                          {item.category_name}
                        </Typography>
                        <Typography
                          fontSize={12}
                          color={theme.black.main}
                          sx={{
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 1,
                            overflow: "hidden",
                          }}
                        >
                          {item.country}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </>
          )}

          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={4}
            key={"last-item"}
            sx={{ cursor: "pointer" }}
            pt={"16px!important"}
            pl={"24px!important"}
          >
            <Box
              display={"flex"}
              width={"100%"}
              height={"100%"}
              bgcolor={theme.blue[500]}
              borderRadius={"8px"}
              p={"16px"}
              onClick={() => router.push(SUPPLIER_PATH_URL.SUPPLIER_LIST)}
            >
              <Box
                width={"100%"}
                display={"flex"}
                color={"common.white"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Box width={"100%"} display={"flex"}>
                  <Typography fontWeight={theme.fontWeight.light} fontSize={13}>
                    View all of us on
                  </Typography>
                  <Typography
                    fontWeight={theme.fontWeight.semiBold}
                    whiteSpace={"pre-wrap"}
                    fontSize={13}
                  >
                    {" "}
                    AdeptLink
                  </Typography>
                </Box>
                <Button
                  sx={{
                    bgcolor: "white!important",
                    p: 1,
                    borderRadius: "50%",
                    minWidth: "32px",
                    "&:hover": {
                      bgcolor: "white!important",
                    },
                  }}
                >
                  <MdArrowForward color="#0C0C0C" size={17} />
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Supplier;
