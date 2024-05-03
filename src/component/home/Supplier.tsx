"use client";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import SupplierIcon from "@/assets/icons/supplier.svg";
import { MdArrowForward } from "react-icons/md";
const Supplier = () => {
  const theme = useTheme();
  return (
    <Box display={"flex"} alignItems={"center"} mt={"105px"} width={"100%"}>
      <Typography
        color={theme.black[200]}
        fontSize={16}
        fontWeight={theme.fontWeight.bold}
      >
        {"Trusted by the World's Top Customers & Suppliers"}
      </Typography>
      <Box width={"100%"}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          width={"calc(100% + 64px)"}
          ml={"-64px"}
        >
          {Array.from(Array(5)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index} pt={"16px!important"}>
              <Box
                display={"flex"}
                bgcolor={theme.blue[100]}
                sx={{ cursor: "pointer" }}
                p={"16px"}
                borderRadius={"8px"}
              >
                <Image src={SupplierIcon} alt="light" width={72} height={72} />
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                  ml={2}
                >
                  <Typography
                    fontSize={13}
                    color={theme.black[200]}
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                    }}
                  >
                    Megrol Global Corporation Corporation Corporation
                    Corporation
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
                      Main category
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
                      Country
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          ))}
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
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
