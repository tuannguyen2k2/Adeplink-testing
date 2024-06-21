"use client";
import NoImage from "@/assets/images/no-image.png";
import { SEND_REQUEST_PATH_URL } from "@/constant/pathUrl";
import { ProductCartType, SupplierCartType } from "@/interface/common";
import { convertImage } from "@/utils";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import LogoShipping from "@/assets/images/logo_shipping.png";
import ListShippingMethodModal from "./shipping/ListShippingMethodModal";
const SupplierAccordion = ({
  data,
  totalItem,
  totalPrice,
}: {
  data: SupplierCartType;
  totalItem: number;
  totalPrice?: number;
}) => {
  const [productTickedInCart, setProductTickedInCart] = useState<
    ProductCartType[]
  >([]);
  const theme = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    if (data) {
      const productTicked = [];

      for (let product of data.product) {
        if (product.is_tick) {
          productTicked.push(product);
        }
        if (product.variant && !product.is_tick) {
          for (let variant of product.variant) {
            if (variant.is_tick) {
              productTicked.push(product);
              break;
            }
          }
        }
      }

      setProductTickedInCart(productTicked);
    }
  }, [data]);
  const calculateSubTotalPrice = (price: number, quantity: number) => {
    if (price == 0) {
      return "Contact";
    } else {
      return (price * quantity).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
  };
  return (
    <Accordion
      defaultExpanded
      sx={{
        mt: "0",
        fontFamily: theme.fontFamily.secondary,
        boxShadow: "none",
        border: `1px solid ${theme.blue[100]}`,
        borderRadius: "8px!important",
        "&.MuiAccordion-root::before": {
          display: "none",
        },
        "&.MuiAccordion-root": {
          mb: "16px!important",
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

          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
      >
        {data.name}
      </AccordionSummary>
      <AccordionDetails>
        <Box display={"flex"} justifyContent={"space-between"} pl={"30px"}>
          <Typography
            fontFamily={theme.fontFamily.secondary}
            fontWeight={theme.fontWeight.semiBold}
            fontSize={14}
          >
            Item
          </Typography>
          <Box display={"flex"} gap={"100px"}>
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
        {productTickedInCart.map((product, index) => {
          if (product.variant) {
            return (
              <Box key={product.id} my={"20px"}>
                <Box display={"flex"}>
                  <Box width={100} height={100} mr={"14px"}>
                    <Image
                      src={convertImage(product.image) || NoImage}
                      alt="product"
                      width={100}
                      height={100}
                      style={{ height: "100%", maxWidth: "100px" }}
                      className="rounded-lg"
                    />
                  </Box>
                  <Typography
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                      overflow: "hidden",
                      fontWeight: theme.fontWeight.medium,
                      py: "14px",
                      pr: "70px",
                      fontFamily: theme.fontFamily.secondary,
                    }}
                  >
                    {product.name}
                  </Typography>
                </Box>
                <Box mt={"40px"}>
                  {product.variant.map((variant) => {
                    if (variant.is_tick) {
                      return (
                        <Box
                          key={variant.id}
                          display={"flex"}
                          justifyContent={"space-between"}
                          ml={"132px"}
                          my={"20px"}
                        >
                          <Typography
                            sx={{
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: 2,
                              overflow: "hidden",
                              fontWeight: theme.fontWeight.regular,
                              fontFamily: theme.fontFamily.secondary,
                            }}
                          >
                            {variant.name}
                          </Typography>
                          <Box display={"flex"}>
                            <Typography
                              mr={"60px"}
                              sx={{
                                fontFamily: theme.fontFamily.secondary,
                                fontWeight: theme.fontWeight.regular,
                              }}
                            >
                              {variant.quantity}
                            </Typography>
                            <Typography
                              minWidth={"134px"}
                              color={theme.palette.primary.main}
                              sx={{
                                fontFamily: theme.fontFamily.secondary,
                                fontWeight: theme.fontWeight.regular,
                                textAlign: "end",
                              }}
                            >
                              {calculateSubTotalPrice(
                                variant.price,
                                variant.quantity
                              )}
                            </Typography>
                          </Box>
                        </Box>
                      );
                    }
                  })}
                </Box>
                {index !== productTickedInCart.length - 1 && (
                  <Divider sx={{ borderColor: theme.blue[100], mx: "10px" }} />
                )}
              </Box>
            );
          } else {
            return (
              <Box key={product.id}>
                <Box
                  my={"20px"}
                  display={"flex"}
                  justifyContent={"space-between"}
                >
                  <Box display={"flex"}>
                    <Box width={100} height={100} mr={"14px"}>
                      <Image
                        src={convertImage(product.image) || NoImage}
                        alt="product"
                        width={100}
                        height={100}
                        style={{ height: "100%", maxWidth: "100px" }}
                        className="rounded-lg"
                      />
                    </Box>
                    <Typography
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        fontWeight: theme.fontWeight.medium,
                        fontFamily: theme.fontFamily.secondary,
                        py: "14px",
                      }}
                    >
                      {product.name}
                    </Typography>
                  </Box>
                  <Box display={"flex"} py={"14px"}>
                    <Typography
                      mr={"60px"}
                      sx={{
                        fontFamily: theme.fontFamily.secondary,
                        fontWeight: theme.fontWeight.regular,
                      }}
                    >
                      {product.quantity}
                    </Typography>
                    <Typography
                      minWidth={"134px"}
                      color={theme.palette.primary.main}
                      sx={{
                        fontFamily: theme.fontFamily.secondary,
                        fontWeight: theme.fontWeight.regular,
                        textAlign: "end",
                      }}
                    >
                      {calculateSubTotalPrice(product.price, product.quantity)}
                    </Typography>
                  </Box>
                </Box>
                {index !== productTickedInCart.length - 1 && (
                  <Divider sx={{ borderColor: theme.blue[100], mx: "10px" }} />
                )}
              </Box>
            );
          }
        })}
        <ShippingMethod />
      </AccordionDetails>
      {pathname == SEND_REQUEST_PATH_URL ? (
        <SendRequestForm totalItem={totalItem} />
      ) : (
        <Box
          bgcolor={theme.blue[100]}
          sx={{ borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" }}
          p={"16px"}
          display={"flex"}
          justifyContent={"end"}
          gap={"18px"}
        >
          <Typography
            fontSize={16}
            fontWeight={theme.fontWeight.semiBold}
            fontFamily={theme.fontFamily.secondary}
          >
            {`Total (${totalItem} items):`}
          </Typography>
          <Typography
            fontSize={16}
            fontWeight={theme.fontWeight.medium}
            fontFamily={theme.fontFamily.secondary}
            color={theme.palette.primary.main}
          >
            {(totalPrice ?? 0).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
        </Box>
      )}
    </Accordion>
  );
};

const ShippingMethod = () => {
  const theme = useTheme();
  const pathname = usePathname();
  const [openListShippingMethodModal, setOpenListShippingMethodModal] =
    useState(false);
  
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Typography
        fontSize={14}
        fontFamily={theme.fontFamily.secondary}
        fontWeight={theme.fontWeight.semiBold}
      >
        Shipping method:
      </Typography>
      {pathname == SEND_REQUEST_PATH_URL ? (
        <Typography
          fontSize={14}
          fontFamily={theme.fontFamily.secondary}
          mt={"8px"}
        >
          To be negotiated on Shipping fee
        </Typography>
      ) : (
        <Box
          p={"10px"}
          border={`1px solid ${theme.blue[1200]}`}
          borderRadius={"8px"}
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          mt={"16px"}
        >
          <Box display={"flex"} alignItems={"center"} gap={"10px"}>
            <Image
              src={LogoShipping}
              alt="logo_shipping"
              width={62}
              height={62}
            />
            <Box display={"flex"} flexDirection={"column"} gap={"8px"}>
              <Box display={"flex"} gap={"16px"}>
                <Typography
                  fontFamily={theme.fontFamily.secondary}
                  fontWeight={theme.fontWeight.medium}
                  fontSize={14}
                >
                  {"FedEx (Standard)"}
                </Typography>
                <Box
                  component={"button"}
                  fontFamily={theme.fontFamily.secondary}
                  fontSize={14}
                  color={theme.palette.primary.main}
                  onClick={() => {
                    setOpenListShippingMethodModal(true);
                  }}
                >
                  Change
                </Box>
                <ListShippingMethodModal
                  openListShippingMethodModal={openListShippingMethodModal}
                  setOpenListShippingMethodModal={
                    setOpenListShippingMethodModal
                  }
                />
              </Box>
              <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
                Estimated delivery by&nbsp;
                <Typography
                  fontFamily={theme.fontFamily.secondary}
                  component={"strong"}
                  fontWeight={theme.fontWeight.semiBold}
                  fontSize={14}
                >
                  Jul 4
                </Typography>
              </Typography>
            </Box>
          </Box>
          <Typography
            fontFamily={theme.fontFamily.secondary}
            color={theme.palette.primary.main}
            fontWeight={theme.fontWeight.medium}
          >
            {(100).toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const SendRequestForm = ({ totalItem }: { totalItem: number }) => {
  const theme = useTheme();
  const [valueInput, setValueInput] = useState("");
  return (
    <Box
      bgcolor={theme.blue[100]}
      sx={{ borderBottomLeftRadius: "8px", borderBottomRightRadius: "8px" }}
      p={"16px"}
    >
      <Box display={"flex"} justifyContent={"end"} gap={"18px"}>
        <Typography
          fontSize={16}
          fontWeight={theme.fontWeight.semiBold}
          fontFamily={theme.fontFamily.secondary}
        >
          {`Total (${totalItem} items):`}
        </Typography>
        <Typography
          fontSize={16}
          fontWeight={theme.fontWeight.medium}
          fontFamily={theme.fontFamily.secondary}
          color={theme.palette.primary.main}
        >
          Contact
        </Typography>
      </Box>
      <Box
        bgcolor={theme.blue[1100]}
        p={"16px"}
        display={"flex"}
        flexDirection={"column"}
        gap={"16px"}
        border={"16px"}
        mt={"40px"}
      >
        <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
          *A request for quotation will be send to this supplier and they will
          get in touch with your order soon!
        </Typography>
        <Typography
          fontFamily={theme.fontFamily.secondary}
          fontSize={14}
          fontWeight={theme.fontWeight.medium}
        >
          Message
        </Typography>
        <TextField
          rows={5}
          multiline
          onChange={(
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => setValueInput(event.target.value)}
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
        <Button
          sx={{
            width: "100%",
            bgcolor:
              valueInput == ""
                ? `${theme.blue[700]}!important`
                : `${theme.palette.primary.main}!important`,
            pointerEvents: valueInput == "" ? "none" : "auto",
            color: "white",
            borderRadius: "8px",
            fontFamily: theme.fontFamily.secondary,
            fontWeight: theme.fontWeight.medium,
          }}
        >
          Send Request for Quotation
        </Button>
      </Box>
    </Box>
  );
};

export default SupplierAccordion;
