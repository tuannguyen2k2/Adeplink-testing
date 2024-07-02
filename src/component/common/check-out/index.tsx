"use client";
import { useGetCart } from "@/api/cart/query";
import { usePostOrder } from "@/api/checkout/query";
import { useSaveAddress } from "@/api/user/query";
import { ORDER, SUPPLIER_CONTACT } from "@/constant/cookies";
import { MARGIN_BOTTOM_ON_FOOTER, MAX_WIDTH_APP } from "@/constant/css";
import {
  CHECKOUT_REVIEW_PATH_URL,
  CHECKOUT_SUCCESSFULLY,
  CHECKOUT_UNSUCCESSFULLY,
  HOST_NAME,
} from "@/constant/pathUrl";
import {
  AddressFormType,
  AddressType,
  OrderReviewType,
  PaymentForm,
  SupplierCartType,
} from "@/interface/common";
import { PUBLIC_KEY_STRIPE } from "@/lib/payment";
import { Box, Container, Typography, useTheme } from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import OrderSummary from "./OrderSummary";
import SupplierAccordion from "./SupplierAccordion";
import ShippingAddress from "./shipping/ShippingAddress";

const CheckOut = () => {
  const theme = useTheme();
  const [paymentMethod, setPaymentMethod] = useState<0 | 1>(0);
  const paymentForm = useForm<PaymentForm>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const router = useRouter();
  const shippingAddressForm = useForm<AddressFormType>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const billingAddressForm = useForm<AddressFormType>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [supplierTickedInCart, setSupplierTickedInCart] = useState<
    SupplierCartType[]
  >([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const { getCart, data: cart } = useGetCart();
  const {
    postOrder,
    data: orderResponse,
    isSuccess: orderSuccess,
  } = usePostOrder();
  const { saveAddress, isSuccess: saveAddressSuccess } = useSaveAddress();
  const [addressDefault, setAddressDefault] = useState<AddressType>();
  const [checkSameAddressBilling, setCheckSameAddressBilling] = useState(false);

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    if (!window.document.getElementById("stripe-script")) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://js.stripe.com/v2/";
      s.onload = () => {
        (window as any)["Stripe"].setPublishableKey(PUBLIC_KEY_STRIPE);
      };
      window.document.body.appendChild(s);
    }
  }, []);
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  const onSubmit = async (values: PaymentForm) => {
    await sleep(300);
    try {
      (window as any).Stripe.card.createToken(
        {
          number: values.cardNumber,
          exp_month: values.expiryDate.split("/")[0],
          exp_year: values.expiryDate.split("/")[1],
          cvc: values.securityCode,
          name: values.cardholder,
        },
        (status: number, response: any) => {
          if (status === 200) {
            console.log(response);
            axios
              .post("/stripe-payment", {
                token: response,
                email: "tuanbmt123123@gmail.com",
                amount: 100,
              })
              .then((res) => console.log(res))
              .catch((err) => console.log(err));
          } else {
            console.log(response.error.message);
          }
        }
      );
    } catch (error) {
      // Handle the error
    }
  };

  useEffect(() => {
    if (cart) {
      const supplierTicked = [];
      for (let item of cart.items) {
        console.log(item);
        for (let product of item.product) {
          if (product.is_tick) {
            supplierTicked.push(item);
            break;
          }
          if (!product.is_tick && product.variant) {
            for (let variant of product.variant) {
              console.log(variant);
              if (variant.is_tick) {
                supplierTicked.push(item);
                break;
              }
            }
          }
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
  const handleValidSubmit = () => {
    const billingForm = billingAddressForm.getValues();
    const shippingForm = shippingAddressForm.getValues();
    const hasRequiredFields = (form: AddressFormType) =>
      form.company &&
      form.address_line1 &&
      form.city &&
      form.country &&
      form.state &&
      form.first_name &&
      form.last_name &&
      form.phone &&
      form.zipcode;

    if (
      addressDefault &&
      (hasRequiredFields(billingForm) || checkSameAddressBilling)
    ) {
      return true;
    }

    if (
      hasRequiredFields(shippingForm) &&
      hasRequiredFields(billingForm) &&
      checkSameAddressBilling
    ) {
      return true;
    }

    return false;
  };
  useEffect(() => {
    if (orderResponse?.links[1].href)
      window.open(orderResponse?.links[1].href, "_blank");
  }, [orderResponse]);

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

  const handleSubmitForms = async () => {
    if (!addressDefault) {
      await shippingAddressForm.handleSubmit((data) => {
        console.log(data);
      })();
      if (Object.keys(shippingAddressForm.formState.errors).length !== 0) {
        return;
      }
    }
    if (!checkSameAddressBilling) {
      await billingAddressForm.handleSubmit((data) => {
        console.log(data);
      })();
      if (Object.keys(billingAddressForm.formState.errors).length !== 0) {
        return;
      }
    }
    // paymentMethod == 0 &&
    //   (await paymentForm.handleSubmit((data) => {
    //     console.log(data);
    //   })());
    if (shippingAddressForm.getValues("is_save_later_use")) {
      saveAddress(shippingAddressForm.getValues());
    }
    // onSubmit({ ...paymentForm.getValues() });
    supplierTickedInCart.forEach((supplier, indexSupplier) => {
      supplier.product = supplier.product.filter((product, indexProduct) => {
        let productTicked = false;
        if (product.is_tick) {
          productTicked = true;
        }
        if (product.variant && !product.is_tick) {
          product.variant = product.variant.filter(
            (variant) => variant.is_tick
          );
          for (let variant of product.variant) {
            if (variant.is_tick) {
              productTicked = true;
              break;
            }
          }
        }
        return productTicked;
      });
    });

    const items = supplierTickedInCart.map((supplier) => ({
      ...supplier,
      shipping_method: { name: "land", price: "100" },
    }));

    const order: OrderReviewType = {
      link: {
        success: HOST_NAME + CHECKOUT_SUCCESSFULLY,
        failure: HOST_NAME + CHECKOUT_UNSUCCESSFULLY,
      },
      shipping_address: addressDefault ?? shippingAddressForm.getValues(),
      billing_address: checkSameAddressBilling
        ? addressDefault ?? shippingAddressForm.getValues()
        : billingAddressForm.getValues(),
      check_same_billing_address: checkSameAddressBilling,
      total_price: totalPrice,
      total_item: totalItems,
      fee: 100,
      items: items,
      payment_method: paymentMethod,
      card_information: {
        cardholder: paymentForm.getValues("cardholder"),
        cardNumber: paymentForm.getValues("cardNumber"),
        expiryDate: paymentForm.getValues("expiryDate"),
        securityCode: paymentForm.getValues("securityCode"),
        amount: totalPrice + 100,
      },
    };
    Cookies.set(ORDER, JSON.stringify(order));
    router.push(CHECKOUT_REVIEW_PATH_URL);
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
          <Box mb={"16px"}>
            <ShippingAddress
              shippingAddressForm={shippingAddressForm}
              billingAddressForm={billingAddressForm}
              addressDefault={addressDefault}
              setAddressDefault={setAddressDefault}
              checkSameAddressBilling={checkSameAddressBilling}
              setCheckSameAddressBilling={setCheckSameAddressBilling}
            />
          </Box>
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
        <OrderSummary
          handleSubmitForms={handleSubmitForms}
          paymentForm={paymentForm}
          totalItems={totalItems}
          totalPrice={totalPrice}
          setPaymentMethod={setPaymentMethod}
          paymentMethod={paymentMethod}
          isValidSubmit={handleValidSubmit()}
          titleButtonSubmit="Continue"
        />
      </Box>
    </Container>
  );
};

export default CheckOut;
