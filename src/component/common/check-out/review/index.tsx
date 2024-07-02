"use client";
import { MARGIN_BOTTOM_ON_FOOTER, MAX_WIDTH_APP } from "@/constant/css";
import { CHECKOUT_PATH_URL } from "@/constant/pathUrl";
import { Box, Container, Typography, useTheme } from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import { IoIosArrowBack } from "react-icons/io";
import AddressComponent from "../shipping/AddressComponent";
import Cookies from "js-cookie";
import { ORDER } from "@/constant/cookies";
import { useEffect, useState } from "react";
import { OrderReviewType, PaymentForm } from "@/interface/common";
import SupplierAccordion from "../SupplierAccordion";
import OrderSummary from "../OrderSummary";
import { useForm } from "react-hook-form";
import { usePostOrder } from "@/api/checkout/query";
import { usePathname } from "next/navigation";

const ReviewCheckOut = () => {
  const theme = useTheme();
  const router = useRouter();

  const [orderReview, setOrderReview] = useState<OrderReviewType>();
  const {
    postOrder,
    data: orderResponse,
    isSuccess: orderSuccess,
    isPending: loadingPostOrder,
  } = usePostOrder();
  const paymentForm = useForm<PaymentForm>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  useEffect(() => {
    const order = Cookies.get(ORDER);
    if (order) {
      setOrderReview(JSON.parse(order));
    }
  }, []);

  useEffect(() => {
    if (orderResponse?.links[1].href) router.push(orderResponse?.links[1].href);
  }, [orderResponse]);
  if (!orderReview) {
    return;
  }
  const handleSubmitForms = () => {
    postOrder({
      link: orderReview.link,
      shipping_address: orderReview.shipping_address,
      billing_address: orderReview.billing_address,
      fee: orderReview.fee,
      items: orderReview.items,
      total_item: orderReview.total_item,
      total_price: orderReview.total_price,
    });
  };
  return (
    <Container
      sx={{
        mt: "184px",
        p: { xs: "20px!important", md: "0 88px!important" },
        maxWidth: `${MAX_WIDTH_APP}!important`,
        mb: MARGIN_BOTTOM_ON_FOOTER,
      }}
    >
      <Box
        component={"button"}
        display={"flex"}
        gap={"8px"}
        alignItems={"center"}
        mb={"10px"}
        onClick={() => {
          router.push(CHECKOUT_PATH_URL);
        }}
      >
        <IoIosArrowBack color="#0C71B9" />
        <Typography
          fontWeight={theme.fontWeight.medium}
          fontFamily={theme.fontFamily.secondary}
          fontSize={14}
          color={theme.palette.primary.main}
          mt={"2px"}
        >
          Back to edit
        </Typography>
      </Box>
      <Typography
        fontWeight={theme.fontWeight.bold}
        fontSize={24}
        fontFamily={theme.fontFamily.secondary}
        mb={"24px"}
      >
        Review and purchase
      </Typography>
      <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
        <Box width={"66%"}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={"16px"}
            mb={"16px"}
          >
            <AddressComponent
              data={orderReview.shipping_address}
              title="Shipping Address"
            />
            <AddressComponent
              data={orderReview.billing_address}
              title="Billing Address"
              checkSameBillingAddress={orderReview.check_same_billing_address}
            />
          </Box>
          {orderReview.items?.map((data) => {
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
                modeReview
              />
            );
          })}
        </Box>
        <OrderSummary
          modeReview
          isValidSubmit
          totalItems={orderReview.total_item}
          totalPrice={orderReview.total_price}
          cardInformation={orderReview.card_information}
          paymentMethod={orderReview.payment_method}
          paymentForm={paymentForm}
          readOnly
          handleSubmitForms={handleSubmitForms}
          titleButtonSubmit="Confirm and Place Order"
          loading={loadingPostOrder}
        />
      </Box>
    </Container>
  );
};

export default ReviewCheckOut;
