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
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import OrderSuccessfully from "./OrderSuccessfully";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cartSelector } from "@/store/selector";
import { SupplierCartType } from "@/interface/common";
import SupplierAccordion from "./SupplierAccordion";
import Cookies from "js-cookie";
import { SUPPLIER_CONTACT } from "@/constant/cookies";
import { Controller, useForm } from "react-hook-form";
import { SiVisa } from "react-icons/si";
import ShippingAddress from "./shipping/ShippingAddress";
interface PaymentForm {
  cardholder: string;
  cardNumber: string;
  expiryDate: string;
  securityCode: number;
}

const CheckOut = () => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PaymentForm>();
  const [supplierTickedInCart, setSupplierTickedInCart] = useState<
    SupplierCartType[]
  >([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const cart = useSelector(cartSelector);
  const [cardNumber, setCardNumber] = useState("");
  const handleChangeCardNumber = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const formattedValue = formatVisaNumber(value);
    setCardNumber(formattedValue);
  };

  const formatVisaNumber = (value: string) => {
    // Định dạng số thẻ visa với dấu '-' sau mỗi 4 chữ số
    return value.replace(/\s/g, "").replace(/(\d{4})(?=\d)/g, "$1-");
  };

  useEffect(() => {
    if (cart) {
      const supplierTicked = [];
      for (let item of cart.items) {
        for (let product of item.product) {
          if (product.is_tick) {
            supplierTicked.push(item);
            break;
          }
          if (!product.is_tick && product.variant)
            for (let variant of product.variant) {
              if (variant.is_tick) {
                supplierTicked.push(item);
                break;
              }
            }
          break;
        }
      }
      const supplierContactIds = Cookies.get(SUPPLIER_CONTACT);
      if (supplierContactIds) {
        const supplierContactIdsParse: string[] =
          JSON.parse(supplierContactIds);
        setSupplierTickedInCart(
          supplierTicked.filter(
            (item) => !supplierContactIdsParse.includes(item.id)
          )
        );
      }
    }
  }, [cart]);

  useEffect(() => {
    let total_items = 0;
    let total_price = 0;
    supplierTickedInCart.forEach((supplier) => {
      supplier.product.forEach((product) => {
        if (!product.variant && product.is_tick) {
          total_items += 1;
          total_price += product.quantity * product.price;
        } else if (product.variant) {
          product.variant.forEach((variant) => {
            if (variant.is_tick) {
              total_items += 1;
              total_price += variant.quantity * variant.price;
            }
          });
        }
      });
    });
    setTotalItems(total_items);
    setTotalPrice(total_price);
  }, [supplierTickedInCart]);

  return (
    <Container
      sx={{
        mt: "184px",
        p: { xs: "20px!important", md: "0 88px!important" },
        maxWidth: `${MAX_WIDTH_APP}!important`,
      }}
    >
      <Typography
        fontWeight={theme.fontWeight.bold}
        fontSize={24}
        fontFamily={theme.fontFamily.secondary}
        mb={"24px"}
      >
        Checkout
      </Typography>
      <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
        <Box width={"66%"}>
          <ShippingAddress />
          {supplierTickedInCart?.map((data) => {
            let totalItem = 0;
            let totalPrice = 0;
            data.product.forEach((product) => {
              if (!product.variant && product.is_tick) {
                totalItem += 1;
                totalPrice += product.quantity * product.price;
              } else if (product.variant) {
                product.variant.forEach((variant) => {
                  if (variant.is_tick) {
                    totalItem += 1;
                    totalPrice += variant.quantity * variant.price;
                  }
                });
              }
            });
            return (
              <SupplierAccordion
                key={data.id}
                data={data}
                totalItem={totalItem}
                totalPrice={totalPrice}
              />
            );
          })}
        </Box>
        <Box
          width={"32%"}
          p={"16px"}
          borderRadius={"8px"}
          border={`1px solid ${theme.blue[100]}`}
          boxShadow={`0px 4px 20px 2px rgba(0, 0, 0, 0.1)`}
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
              Total: {totalItems} items
            </Typography>
          </Box>
          <Divider
            sx={{ borderColor: theme.blue[600], mt: "10px", mb: "20px" }}
          />
          <Box
            p={"16px"}
            gap={"16px"}
            display={"flex"}
            flexDirection={"column"}
            bgcolor={theme.blue[1100]}
            borderRadius={"8px"}
          >
            <Box display={"flex"} justifyContent={"space-between"}>
              <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
                Cart subtotal
              </Typography>
              <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
                {totalPrice.toLocaleString("en-US", {
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
                {(totalPrice + 100).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Typography>
            </Box>
          </Box>
          <Typography
            fontFamily={theme.fontFamily.secondary}
            color={theme.black[200]}
            fontWeight={theme.fontWeight.semiBold}
            fontSize={20}
            mt={"30px"}
          >
            Payment method
          </Typography>
          <Divider
            sx={{ borderColor: theme.blue[600], mt: "10px", mb: "20px" }}
          />
          <form>
            <Typography
              fontFamily={theme.fontFamily.secondary}
              color={theme.black[200]}
              fontWeight={theme.fontWeight.medium}
              fontSize={14}
              mt={"20px"}
              mb={"6px"}
            >
              Cardholder
            </Typography>
            <Controller
              name="cardholder"
              control={control}
              defaultValue=""
              rules={{ required: "Cardholder required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  sx={{
                    border: `1px solid ${theme.blue[600]}`,
                    width: "100%",
                    borderRadius: "8px",
                    input: {
                      fontFamily: theme.fontFamily.secondary,
                      fontSize: 14,
                    },
                  }}
                  error={!!errors.cardholder}
                  helperText={errors.cardholder?.message}
                />
              )}
            />
            <Typography
              fontFamily={theme.fontFamily.secondary}
              color={theme.black[200]}
              fontWeight={theme.fontWeight.medium}
              fontSize={14}
              mt={"20px"}
              mb={"6px"}
            >
              Card number
            </Typography>
            <Controller
              name="cardNumber"
              control={control}
              defaultValue=""
              rules={{ required: "CardNumber required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  value={cardNumber}
                  sx={{
                    border: `1px solid ${theme.blue[600]}`,
                    width: "100%",
                    borderRadius: "8px",
                    input: {
                      fontFamily: theme.fontFamily.secondary,
                      fontSize: 14,
                    },
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Box
                          border={`1px solid ${theme.palette.grey[100]}`}
                          p={"1px 8px 0px"}
                          borderRadius={"4px"}
                        >
                          <SiVisa color="#142688" size={24} />
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleChangeCardNumber}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber?.message}
                />
              )}
            />
            <Box display={"flex"} gap={"10px"}>
              <Box>
                <Typography
                  fontFamily={theme.fontFamily.secondary}
                  color={theme.black[200]}
                  fontWeight={theme.fontWeight.medium}
                  fontSize={14}
                  mt={"20px"}
                  mb={"6px"}
                >
                  Expiry date
                </Typography>
                <Controller
                  name="expiryDate"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Expiry date required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      sx={{
                        border: `1px solid ${theme.blue[600]}`,
                        width: "100%",
                        borderRadius: "8px",
                        input: {
                          fontFamily: theme.fontFamily.secondary,
                          fontSize: 14,
                        },
                      }}
                      error={!!errors.expiryDate}
                      helperText={errors.expiryDate?.message}
                    />
                  )}
                />
              </Box>
              <Box>
                <Typography
                  fontFamily={theme.fontFamily.secondary}
                  color={theme.black[200]}
                  fontWeight={theme.fontWeight.medium}
                  fontSize={14}
                  mt={"20px"}
                  mb={"6px"}
                >
                  Security Code
                </Typography>
                <Controller
                  name="securityCode"
                  control={control}
                  rules={{ required: "Security code required" }}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      size="small"
                      sx={{
                        border: `1px solid ${theme.blue[600]}`,
                        width: "100%",
                        borderRadius: "8px",
                        input: {
                          fontFamily: theme.fontFamily.secondary,
                          fontSize: 14,
                        },
                      }}
                      error={!!errors.securityCode}
                      helperText={errors.securityCode?.message}
                    />
                  )}
                />
              </Box>
            </Box>
            <Button
              sx={{
                width: "100%",
                textAlign: "center",
                mt: "20px",
                borderRadius: "8px",
                bgcolor: `${theme.palette.primary.main}!important`,
                color: "white",
                fontWeight: theme.fontWeight.medium,
                fontSize: 14,
                fontFamily: theme.fontFamily.secondary,
              }}
            >
              Confirm and Place Order
            </Button>
          </form>
        </Box>
      </Box>
      {/* <OrderSuccessfully /> */}
    </Container>
  );
};

export default CheckOut;
