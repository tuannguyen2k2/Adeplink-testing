"use client";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControlLabel,
  InputAdornment,
  Radio,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { ChangeEvent, Dispatch, SetStateAction, useEffect } from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import { SiVisa } from "react-icons/si";
import MasterCard from "@/assets/icons/mastercard.svg";
import { PaymentForm } from "@/interface/common";
import Paypal from "@/assets/icons/paypal.svg";
import TextFieldComponent from "../TextFieldComponent";

import {
  PayPalButtons,
  PayPalCVVField,
  PayPalCardFieldsForm,
  PayPalCardFieldsProvider,
  PayPalExpiryField,
  PayPalHostedField,
  PayPalHostedFieldsProvider,
  PayPalNameField,
  PayPalNumberField,
  FUNDING,
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
type OrderSummaryType = {
  totalItems: number;
  totalPrice: number;
  paymentMethod: 0 | 1;
  setPaymentMethod?: (value: SetStateAction<0 | 1>) => void;
  paymentForm: UseFormReturn<PaymentForm, any, undefined>;
  isValidSubmit: boolean;
  handleSubmitForms: () => void;
  cardInformation?: PaymentForm;
  readOnly?: boolean;
  modeReview?: boolean;
  titleButtonSubmit: string;
  loading?: boolean;
};
const OrderSummary = ({
  totalItems,
  totalPrice,
  paymentMethod,
  setPaymentMethod,
  paymentForm,
  isValidSubmit,
  handleSubmitForms,
  cardInformation,
  readOnly,
  modeReview,
  titleButtonSubmit,
  loading,
}: OrderSummaryType) => {
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    register,
    reset,
    clearErrors,
    formState: { errors },
  } = paymentForm;
  const formatVisaNumber = (value: string) => {
    return value.replace(/\s/g, "").replace(/(\d{4})(?=\d)/g, "$1-");
  };

  const formatExpiryDate = (value: string) => {
    const numericValue = value.replace(/\D/g, "");

    let formattedValue = numericValue.slice(0, 2);
    if (numericValue.length > 2) {
      formattedValue += "/" + numericValue.slice(2, 4);
    }

    return formattedValue;
  };
  const handleChangeCardNumber = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    const formattedValue = formatVisaNumber(value);
    paymentForm.setValue("cardNumber", formattedValue);
  };
  const handleChangeExpiryDate = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const formattedValue = formatExpiryDate(event.target.value);
    paymentForm.setValue("expiryDate", formattedValue);
  };

  useEffect(() => {
    if (cardInformation) {
      reset(cardInformation);
    }
  }, []);

  const createOrder = () => {};
  const onApprove = () => {};
  const onError = () => {};
  return (
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
      <Divider sx={{ borderColor: theme.blue[600], mt: "10px", mb: "20px" }} />
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
      {modeReview && (
        <Box>
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
        </Box>
      )}
      {/* {!modeReview && (
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
                ) => checked && setPaymentMethod && setPaymentMethod(0)}
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
      )}
      {(!modeReview || (modeReview && paymentMethod == 0)) && (
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginTop: "8px",
          }}
        >
          <TextFieldComponent
            label="Cardholder"
            rules={{ required: "Cardholder required" }}
            readOnly={readOnly}
            placeholder="Khoa.nguyen@gmail"
            error={errors.cardholder}
            name="cardholder"
            register={register}
            clearErrors={() => clearErrors("cardholder")}
            vertical
          />
          <TextFieldComponent
            label="Card number"
            rules={{ required: "Card number required" }}
            readOnly={readOnly}
            placeholder="xxxxxxxxxxxx"
            error={errors.cardNumber}
            name="cardNumber"
            register={register}
            clearErrors={() => clearErrors("cardNumber")}
            onChange={handleChangeCardNumber}
            vertical
            endAdornment={
              <InputAdornment position="end">
                <Box
                  border={`1px solid ${theme.palette.grey[100]}`}
                  p={"1px 8px 0px"}
                  borderRadius={"4px"}
                >
                  <SiVisa color="#142688" size={24} />
                </Box>
              </InputAdornment>
            }
          />

          <Box display={"flex"} gap={"10px"}>
            <TextFieldComponent
              label="Expiry date"
              rules={{ required: "Expiry date required" }}
              readOnly={readOnly}
              placeholder="MM/YY"
              error={errors.expiryDate}
              name="expiryDate"
              register={register}
              clearErrors={() => clearErrors("expiryDate")}
              onChange={handleChangeExpiryDate}
              vertical
            />
            <TextFieldComponent
              label="Security Code"
              rules={{ required: "Security Code required" }}
              readOnly={readOnly}
              placeholder="CVC/CVV"
              error={errors.securityCode}
              name="securityCode"
              register={register}
              clearErrors={() => clearErrors("securityCode")}
              vertical
            />
          </Box>
        </form>
      )}

      {!modeReview && (
        <Divider sx={{ borderColor: theme.blue[600], my: "10px" }} />
      )}
      {(!modeReview || (modeReview && paymentMethod == 1)) && (
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
                disabled={readOnly}
                onChange={(
                  event: ChangeEvent<HTMLInputElement>,
                  checked: boolean
                ) => checked && setPaymentMethod && setPaymentMethod(1)}
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
      )}
      {!modeReview && (
        <Typography
          fontFamily={theme.fontFamily.secondary}
          fontSize={14}
          my={"20px"}
        >
          *By continuing, you consent to data sharing as per our Privacy Policy
          and confirm reading the Privacy Notice and Terms.
        </Typography>
      )}
      <Button
        sx={{
          width: "100%",
          textAlign: "center",
          mt: "20px",
          borderRadius: "8px",
          p: "12px 16px",
          bgcolor: `${
            isValidSubmit ? theme.palette.primary.main : theme.blue[700]
          }!important`,
          color: "white",
          fontWeight: theme.fontWeight.medium,
          fontSize: 14,
          fontFamily: theme.fontFamily.secondary,
        }}
        onClick={handleSubmitForms}
      >
        {loading ? (
          <CircularProgress
            size={22}
            sx={{
              "&.MuiCircularProgress-colorPrimary": {
                color: "white!important",
              },
            }}
          />
        ) : (
          titleButtonSubmit
        )}
      </Button> */}
      {!modeReview && (
        <Button
          sx={{
            width: "100%",
            textAlign: "center",
            mt: "20px",
            borderRadius: "8px",
            p: "12px 16px",
            bgcolor: `${
              isValidSubmit ? theme.palette.primary.main : theme.blue[700]
            }!important`,
            pointerEvents: isValidSubmit ? "auto" : "none",
            color: "white",
            fontWeight: theme.fontWeight.medium,
            fontSize: 14,
            fontFamily: theme.fontFamily.secondary,
          }}
          onClick={handleSubmitForms}
        >
          {/* {loading ? (
          <CircularProgress
            size={22}
            sx={{
              "&.MuiCircularProgress-colorPrimary": {
                color: "white!important",
              },
            }}
          />
        ) : ( */}
          {titleButtonSubmit}
          {/* )} */}
        </Button>
      )}
      {modeReview && (
        <PayPalScriptProvider
          options={{
            clientId:
              "AYMQuwG9NZcJfyv-Tix7GmZe5rq4b8pB67yBOxI_6n4oU4k2Vhp0XGHKrsath2_6gvbKJp6j-zNgUJRa",
          }}
        >
          <Box display={"flex"} flexDirection={"column"} gap={"16px"}>
            <Button
              fullWidth
              disableRipple
              sx={{
                bgcolor: theme.yellow[200],
                height: 45,
                "&:hover": {
                  bgcolor: theme.yellow[200],
                  opacity: 0.9,
                },
              }}
              onClick={handleSubmitForms}
            >
              {loading ? (
                <CircularProgress
                  size={22}
                  sx={{
                    "&.MuiCircularProgress-colorPrimary": {
                      color: "white!important",
                    },
                  }}
                />
              ) : (
                <Image src={Paypal} alt="paypal" width={100} height={100} />
              )}
            </Button>
            <PayPalButtons
              style={{ layout: "horizontal" }}
              fundingSource={FUNDING.CARD}
            />
          </Box>
        </PayPalScriptProvider>
      )}
    </Box>
  );
};

export default OrderSummary;
