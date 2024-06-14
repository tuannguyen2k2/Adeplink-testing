"use client";
import { useTickAllCartItem, useTickCartItem } from "@/api/cart/query";
import { useGetAllProductRecommended } from "@/api/product/query";
import CartEmpty from "@/assets/images/cart_empty.png";
import { MAX_WIDTH_APP } from "@/constant/css";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
import {
  ProductCartType,
  SupplierCartType,
  VariantCartType
} from "@/interface/common";
import { cartSelector } from "@/store/selector";
import { setCart } from "@/store/slice/appSlice";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Divider,
  Typography,
  useTheme
} from "@mui/material";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import { ChangeEvent, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import CheckboxComponent from "../CheckboxComponent";
import ListProductComponent from "../show-list-product/ListProductComponent";
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";

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
  const router = useRouter();

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
        variant:
          product.variant &&
          product.variant.map((variant) => ({
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
            variant:
              item.variant &&
              item.variant.map((variant) => ({
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
                let price = 0;
                product.range_price.map((range) => {
                  if (
                    +range.min_amount <= variant.quantity &&
                    +range.max_amount >= variant.quantity
                  ) {
                    price = +range.price;
                  }
                });
                return {
                  ...variant,
                  price,
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
                    fontFamily: theme.fontFamily.secondary,
                    boxShadow: "none",
                    border: `1px solid ${theme.blue[100]}`,
                    borderRadius: "8px!important",
                    "&.MuiAccordion-root::before": {
                      display: "none",
                    },
                    "&.MuiAccordion-root": {
                      mt: "16px!important",
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
          <OrderSummary />
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
