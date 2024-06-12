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
import { ChangeEvent, useEffect } from "react";
import ListProductComponent from "../show-list-product/ListProductComponent";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector, checkOutSelector } from "@/store/selector";
import {
  CartType,
  ProductCartType,
  SupplierCartType,
  VariantCartType,
} from "@/interface/common";
import CartEmpty from "@/assets/images/cart_empty.png";
import Image from "next/image";
import { useTickAllCartItem, useTickCartItem } from "@/api/cart/query";
import { setCart, setCheckOut } from "@/store/slice/appSlice";

const Cart = () => {
  const { getAllProductRecommended, data } = useGetAllProductRecommended();
  useEffect(() => {
    getAllProductRecommended();
  }, []);
  const theme = useTheme();
  const cart = useSelector(cartSelector);
  const { tickAllCartItem } = useTickAllCartItem();
  const { tickCartItem } = useTickCartItem();
  const dispatch = useDispatch();
  const checkout = useSelector(checkOutSelector);
  console.log(cart);
  const getAllProductIdsAndVariantIds = (products: ProductCartType[]) => {
    return products.reduce((ids: string[], product) => {
      ids.push(product.id);
      product.variant?.forEach((variant) => {
        ids.push(variant.id);
      });
      return ids;
    }, []);
  };

  const getAllVariantIds = (variants: VariantCartType[]) => {
    let ids: string[] = [];
    variants?.forEach((variant) => {
      ids.push(variant.id);
    });
    return ids;
  };

  const getAllProductIds = (product: ProductCartType[]) => {
    let ids: string[] = [];
    product.forEach((variant) => {
      ids.push(variant.id);
    });
    return ids;
  };

  const handleCheckedSupplier = (
    e: ChangeEvent<HTMLInputElement>,
    ids: string[],
    supplier: SupplierCartType
  ) => {
    e.stopPropagation();
    const checkboxElements = document.querySelectorAll(
      'input[type="checkbox"]'
    );
    supplier = {
      ...supplier,
      is_tick: e.currentTarget.checked,
      product: supplier.product.map((product) => ({
        ...product,
        is_tick: e.currentTarget.checked,
        variant: product.variant.map((variant) => ({
          ...variant,
          is_tick: e.currentTarget.checked,
        })),
      })),
    };
    if (cart) {
      dispatch(
        setCart({
          ...cart,
          items: cart.items.map((item) => {
            if (item.id === supplier.id) {
              return {
                ...supplier,
              };
            } else {
              return item;
            }
          }),
        })
      );
    }

    const checkboxes = Array.from(checkboxElements);
    checkboxes.forEach((checkbox) => {
      if (ids.includes(checkbox.id)) {
        (checkbox as HTMLInputElement).checked = e.currentTarget.checked;
      }
    });
    tickAllCartItem({
      id: e.currentTarget.id,
      is_tick: e.currentTarget.checked,
    });
  };

  const handleCheckedProduct = (
    e: ChangeEvent<HTMLInputElement>,
    supplier: SupplierCartType,
    product: ProductCartType
  ) => {
    e.stopPropagation();
    tickCartItem({
      product_id: e.currentTarget.id,
      is_tick: e.currentTarget.checked,
    });
    supplier = {
      ...supplier,
      product: supplier.product.map((item) => {
        if (item.id == product.id) {
          return {
            ...item,
            is_tick: e.currentTarget.checked,
            variant: item.variant.map((variant) => ({
              ...variant,
              is_tick: e.currentTarget.checked,
            })),
          };
        } else {
          return item;
        }
      }),
    };
    if (cart) {
      dispatch(
        setCart({
          ...cart,
          items: cart.items.map((item) => {
            if (item.id === supplier.id) {
              return {
                ...supplier,
              };
            } else {
              return item;
            }
          }),
        })
      );
    }

    const checkboxElements = document.querySelectorAll(
      'input[type="checkbox"]'
    );
    const checkboxes = Array.from(checkboxElements);
    let allProductChecked = true;
    checkboxes.forEach((checkbox) => {
      if (
        getAllProductIds(supplier.product).includes(checkbox.id) &&
        checkbox.id !== product.id
      ) {
        if (!(checkbox as HTMLInputElement).checked) {
          allProductChecked = false;
        }
      }
    });

    checkboxes.forEach((checkbox) => {
      if (
        checkbox.id === supplier.id &&
        allProductChecked &&
        e.currentTarget.checked
      ) {
        (checkbox as HTMLInputElement).checked = true;
      } else if (checkbox.id === supplier.id && !e.currentTarget.checked) {
        (checkbox as HTMLInputElement).checked = false;
      }
      if (getAllVariantIds(product.variant).includes(checkbox.id)) {
        (checkbox as HTMLInputElement).checked = e.currentTarget.checked;
      }
    });
  };
  const handleCheckedVariant = (
    e: ChangeEvent<HTMLInputElement>,
    supplier: SupplierCartType,
    product: ProductCartType
  ) => {
    e.stopPropagation();
    supplier = {
      ...supplier,
      product: supplier.product.map((item) => {
        if (item.id == product.id) {
          return {
            ...item,
            variant: item.variant.map((variant) => {
              if (variant.id == e.currentTarget.id) {
                return {
                  ...variant,
                  is_tick: e.currentTarget.checked,
                };
              } else {
                return variant;
              }
            }),
          };
        } else {
          return item;
        }
      }),
    };
    if (cart) {
      dispatch(
        setCart({
          ...cart,
          items: cart.items.map((item) => {
            if (item.id === supplier.id) {
              return {
                ...supplier,
              };
            } else {
              return item;
            }
          }),
        })
      );
    }
    tickCartItem({
      product_id: product.id,
      variant_id: e.currentTarget.id,
      is_tick: e.currentTarget.checked,
    });
    const checkboxElements = document.querySelectorAll(
      'input[type="checkbox"]'
    );
    const checkboxes = Array.from(checkboxElements);
    let allVariantChecked = true;
    let allProductChecked = true;
    checkboxes.forEach((checkbox) => {
      if (
        getAllVariantIds(product.variant).includes(checkbox.id) &&
        checkbox.id !== e.currentTarget.id
      ) {
        if (!(checkbox as HTMLInputElement).checked) {
          allVariantChecked = false;
        }
      }
      if (
        getAllProductIds(supplier.product).includes(checkbox.id) &&
        checkbox.id !== product.id
      ) {
        if (!(checkbox as HTMLInputElement).checked) {
          allProductChecked = false;
        }
      }
    });
    checkboxes.forEach((checkbox) => {
      if (checkbox.id === product.id) {
        (checkbox as HTMLInputElement).checked =
          e.currentTarget.checked && allVariantChecked;
      }
      if (
        checkbox.id === supplier.id &&
        allVariantChecked &&
        allProductChecked &&
        e.currentTarget.checked
      ) {
        (checkbox as HTMLInputElement).checked = true;
      } else if (checkbox.id === supplier.id) {
        (checkbox as HTMLInputElement).checked = false;
      }
    });
  };

  const calculateSubTotal = () => {
    let subTotal = 0;
    cart?.items.forEach((supplier) => {
      supplier.product.forEach((product) => {
        product.variant.forEach((variant) => {
          if (variant.is_tick) {
            subTotal += variant.price * variant.quantity;
          }
        });
      });
    });
    return subTotal;
  };
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
      {cart && cart.total_items > 0 ? (
        <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
          <Box width={"66%"}>
            {cart?.items.map((supplier: SupplierCartType, indexSupplier) => {
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
                        handleOnCheck={(e: ChangeEvent<HTMLInputElement>) =>
                          handleCheckedSupplier(
                            e,
                            getAllProductIdsAndVariantIds(supplier.product),
                            supplier
                          )
                        }
                        defaultChecked={supplier.is_tick}
                      />
                      <Typography
                        fontFamily={theme.fontFamily.secondary}
                        fontWeight={theme.fontWeight.semiBold}
                      >
                        {supplier.name}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: "8px 6px 16px 16px" }}>
                    <Box
                      display={"flex"}
                      justifyContent={"space-between"}
                      pl={"40px"}
                      pr={"50px"}
                    >
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
                    {supplier.product.map(
                      (product: ProductCartType, indexProduct) => {
                        return (
                          <Box key={product.id}>
                            <CartItem
                              data={product}
                              handleOnCheck={(
                                e: ChangeEvent<HTMLInputElement>
                              ) => handleCheckedProduct(e, supplier, product)}
                              productId={product.id}
                              productSubTotal={product.subtotal}
                              rangePrice={product.range_price}
                              supplierId={supplier.id}
                            />
                            <Divider
                              sx={{ borderColor: theme.blue[100], mx: "40px" }}
                            />
                            {product.variant?.map((variant, indexVariant) => {
                              return (
                                <CartItem
                                  handleOnCheck={(
                                    e: ChangeEvent<HTMLInputElement>
                                  ) =>
                                    handleCheckedVariant(e, supplier, product)
                                  }
                                  data={variant}
                                  isVariant
                                  key={variant.id}
                                  productId={product.id}
                                  productSubTotal={product.subtotal}
                                  rangePrice={product.range_price}
                                  supplierId={supplier.id}
                                />
                              );
                            })}
                            {indexProduct !== 1 && (
                              <Divider sx={{ borderColor: theme.blue[100] }} />
                            )}
                          </Box>
                        );
                      }
                    )}
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
                Total: {cart.total_items} items
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
                <Typography
                  fontFamily={theme.fontFamily.secondary}
                  fontSize={14}
                >
                  Cart subtotal
                </Typography>
                <Typography
                  fontFamily={theme.fontFamily.secondary}
                  fontSize={14}
                >
                  {calculateSubTotal().toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Typography>
              </Box>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Typography
                  fontFamily={theme.fontFamily.secondary}
                  fontSize={14}
                >
                  Shipping fee
                </Typography>
                <Typography
                  fontFamily={theme.fontFamily.secondary}
                  fontSize={14}
                >
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
                  {(calculateSubTotal() + 100).toLocaleString("en-US", {
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
      ) : (
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={"20px"}
        >
          <Image src={CartEmpty} alt="cart empty" />
          <Typography fontFamily={theme.fontFamily.secondary}>
            Your cart is empty
          </Typography>
          <Typography fontFamily={theme.fontFamily.secondary}>
            Please refer to the products suggested by AdeptLink below!
          </Typography>
        </Box>
      )}
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
