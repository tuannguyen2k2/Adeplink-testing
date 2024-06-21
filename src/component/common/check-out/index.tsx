"use client";
import { useGetCart } from "@/api/cart/query";
import MasterCard from "@/assets/icons/mastercard.svg";
import Paypal from "@/assets/icons/paypal.svg";
import { SUPPLIER_CONTACT } from "@/constant/cookies";
import { MAX_WIDTH_APP } from "@/constant/css";
import { SupplierCartType } from "@/interface/common";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControlLabel,
  InputAdornment,
  Radio,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import Cookies from "js-cookie";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SiVisa } from "react-icons/si";
import SupplierAccordion from "./SupplierAccordion";
import ShippingAddress from "./shipping/ShippingAddress";
interface PaymentForm {
  cardholder: string;
  cardNumber: string;
  expiryDate: string;
  securityCode: number;
}

const CheckOut = () => {
  const theme = useTheme();
  const [paymentMethod, setPaymentMethod] = useState<0 | 1>(0);
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
  const { getCart, data: cart } = useGetCart();


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
    getCart();
  }, []);

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
        console.log(supplierContactIdsParse);
        console.log(
          supplierTicked.filter(
            (item) => !supplierContactIdsParse.includes(item.id)
          )
        );
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
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <FormControlLabel
              sx={{ fontFamily: theme.fontFamily.secondary }}
              control={
                <Radio
                  size="small"
                  checked={paymentMethod == 0}
                  onChange={(
                    event: ChangeEvent<HTMLInputElement>,
                    checked: boolean
                  ) => checked && setPaymentMethod(0)}
                />
              }
              label={
                <Typography
                  sx={{ fontFamily: theme.fontFamily.secondary, fontSize: 14 }}
                >
                  Credit or debit card
                </Typography>
              }
            />
            <Box display={"flex"} gap={"4px"}>
              <Box
                border={`1px solid ${theme.palette.grey[100]}`}
                p={"1px 8px 0px"}
                borderRadius={"4px"}
              >
                <SiVisa color="#142688" size={24} />
              </Box>
              <Box
                border={`1px solid ${theme.palette.grey[100]}`}
                p={"0px 8px"}
                borderRadius={"4px"}
              >
                <Image
                  src={MasterCard}
                  alt="master-card"
                  width={24}
                  height={24}
                />
              </Box>
            </Box>
          </Box>
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
                  placeholder="Khoa.nguyen@gmail"
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
                  placeholder="xxxxxxxxxxxx"
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
                      placeholder="MM/YY"
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
                      placeholder="CVC/CVV"
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
            <Divider sx={{ borderColor: theme.blue[600], my: "10px" }} />
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <FormControlLabel
                sx={{ fontFamily: theme.fontFamily.secondary }}
                control={
                  <Radio
                    size="small"
                    checked={paymentMethod == 1}
                    onChange={(
                      event: ChangeEvent<HTMLInputElement>,
                      checked: boolean
                    ) => checked && setPaymentMethod(1)}
                  />
                }
                label={
                  <Typography
                    sx={{
                      fontFamily: theme.fontFamily.secondary,
                      fontSize: 14,
                    }}
                  >
                    PayPal
                  </Typography>
                }
              />

              <Image src={Paypal} alt="paypal" width={60} height={60} />
            </Box>
            <Typography
              fontFamily={theme.fontFamily.secondary}
              fontSize={14}
              my={"20px"}
            >
              *By continuing, you consent to data sharing as per our Privacy
              Policy and confirm reading the Privacy Notice and Terms.
            </Typography>
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
              Continue
            </Button>
          </form>
        </Box>
      </Box>
      {/* <OrderSuccessfully /> */}
    </Container>
  );
};

export default CheckOut;
