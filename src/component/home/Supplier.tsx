"use client";
import { getAllSupplier } from "@/api/supplier";
import SupplierIcon from "@/assets/icons/supplier.svg";
import { SUPPLIER_HOME_KEY } from "@/constant/queryKey";
import useDevices from "@/hook/useDevices";
import { Box, Button, Grid, Skeleton, Typography, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { MdArrowForward } from "react-icons/md";

const Supplier = () => {
  const theme = useTheme();

  const { data: supplierData, isLoading } = useQuery({
    queryKey: [SUPPLIER_HOME_KEY],
    queryFn: async () => await getAllSupplier({}, "Newest", { page: 1, limit: 5 }).then((response) => response.data.companies),
  });

  const SupplierSkeleton = () => (
    <Box display={"flex"} bgcolor={theme.blue[100]} sx={{ cursor: "pointer" }} p={"16px"} borderRadius={"8px"}>
      <Skeleton variant="rectangular" width={100} height={72} sx={{ borderRadius: "8px" }} />
      <Box width={"100%"} sx={{ ml: 2 }}>
        <Skeleton />
        <Skeleton width={"60%"} />
        <Skeleton width={"40%"} />
      </Box>
    </Box>
  );

  return (
    <Box display={"flex"} alignItems={"center"} gap={{ xs: "20px", md: 0 }} mt={"105px"} width={"100%"} sx={{ flexDirection: { xs: "column", md: "row" } }}>
      <Typography textAlign={{ xs: "center", md: "start" }} color={theme.black[200]} fontSize={16} fontWeight={theme.fontWeight.bold}>
        {"Trusted by the World's Top Customers & Suppliers"}
      </Typography>
      <Box width={"114%"}>
        <Grid container spacing={2}>
          {isLoading ? (
            Array.from(Array(5)).map((_, id) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={id} pt={"16px!important"} pl={"24px!important"}>
                <SupplierSkeleton key={id} />
              </Grid>
            ))
          ) : (
            <>
              {supplierData?.map((item, index) => (
                <Grid item xs={12} sm={6} md={6} lg={4} key={index} pt={"16px!important"} pl={"24px!important"}>
                  <Box display={"flex"} bgcolor={theme.blue[100]} sx={{ cursor: "pointer" }} p={"16px"} borderRadius={"8px"}>
                    <Image src={item.image ?? SupplierIcon} alt="light" width={72} height={72} />
                    <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} ml={2}>
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
                          {item.main_category}
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
          <Grid item xs={12} sm={6} md={6} lg={4} key={"last-item"} sx={{ cursor: "pointer" }} pt={"16px!important"} pl={"24px!important"}>
            <Box display={"flex"} width={"100%"} height={"100%"} bgcolor={theme.blue[500]} borderRadius={"8px"} p={"16px"}>
              <Box width={"100%"} display={"flex"} color={"common.white"} alignItems={"center"} justifyContent={"space-between"}>
                {supplierData &&
                  supplierData?.map((item, index) => (
                    <Grid item xs={12} sm={6} md={6} lg={4} key={index} pt={"16px!important"} pl={"24px!important"}>
                      <Box display={"flex"} bgcolor={theme.blue[100]} sx={{ cursor: "pointer" }} p={"16px"} borderRadius={"8px"}>
                        <Image src={item.image ?? SupplierIcon} alt="light" width={72} height={72} />
                        <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} ml={2}>
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
                              {item.main_category}
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
                <Grid item xs={12} sm={6} md={6} lg={4} key={"last-item"} sx={{ cursor: "pointer" }} pt={"16px!important"} pl={"24px!important"}>
                  <Box display={"flex"} width={"100%"} height={"100%"} bgcolor={theme.blue[500]} borderRadius={"8px"} p={"16px"}>
                    <Box width={"100%"} display={"flex"} color={"common.white"} alignItems={"center"} justifyContent={"space-between"}>
                      <Box width={"100%"} display={"flex"}>
                        <Typography fontWeight={theme.fontWeight.light} fontSize={13}>
                          View all of us on
                        </Typography>
                        <Typography fontWeight={theme.fontWeight.semiBold} whiteSpace={"pre-wrap"} fontSize={13}>
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
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Supplier;
