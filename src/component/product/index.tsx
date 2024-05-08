"use client";
import { MAX_WIDTH_APP } from "@/constant/css";
import useDevices from "@/hook/useDevices";
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import Product2 from "@/assets/images/product2.jpg";
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
      <Typography fontFamily={theme.fontFamily.secondary} mb={"80px"}>
        Showing 2,000+ products for “search value”
      </Typography>
      <Box display={"flex"}>
        <Box bgcolor={theme.blue[100]} p={"24px"} borderRadius={"16px"}>
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
              >
                Matching Products Categories
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      svg: { fill: theme.palette.primary.main },
                    }}
                    name="Cereals"
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontFamily: theme.fontFamily.secondary,
                      fontSize: 14,
                    }}
                  >
                    Cereals
                  </Typography>
                }
              />
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
              >
                Suppliers Country
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      svg: { fill: theme.palette.primary.main },
                    }}
                    name="Austrialia"
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontFamily: theme.fontFamily.secondary,
                      fontSize: 14,
                    }}
                  >
                    Austrialia
                  </Typography>
                }
              />
              <Box
                component={"button"}
                fontFamily={theme.fontFamily.secondary}
                fontSize={14}
                color={theme.palette.primary.main}
              >
                Show more
              </Box>
            </Box>
            <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
              <Typography
                fontSize={14}
                fontFamily={theme.fontFamily.secondary}
                fontWeight={theme.fontWeight.bold}
                whiteSpace={"nowrap"}
              >
                Price
              </Typography>
              <TextField
                type="number"
                sx={{ width: "100px", bgcolor: "white" }}
                inputProps={{
                  min: 0,
                }}
              />
              <Box
                component={"button"}
                fontFamily={theme.fontFamily.secondary}
                fontSize={14}
                color={theme.palette.primary.main}
              >
                Show more
              </Box>
            </Box>
          </form>
        </Box>
        <Box display={"flex"} justifyContent={"center"}>
          <Grid container spacing={10} width={"100%"} marginLeft={0}>
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
    </Container>
  );
};

export default Product;
