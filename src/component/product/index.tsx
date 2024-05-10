"use client";
import { MAX_WIDTH_APP } from "@/constant/css";
import useDevices from "@/hook/useDevices";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Pagination,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Product2 from "@/assets/images/product2.jpg";
import CheckboxComponent from "../common/CheckboxComponent";
const Product = () => {
  const { isMobile } = useDevices();
  const theme = useTheme();
  return (
    <Container
      sx={{
        mt: "184px",
        p: isMobile ? "20px!important" : "0 88px!important",
        maxWidth: `${MAX_WIDTH_APP}!important`,
        fontFamily: theme.fontFamily.secondary,
      }}
    >
      <Typography fontFamily={theme.fontFamily.secondary} mb={"20px"}>
        Showing 2,000+ products for “search value”
      </Typography>
      <Box display={"flex"}>
        <Box
          bgcolor={theme.blue[100]}
          p={"24px"}
          borderRadius={"16px"}
          height={"fit-content"}
          mr={"10px"}
        >
          <Typography
            fontFamily={theme.fontFamily.secondary}
            color={theme.black[200]}
            fontWeight={theme.fontWeight.bold}
            mb={"24px"}
          >
            Filter
          </Typography>
          <form>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"start"}
              mb={"24px"}
            >
              <Typography
                fontSize={14}
                fontFamily={theme.fontFamily.secondary}
                fontWeight={theme.fontWeight.bold}
                whiteSpace={"nowrap"}
                mb={"16px"}
              >
                Matching Products Categories
              </Typography>
              <Box display={"flex"} gap={1}>
                <CheckboxComponent id="1"/>
                <Typography
                  sx={{
                    fontFamily: theme.fontFamily.secondary,
                    fontSize: 14,
                  }}
                >
                  Cereals
                </Typography>
              </Box>
              <Box
                component={"button"}
                fontFamily={theme.fontFamily.secondary}
                fontSize={14}
                color={theme.palette.primary.main}
              >
                Show more
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"start"}
              mb={"24px"}
            >
              <Typography
                fontSize={14}
                fontFamily={theme.fontFamily.secondary}
                fontWeight={theme.fontWeight.bold}
                whiteSpace={"nowrap"}
                mb={"16px"}
              >
                Suppliers Country
              </Typography>
              <Box display={"flex"} gap={1}>
                <CheckboxComponent id="2"/>
                <Typography
                  sx={{
                    fontFamily: theme.fontFamily.secondary,
                    fontSize: 14,
                  }}
                >
                  Australia
                </Typography>
              </Box>
              <Box
                component={"button"}
                fontFamily={theme.fontFamily.secondary}
                fontSize={14}
                color={theme.palette.primary.main}
              >
                Show more
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"start"}
              mb={"24px"}
            >
              <Typography
                fontSize={14}
                fontFamily={theme.fontFamily.secondary}
                fontWeight={theme.fontWeight.bold}
                whiteSpace={"nowrap"}
                mb={"10px"}
              >
                Price
              </Typography>
              <Box display={"flex"} alignItems={"center"}>
                <TextField
                  type="number"
                  sx={{
                    width: "100px",
                    bgcolor: "white",
                    fontFamily: theme.fontFamily.secondary,
                    borderRadius: "8px",
                    border: `1px solid ${theme.palette.grey[50]}`,
                    input: {
                      padding: "12px 16px",
                    },
                  }}
                  placeholder="From"
                  inputProps={{
                    min: 0,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                />
                <Box
                  mx={"16px"}
                  width={"23px"}
                  height={"1px"}
                  bgcolor={theme.palette.grey[500]}
                />
                <TextField
                  type="number"
                  sx={{
                    width: "100px",
                    bgcolor: "white",
                    fontFamily: theme.fontFamily.secondary,
                    borderRadius: "8px",
                    border: `1px solid ${theme.palette.grey[50]}`,
                    input: {
                      padding: "12px 16px",
                    },
                  }}
                  placeholder="To"
                  inputProps={{
                    min: 0,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                />
              </Box>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"start"}
              width={"100%"}
              mb={"24px"}
            >
              <Typography
                fontSize={14}
                fontFamily={theme.fontFamily.secondary}
                fontWeight={theme.fontWeight.bold}
                whiteSpace={"nowrap"}
                mb={"10px"}
              >
                Minimum Order Quantity
              </Typography>
              <TextField
                type="number"
                sx={{
                  width: "100%",
                  bgcolor: "white",
                  fontFamily: theme.fontFamily.secondary,
                  borderRadius: "8px",
                  border: `1px solid ${theme.palette.grey[50]}`,
                  input: {
                    padding: "10px 16px",
                  },
                }}
                inputProps={{
                  min: 0,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
              />
            </Box>
            <Box width={"100%"}>
              <Box
                component={"button"}
                sx={{
                  p: "20px 14px",
                  textAlign: "start",
                  color: theme.palette.primary.main,
                  fontFamily: theme.fontFamily.secondary,
                  width: "45%",
                  fontWeight: theme.fontWeight.medium,
                  fontSize: 14,
                }}
              >
                Clear All
              </Box>
              <Button
                type="submit"
                sx={{
                  p: "10px 14px!important",
                  borderRadius: "6px",
                  bgcolor: `${theme.blue[500]}!important`,
                  color: "common.white",
                  fontFamily: theme.fontFamily.secondary,
                  width: "55%",
                  fontWeight: theme.fontWeight.medium,
                  fontSize: 14,
                }}
              >
                Apply
              </Button>
            </Box>
          </form>
        </Box>
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
                  <Image
                    src={Product2}
                    alt="product"
                    width={268}
                    height={268}
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
          <Pagination
            count={10}
            color="primary"
            shape="rounded"
            sx={{ justifyContent: "center", mt: "20px" }}
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Product;
