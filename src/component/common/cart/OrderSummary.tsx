import { useGetCart } from "@/api/cart/query";
import { SUPPLIER_CONTACT } from "@/constant/cookies";
import { CHECKOUT_PATH_URL, SEND_REQUEST_PATH_URL } from "@/constant/pathUrl";
import { cartSelector, supplierContactSelector } from "@/store/selector";
import { setCart, setSupplierContact } from "@/store/slice/appSlice";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next-nprogress-bar";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const OrderSummary = () => {
  const theme = useTheme();
  const cart = useSelector(cartSelector);
  const dispatch = useDispatch();
  const router = useRouter();
  const supplierContact = useSelector(supplierContactSelector);
  const { getCart, data, isSuccess: getCartSuccess } = useGetCart();
  const [valueMessage, setValueMessage] = useState("");
  const [supplierTicked, setSupplierTicked] = useState<string[]>([]);
  const [sendMessageSuccess, setSendMessageSuccess] = useState(false);
  useEffect(() => {
    if (getCartSuccess && data) {
      dispatch(setCart(data));
    }
  }, [getCartSuccess]);
  const calculateSubTotal = () => {
    if (supplierContact.length > 0) {
      return "To be negotiated";
    }
    let subTotal = 0;
    cart?.items.forEach((supplier) => {
      supplier.product.forEach((product) => {
        if (product.variant) {
          product.variant.forEach((variant) => {
            if (variant.is_tick) {
              subTotal += variant.price * variant.quantity;
            }
          });
        } else if (!product.variant && product.is_tick) {
          subTotal += product.price * product.quantity;
        }
      });
    });
    return subTotal;
  };

  const calculateTotalItemTicked = () => {
    let total = 0;
    cart?.items.forEach((supplier) => {
      supplier.product.forEach((product) => {
        if (product.variant) {
          product.variant.forEach((variant) => {
            if (variant.is_tick) {
              total += 1;
            }
          });
        } else if (!product.variant && product.is_tick) {
          total += 1;
        }
      });
    });
    return total;
  };

  useEffect(() => {
    setSendMessageSuccess(false);
    let supplierContactIds: string[] = [];
    let supplierHasTicked: string[] = [];
    cart?.items?.forEach((supplier) => {
      let isProductHasRange = false;
      supplier.product.forEach((product) => {
        // if (isProductHasRange) {
        //   return;
        // }
        if (product.is_tick && !product.variant) {
          !supplierHasTicked.includes(supplier.id) &&
            supplierHasTicked.push(supplier.id);
          product.range_price.map((range) => {
            if (
              +range.min_amount <= product.quantity &&
              +range.max_amount >= product.quantity
            ) {
              isProductHasRange = true;
            }
          });
          if (!isProductHasRange) {
            !supplierContactIds.includes(supplier.id) &&
              supplierContactIds.push(supplier.id);
          }
        } else if (product.variant) {
          let isVariantHasRange = false;
          let totalQuantityVariantTicked = 0;
          product.variant.map((variant) => {
            if (variant.is_tick) {
              !supplierHasTicked.includes(supplier.id) &&
                supplierHasTicked.push(supplier.id);
              totalQuantityVariantTicked += variant.quantity;
            }
          });
          product.range_price.map((range) => {
            if (
              +range.min_amount <= totalQuantityVariantTicked &&
              +range.max_amount >= totalQuantityVariantTicked
            ) {
              isVariantHasRange = true;
            }
          });
          if (!isVariantHasRange && totalQuantityVariantTicked > 0) {
            !supplierContactIds.includes(supplier.id) &&
              supplierContactIds.push(supplier.id);
          }
        }
      });
    });
    dispatch(setSupplierContact(supplierContactIds));
    Cookies.set(SUPPLIER_CONTACT, JSON.stringify(supplierContactIds));
    setSupplierTicked(supplierHasTicked);
  }, [cart]);
  return (
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
          Total: {calculateTotalItemTicked()} items
        </Typography>
      </Box>
      <Divider sx={{ borderColor: theme.blue[600], mt: "10px", mb: "20px" }} />
      <Box
        p={"16px"}
        bgcolor={theme.blue[1100]}
        borderRadius={"8px"}
        display={"flex"}
        flexDirection={"column"}
        gap={"16px"}
      >
        {supplierContact.length >= 1 && supplierTicked.length > 1 && (
          <Box
            fontFamily={theme.fontFamily.secondary}
            fontSize={14}
            color={theme.palette.primary.main}
          >
            *Some items in your order require contacting the supplier for
            pricing. You may remove these products from your request order, or
            <Typography
              component={"strong"}
              fontFamily={theme.fontFamily.secondary}
              fontSize={14}
              fontWeight={theme.fontWeight.semiBold}
              color={theme.palette.primary.main}
            >
              &nbsp;Proceed to Checkout&nbsp;
            </Typography>
            and submit a request for quotation.
          </Box>
        )}
        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
            Cart subtotal
          </Typography>
          <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
            {calculateSubTotal().toLocaleString("en-US", {
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
            {calculateSubTotal() == "To be negotiated"
              ? calculateSubTotal()
              : (calculateSubTotal() == 0 ? 0 : 100).toLocaleString("en-US", {
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
            {calculateSubTotal() == "To be negotiated"
              ? calculateSubTotal()
              : (
                  +calculateSubTotal() + (calculateSubTotal() == 0 ? 0 : 100)
                ).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
          </Typography>
        </Box>
        {supplierContact.length == 1 && supplierTicked.length == 1 && (
          <Box>
            {!sendMessageSuccess ? (
              <Box>
                <Typography
                  fontFamily={theme.fontFamily.secondary}
                  color={theme.palette.grey[400]}
                  fontSize={14}
                >
                  *A request for quotation will be send to this supplier and
                  they will get in touch with your order soon!
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
                    onChange={(
                      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                    ) => setValueMessage(event.currentTarget.value)}
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
              </Box>
            ) : (
              <Typography
                fontFamily={theme.fontFamily.secondary}
                fontWeight={theme.fontWeight.medium}
                color={theme.palette.primary.main}
              >
                {` A request for quotation has been sent to the supplier, and they will contact you soon regarding your order!`}
              </Typography>
            )}
          </Box>
        )}
        {!sendMessageSuccess && (
          <Box>
            {supplierContact.length == 1 && supplierTicked.length == 1 ? (
              <ButtonSubmit
                title="Send Request for Quotation"
                disabled={valueMessage == ""}
                onClick={() => {
                  setSendMessageSuccess(true);
                }}
              />
            ) : (
              <ButtonSubmit
                title="Proceed to Checkout"
                disabled={calculateSubTotal() == 0}
                onClick={() => {
                  if (supplierContact.length == 0) {
                    router.push(CHECKOUT_PATH_URL);
                  } else if (
                    supplierContact.length > 1 ||
                    supplierTicked.length > 1
                  ) {
                    router.push(SEND_REQUEST_PATH_URL);
                  }
                  getCart();
                }}
              />
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default OrderSummary;

type ButtonSubmitType = {
  disabled: boolean;
  onClick: () => void;
  title: string;
};

const ButtonSubmit = ({ disabled, onClick, title }: ButtonSubmitType) => {
  const theme = useTheme();
  return (
    <Button
      sx={{
        bgcolor: disabled
          ? `${theme.blue[700]}!important`
          : `${theme.palette.primary.main}!important`,
        padding: "12px 16px",
        borderRadius: "8px",
        color: "white",
        fontFamily: theme.fontFamily.secondary,
        fontWeight: theme.fontWeight.medium,
        width: "100%",
        pointerEvents: disabled ? "none" : "auto",
        boxShadow: "0 4px 4 0 rgba(0, 0, 0, 0.25)",
      }}
      onClick={onClick}
    >
      {title}
    </Button>
  );
};
