import { useGetVariantChoose } from "@/api/product/query";
import QuantityComponent from "@/component/common/QuantityComponent";
import {
  ImageType,
  ProductDetailDto,
  TemporaryCartType,
} from "@/interface/common";
import {
  Box,
  Button,
  Divider,
  Grid,
  Rating,
  Typography,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useRouter } from "next-nprogress-bar";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import CartContact from "../CartContact";
import TemporaryCart from "../TemporaryCart";
import { useAddToCart, useGetCart } from "@/api/cart/query";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "@/store/slice/appSlice";
import { cartSelector, userSelector } from "@/store/selector";
import { AUTH_PATH_URL } from "@/constant/pathUrl";
import { isEqual } from "lodash";

const useStyles = makeStyles({
  root: {
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& .MuiInputBase-input": {
      fontFamily: '"Arial", sans-serif',
    },
  },
});

const ProductCharacteristics = ({
  data,
  setImagesSlider,
}: {
  data?: ProductDetailDto;
  setImagesSlider: Dispatch<SetStateAction<ImageType[] | undefined>>;
}) => {
  const theme = useTheme();
  const router = useRouter();
  const [priceSelected, setPriceSelected] = useState<number | undefined>(1);
  const [attributeSelected, setAttributeSelected] = useState<{
    [key: string]: string;
  }>({});
  const [orderQuantity, setOrderQuantity] = useState<string>("0");
  const [openCart, setOpenCart] = useState(false);
  const [temporaryCart, setTemporaryCart] = useState<TemporaryCartType[]>([]);
  const { addToCart, isSuccess: addToCartSuccess } = useAddToCart();
  const { getVariantChoose, data: dataVariant } = useGetVariantChoose();
  const { getCart, data: cartData, isSuccess: getCartSuccess } = useGetCart();
  const [color, setColor] = useState<{ name: string; code: string }[]>();
  const user = useSelector(userSelector);
  const [totalQuantityItemsTemporaryCart, setTotalQuantityItemsTemporaryCart] =
    useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    cartData && dispatch(setCart(cartData));
  }, [cartData, getCartSuccess]);

  useEffect(() => {
    if (data?.variant_attributes) {
      const colorParseArray: { name: string; code: string }[] = [];
      data?.variant_attributes?.color?.map((item, index) => {
        const colorParse = eval(`(${item})`) as {
          name: string;
          code: string;
        };
        colorParseArray.push(colorParse);
      });
      setColor(colorParseArray);
      let attributeSelectedDefault = {};
      Object.entries(data?.variant_attributes)?.map(([key, values]) => {
        if (key == "color") {
          attributeSelectedDefault = {
            ...attributeSelectedDefault,
            [key]: colorParseArray[0].name,
          };
        } else {
          attributeSelectedDefault = {
            ...attributeSelectedDefault,
            [key]: values[0],
          };
        }
      });
      setAttributeSelected(attributeSelectedDefault);
    }
  }, [data]);

  useEffect(() => {
    if (addToCartSuccess) {
      getCart();
    }
  }, [addToCartSuccess]);

  useEffect(() => {
    const choices: string[] = [];

    if (data?.variant_attributes) {
      Object.entries(attributeSelected).forEach(([key, value]) => {
        if (key == "color") {
          color?.forEach((item, index) => {
            if (item.name == value) {
              choices.push(data?.variant_attributes[key][index]);
            }
          });
        } else {
          choices.push(value);
        }
      });
      if (choices.length > 0)
        getVariantChoose({
          product_id: data?.id,
          choices: choices,
          moq: 1,
        });
    }
  }, [attributeSelected]);

  useEffect(() => {
    if (dataVariant?.images) {
      if (data && !data.image) {
        setImagesSlider([...dataVariant.images]);
      } else if (data && data.image) {
        setImagesSlider([...dataVariant.images, ...data?.image]);
      }
    }
  }, [dataVariant]);
  const handleOpenCart = () => {
    setOpenCart(true);
  };

  const handleCloseCart = () => {
    setOpenCart(false);
  };
  useEffect(() => {
    if (data?.min_order) {
      setOrderQuantity(data.min_order.toString());
    }
  }, [data]);
  const getMatchingPriceIndexByAmount = (amount: number) => {
    const sortedPriceList = data?.price.sort(
      (a, b) => parseInt(a.min_amount) - parseInt(b.min_amount)
    );
    const matchingPriceIndex =
      sortedPriceList &&
      sortedPriceList.findIndex((item) => {
        return (
          amount >= parseInt(item.min_amount) &&
          amount <= parseInt(item.max_amount)
        );
      });
    return matchingPriceIndex !== -1 ? matchingPriceIndex : -1;
  };

  useEffect(() => {
    if (data) {
      let totalQuantityTemporaryCart = 0;
      temporaryCart.map((item) => {
        totalQuantityTemporaryCart += item.orderQuantity;
      });
      setTotalQuantityItemsTemporaryCart(totalQuantityTemporaryCart);
      const matchingPriceIndex = getMatchingPriceIndexByAmount(
        totalQuantityTemporaryCart + +orderQuantity
      );
      matchingPriceIndex !== -1
        ? setPriceSelected(matchingPriceIndex)
        : setPriceSelected(undefined);
    }
  }, [orderQuantity, temporaryCart]);

  const handleDecreaseQuantity = () => {
    if (+orderQuantity > 0) setOrderQuantity((+orderQuantity - 1).toString());
  };
  const handleIncreaseQuantity = () => {
    if (orderQuantity) setOrderQuantity((+orderQuantity + 1).toString());
  };

  const handleOnChangeQuantityInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value.replace(/^0+/, ""));
    if (parseInt(value) > 0) {
      setOrderQuantity(value);
    } else {
      setOrderQuantity("0");
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      router.push(AUTH_PATH_URL.LOGIN);
      return;
    }
    if (!data) {
      return;
    }

    if (dataVariant?.variant) {
      addToCart({
        product_id: data.id,
        quantity: +orderQuantity,
        variant_id: dataVariant?.variant.id,
        min_order: data.min_order,
        price: data.price,
      });
    } else {
      addToCart({
        product_id: data.id,
        quantity: +orderQuantity,
        min_order: data.min_order,
        price: data.price,
      });
    }

    let attributeCartTemporary = {};

    attributeSelected &&
      Object.entries(attributeSelected).map(([key, index]) => {
        attributeCartTemporary = {
          ...attributeCartTemporary,
          [key]: attributeSelected[key],
        };
      });

    const dataCartItem = {
      name: JSON.stringify(data.variant_attributes) === "{}" ? data.name : "",
      attributeCartTemporary: attributeCartTemporary,
      orderQuantity: +orderQuantity,
      unitPrice:
        priceSelected !== undefined ? data.price[priceSelected].price : null,
    };
    if (temporaryCart) {
      let isDuplicate = false;
      temporaryCart.map((item) => {
        if (
          (JSON.stringify(data.variant_attributes) === "{}" &&
            item.name === dataCartItem.name) ||
          isEqual(
            item.attributeCartTemporary,
            dataCartItem.attributeCartTemporary
          )
        ) {
          isDuplicate = true;
          item.orderQuantity += dataCartItem.orderQuantity;
          item.unitPrice =
            priceSelected !== undefined
              ? data.price[priceSelected].price
              : null;
        }
        if (
          item.attributeCartTemporary == dataCartItem.attributeCartTemporary
        ) {
          item.orderQuantity += +dataCartItem.orderQuantity;
          item.unitPrice =
            priceSelected !== undefined
              ? data.price[priceSelected].price
              : null;
          isDuplicate = true;
          return;
        }
      });
      if (isDuplicate) {
        setTemporaryCart([...temporaryCart]);
      } else {
        setTemporaryCart([dataCartItem, ...temporaryCart]);
      }
    } else {
      setTemporaryCart([dataCartItem]);
    }
  };

  return (
    <Box width={"50%"}>
      <Box width={"100%"}>
        <Typography
          fontFamily={theme.fontFamily.secondary}
          fontWeight={theme.fontWeight.semiBold}
          fontSize={20}
          mb={"8px"}
        >
          {data?.name}
        </Typography>
        <Box display={"flex"} alignItems={"end"}>
          <Rating
            precision={0.1}
            size="small"
            sx={{ color: theme.yellow[100] }}
            value={5}
            readOnly
          />
          <Typography
            fontFamily={theme.fontFamily.secondary}
            fontWeight={theme.fontWeight.semiBold}
            fontSize={14}
            lineHeight={1.1}
            m={"0 4px 0 8px"}
          >
            5.0
          </Typography>
          <Typography
            fontFamily={theme.fontFamily.secondary}
            fontSize={14}
            lineHeight={1.1}
          >
            (24)
          </Typography>
        </Box>
      </Box>
      <Box
        width={"100%"}
        border={`1px solid ${theme.blue[100]}`}
        borderRadius={"16px"}
        boxShadow={
          "0 2px 4px rgba(240, 246, 255, 0.25), -2px 0 4px rgba(240, 246, 255, 0.25), 0 2px 4px rgba(240, 246, 255, 0.25)"
        }
        p={"20px"}
        mt={"8px"}
      >
        <Box width={"100%"}>
          {data && data?.price.length > 0 ? (
            <Grid
              container
              spacing={10}
              width={"100%"}
              marginLeft={0}
              mt={0}
              justifyContent={data?.price.length === 1 ? "center" : "start"}
            >
              {data?.price?.map((item, index) => {
                return (
                  <Grid
                    key={index}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={4}
                    xl={4}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      paddingLeft: "0!important",
                      paddingTop: index > 2 ? "20px!important" : "0!important",
                    }}
                  >
                    <Box>
                      <Box
                        display={"flex"}
                        flexDirection={"column"}
                        alignItems={"center"}
                        gap={"16px"}
                      >
                        <Typography
                          fontFamily={theme.fontFamily.secondary}
                          fontSize={14}
                          color={
                            index === priceSelected
                              ? theme.palette.primary.main
                              : theme.black[200]
                          }
                        >
                          {item.min_amount}&nbsp;-&nbsp;{item.max_amount}
                          &nbsp;items
                        </Typography>
                        <Typography
                          fontFamily={theme.fontFamily.secondary}
                          fontWeight={theme.fontWeight.semiBold}
                          fontSize={20}
                          color={
                            index === priceSelected
                              ? theme.palette.primary.main
                              : theme.black[200]
                          }
                        >
                          ${item.price}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Typography
              fontFamily={theme.fontFamily.secondary}
              fontWeight={theme.fontWeight.semiBold}
              fontSize={20}
              textAlign={"center"}
            >
              Contact supplier for best prices
            </Typography>
          )}
        </Box>
        {data?.variant_attributes &&
          Object.entries(data?.variant_attributes).map(([key, values]) => {
            if (key === "color") {
              return (
                <Box key={key}>
                  <Divider sx={{ borderColor: theme.blue[600], my: "20px" }} />
                  <Box width={"100%"}>
                    <Box display={"flex"} gap={"6px"} mb={"16px"}>
                      <Typography
                        fontFamily={theme.fontFamily.secondary}
                        fontSize={14}
                        color={theme.palette.grey[400]}
                      >
                        Color:&nbsp;
                      </Typography>
                      <Typography
                        fontFamily={theme.fontFamily.secondary}
                        fontWeight={theme.fontWeight.medium}
                        fontSize={14}
                        textTransform={"capitalize"}
                      >
                        {color && attributeSelected && attributeSelected[key]}
                      </Typography>
                    </Box>
                    <Box display={"flex"} gap={"16px"} flexWrap={"wrap"}>
                      {values.map((item, index) => {
                        const color = eval(`(${item})`) as {
                          name: string;
                          code: string;
                        };

                        return (
                          <Box
                            component={"button"}
                            key={index}
                            width={42}
                            height={42}
                            bgcolor={"white"}
                            p={"4px"}
                            border={`1px solid ${
                              color.name === attributeSelected?.[key]
                                ? theme.palette.primary.main
                                : theme.blue[100]
                            }`}
                            borderRadius={"4px"}
                            onClick={() =>
                              setAttributeSelected({
                                ...attributeSelected,
                                [key]: color.name,
                              })
                            }
                          >
                            <Box
                              bgcolor={color.code}
                              width={1}
                              height={1}
                              borderRadius={"2px"}
                            />
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              );
            }

            return (
              <Box key={key}>
                <Divider sx={{ borderColor: theme.blue[600], my: "20px" }} />
                <Box width={"100%"}>
                  <Box display={"flex"} gap={"6px"} mb={"16px"}>
                    <Typography
                      fontFamily={theme.fontFamily.secondary}
                      fontSize={14}
                      color={theme.palette.grey[400]}
                      textTransform={"capitalize"}
                    >
                      {key}:&nbsp;
                    </Typography>
                    <Typography
                      fontFamily={theme.fontFamily.secondary}
                      fontWeight={theme.fontWeight.medium}
                      fontSize={14}
                      textTransform={"capitalize"}
                    >
                      {attributeSelected && attributeSelected[key]}
                    </Typography>
                  </Box>
                  <Box
                    component={"div"}
                    display={"flex"}
                    gap={"16px"}
                    flexWrap={"wrap"}
                    maxHeight={"160px"}
                    overflow={"auto"}
                  >
                    {values.map((item, index) => {
                      return (
                        <Box
                          component={"button"}
                          key={index}
                          width={"fit-content"}
                          height={"fit-content"}
                          bgcolor={"white"}
                          p={"8px 12px"}
                          border={`1px solid ${
                            attributeSelected?.[key] === item
                              ? theme.palette.primary.main
                              : theme.blue[100]
                          }`}
                          borderRadius={"4px"}
                          onClick={() =>
                            setAttributeSelected({
                              ...attributeSelected,
                              [key]: item,
                            })
                          }
                        >
                          <Typography
                            fontFamily={theme.fontFamily.secondary}
                            fontSize={14}
                          >
                            {item}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </Box>
            );
          })}
        <Divider sx={{ borderColor: theme.blue[600], my: "20px" }} />
        <Box width={"100%"}>
          <Typography
            fontFamily={theme.fontFamily.secondary}
            fontSize={14}
            fontWeight={theme.fontWeight.medium}
            mb={"14px"}
          >
            Order Quantity
          </Typography>
          <Box display={"flex"} gap={"8px"} height={42} width={"100%"}>
            <Box width={"152px"}>
              <QuantityComponent
                quantity={+orderQuantity}
                handleDecreaseQuantity={handleDecreaseQuantity}
                handleIncreaseQuantity={handleIncreaseQuantity}
                handleOnChangeQuantityInput={handleOnChangeQuantityInput}
              />
            </Box>
            <Button
              onClick={handleAddToCart}
              sx={{
                width: "100%",
                bgcolor: `${
                  data?.min_order &&
                  +orderQuantity + totalQuantityItemsTemporaryCart <
                    data?.min_order
                    ? theme.blue[700]
                    : theme.palette.primary.main
                }!important`,
                color: "white",
                pointerEvents:
                  data?.min_order &&
                  +orderQuantity + totalQuantityItemsTemporaryCart <
                    data?.min_order
                    ? "none"
                    : "auto",
                borderRadius: "8px",
                "&: hover": {
                  bgcolor: theme.palette.primary.main,
                },
              }}
            >
              {"Add to cart"}
            </Button>
          </Box>
          {data?.min_order &&
            +orderQuantity + totalQuantityItemsTemporaryCart <
              data?.min_order && (
              <Typography
                fontFamily={theme.fontFamily.secondary}
                fontSize={14}
                fontWeight={theme.fontWeight.medium}
                color={theme.red[200]}
                fontStyle={"italic"}
                mb={"14px"}
              >
                Quantity must be higher than MOQ
              </Typography>
            )}
        </Box>
      </Box>
      <TemporaryCart
        temporaryCart={temporaryCart}
        setTemporaryCart={setTemporaryCart}
        openCart={openCart}
        handleCloseCart={handleCloseCart}
        handleOpenCart={handleOpenCart}
        data={data}
      />
    </Box>
  );
};

export default ProductCharacteristics;
