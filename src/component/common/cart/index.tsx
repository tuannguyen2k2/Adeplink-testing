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
import { useSelector } from "react-redux";
import { cartSelector } from "@/store/selector";

const fakeCart = [
  {
    id: "1",
    name: "Nguyễn Tuấn",
    product: [
      {
        id: "2",
        name: "Red Chili",
        variant: [
          {
            id: "3",
            name: "Xanh, S",
          },
          {
            id: "4",
            name: "Đỏ, S",
          },
          {
            id: "5",
            name: "Cam, S",
          },
        ],
      },
      {
        id: "6",
        name: "Green Chili",
        variant: [
          {
            id: "7",
            name: "Xanh, S",
          },
          {
            id: "8",
            name: "Đỏ, S",
          },
          {
            id: "9",
            name: "Cam, S",
          },
        ],
      },
    ],
  },
  {
    id: "10",
    name: "Nguyễn Tuấn",
    product: [
      {
        id: "11",
        name: "Red Chili",
        variant: [
          {
            id: "12",
            name: "Xanh, S",
          },
          {
            id: "13",
            name: "Đỏ, S",
          },
          {
            id: "14",
            name: "Cam, S",
          },
        ],
      },
      {
        id: "15",
        name: "Green Chili",
        variant: [
          {
            id: "16",
            name: "Xanh, S",
          },
          {
            id: "17",
            name: "Đỏ, S",
          },
          {
            id: "18",
            name: "Cam, S",
          },
        ],
      },
    ],
  },
];

const Cart = () => {
  const { getAllProductRecommended, data } = useGetAllProductRecommended();
  useEffect(() => {
    getAllProductRecommended();
  }, []);
  const theme = useTheme();
  const cart = useSelector(cartSelector);
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
          {cart?.items.map((supplier, indexSupplier) => {
            return (
              <Accordion
                key={supplier.id}
                defaultExpanded
                sx={{
                  mt: indexSupplier > 0 ? "16px" : "0",
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
                    height: "48px",
                    "&.Mui-expanded": {
                      minHeight: "48px",
                      height: "48px!important",
                    },
                    borderRadius: "8px",
                  }}
                >
                  <Box display={"flex"} gap={"20px"} alignItems={"center"}>
                    <CheckboxComponent
                      id={supplier.id}
                      handleOnCheck={() => console.log("hêlo")}
                      checked
                    />
                    <Typography
                      fontFamily={theme.fontFamily.secondary}
                      fontWeight={theme.fontWeight.semiBold}
                    >
                      {supplier.name}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails sx={{p: "8px 6px 16px 16px"}}>
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
                  {supplier.product.map((product, indexProduct) => {
                    return (
                      <Box key={product.id}>
                        <CartItem data={product} />
                        <Divider
                          sx={{ borderColor: theme.blue[100], mx: "40px" }}
                        />
                        {product.variant.map((variant, indexVariant) => {
                          return (
                            <CartItem
                              data={variant}
                              isVariant
                              key={variant.id}
                            />
                          );
                        })}
                        {indexProduct !== 1 && (
                          <Divider sx={{ borderColor: theme.blue[100] }} />
                        )}
                      </Box>
                    );
                  })}
                </AccordionDetails>
              </Accordion>
            );
          })}
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
