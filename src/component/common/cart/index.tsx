"use client";
import { MAX_WIDTH_APP } from "@/constant/css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import CheckboxComponent from "../CheckboxComponent";
import CartItem from "./CartItem";
import { useGetAllProductRecommended } from "@/api/product/query";
import { useEffect } from "react";
import ListProductComponent from "../show-list-product/ListProductComponent";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
const Cart = () => {
  const { getAllProductRecommended, data } = useGetAllProductRecommended();
  useEffect(() => {
    getAllProductRecommended();
  }, []);
  const theme = useTheme();
  return (
    <Container
      sx={{
        mt: "184px",
        p: { xs: "20px!important", md: "0 88px!important" },
        maxWidth: `${MAX_WIDTH_APP}!important`,
      }}
    >
      <Typography
        fontFamily={theme.fontFamily.secondary}
        fontWeight={theme.fontWeight.bold}
        fontSize={24}
        mb={"24px"}
      >
        Cart
      </Typography>
      <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
        <Box width={"66%"}>
          <Accordion
            defaultExpanded
            sx={{
              fontFamily: theme.fontFamily.secondary,
              boxShadow: "none",
              border: `1px solid ${theme.blue[100]}`,
              borderRadius: "8px!important",
              "&.MuiAccordion-root::before": {
                display: "none",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<IoIosArrowDown color="#0C71B9" />}
              aria-controls="panel-content"
              id="panel"
              sx={{
                color: theme.palette.primary.main,
                fontWeight: theme.fontWeight.semiBold,
                bgcolor: theme.blue[100],
                height: "45px",
                "&.Mui-expanded": {
                  minHeight: "45px",
                  height: "45px",
                },
                borderRadius: "8px",
              }}
            >
              <Box display={"flex"} gap={"20px"} alignItems={"center"}>
                <CheckboxComponent
                  id=""
                  handleOnCheck={() => console.log("hêlo")}
                  checked
                />
                <Typography
                  fontFamily={theme.fontFamily.secondary}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Supplier name
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                px={"40px"}
              >
                <Typography
                  fontFamily={theme.fontFamily.secondary}
                  fontWeight={theme.fontWeight.semiBold}
                  fontSize={14}
                >
                  Item
                </Typography>
                <Box display={"flex"} gap={"60px"}>
                  <Typography
                    fontFamily={theme.fontFamily.secondary}
                    fontWeight={theme.fontWeight.semiBold}
                    fontSize={14}
                  >
                    Order Quantity
                  </Typography>
                  <Typography
                    fontFamily={theme.fontFamily.secondary}
                    fontSize={14}
                    fontWeight={theme.fontWeight.semiBold}
                  >
                    Subtotal
                  </Typography>
                </Box>
              </Box>
              {Array(2)
                .fill(null)
                .map((_, index) => {
                  return (
                    <Box key={index}>
                      <CartItem />
                      <Divider
                        sx={{ borderColor: theme.blue[100], mx: "40px" }}
                      />
                      {Array(3)
                        .fill(null)
                        .map((_, index1) => {
                          return <CartItem isVariant key={index1} />;
                        })}
                      {index !== 1 && (
                        <Divider sx={{ borderColor: theme.blue[100] }} />
                      )}
                    </Box>
                  );
                })}
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box
          width={"32%"}
          p={"16px"}
          border={`1px solid ${theme.blue[100]}`}
          borderRadius={"8px"}
          boxShadow={`0px 0px 20px 2px rgba(0, 0, 0, 0.1)`}
          height={"fit-content"}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography
              fontFamily={theme.fontFamily.secondary}
              color={theme.black[200]}
              fontWeight={theme.fontWeight.semiBold}
              fontSize={20}
            >
              Order summary
            </Typography>
            <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
              Total: 12 items
            </Typography>
          </Box>
          <Divider
            sx={{ borderColor: theme.blue[600], mt: "10px", mb: "20px" }}
          />
          <Box
            p={"16px"}
            bgcolor={theme.blue[1100]}
            borderRadius={"8px"}
            display={"flex"}
            flexDirection={"column"}
            gap={"16px"}
          >
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
                Cart subtotal
              </Typography>
              <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
                {(990.99).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
                Shipping fee
              </Typography>
              <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
                {(100).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Box>
            <Divider sx={{ borderColor: theme.blue[600] }} />
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography
                fontFamily={theme.fontFamily.secondary}
                fontWeight={theme.fontWeight.semiBold}
              >
                Total
              </Typography>
              <Typography
                fontFamily={theme.fontFamily.secondary}
                fontWeight={theme.fontWeight.semiBold}
              >
                {(1090.99).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Box>
            <Typography
              fontFamily={theme.fontFamily.secondary}
              color={theme.palette.grey[400]}
              fontSize={14}
            >
              *A request for quotation will be send to this supplier and they
              will get in touch with your order soon!
            </Typography>

            <Box>
              <Typography
                fontFamily={theme.fontFamily.secondary}
                fontSize={14}
                mb={"6px"}
              >
                Message
              </Typography>
              <TextField
                rows={4}
                multiline
                sx={{
                  width: "100%",
                  bgcolor: "white",
                  border: `1px solid ${theme.blue[600]}`,
                  borderRadius: "8px",
                  "& .MuiOutlinedInput-root": {
                    fontFamily: theme.fontFamily.secondary,
                  },
                }}
              />
            </Box>
            <Button
              sx={{
                bgcolor: `${theme.palette.primary.main}!important`,
                padding: "12px 16px",
                borderRadius: "8px",
                color: "white",
                fontFamily: theme.fontFamily.secondary,
                fontWeight: theme.fontWeight.medium,
                width: "100%",
                boxShadow: "0 4px 4 0 rgba(0, 0, 0, 0.25)",
              }}
            >
              Process to Checkout
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ borderColor: theme.blue[600], my: "20px" }} />
      <ListProductComponent
        title={"Recommended Products"}
        url={PRODUCT_PATH_URL.PRODUCT_LIST}
        data={data}
      />
    </Container>
  );
};

export default Cart;
