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
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import CartContact from "../CartContact";
import Cookies from "js-cookie";
import { TEMPORARY_CART } from "@/constant/cookies";
import { useRouter } from "next-nprogress-bar";
import { usePathname } from "next/navigation";
import { useGetVariantChoose } from "@/api/product/query";

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
  setTemporaryCart,
  temporaryCart,
  setImagesSlider,
}: {
  data?: ProductDetailDto;
  temporaryCart: TemporaryCartType[];
  setTemporaryCart: Dispatch<SetStateAction<TemporaryCartType[]>>;
  setImagesSlider: Dispatch<SetStateAction<ImageType[] | undefined>>;
}) => {
  const theme = useTheme();
  const router = useRouter();
  const [priceSelected, setPriceSelected] = useState<number | undefined>(1);
  const [colorSelected, setColorSelected] = useState(0);
  const [packageSelected, setPackageSelected] = useState(0);
  const [sizeSelected, setSizeSelected] = useState(0);
  const [orderQuantity, setOrderQuantity] = useState<string>("0");
  const [openCartContact, setOpenCartContact] = useState(false);
  const { getVariantChoose, data: dataVariant } = useGetVariantChoose();
  useEffect(() => {
    if (
      data &&
      data.variant_attributes?.color &&
      data.variant_attributes?.size
    ) {
      getVariantChoose({
        product_id: data?.id,
        choices: [
          data.variant_attributes?.color[colorSelected],
          data.variant_attributes?.size[sizeSelected],
        ],
        moq: 1,
      });
    }
  }, [colorSelected, packageSelected, sizeSelected, orderQuantity]);

  useEffect(() => {
    if (dataVariant?.images && dataVariant?.images.length > 0) {
      setImagesSlider(dataVariant.images);
    }
  }, [dataVariant]);
  const handleOpenCartContact = () => {
    setOpenCartContact(true);
  };

  const handleCloseCartContact = () => {
    setOpenCartContact(false);
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

      const matchingPriceIndex = getMatchingPriceIndexByAmount(
        totalQuantityTemporaryCart + +orderQuantity
      );
      console.log(totalQuantityTemporaryCart + orderQuantity);
      console.log(matchingPriceIndex);
      matchingPriceIndex !== -1
        ? setPriceSelected(matchingPriceIndex)
        : setPriceSelected(undefined);
    }
  }, [orderQuantity, temporaryCart]);

  const handleDecreaseQuantity = () => {
    if (orderQuantity) setOrderQuantity((+orderQuantity - 1).toString());
  };
  const handleIncreaseQuantity = () => {
    if (orderQuantity) setOrderQuantity((+orderQuantity + 1).toString());
  };

  const handleOnChangeQuantityInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (parseInt(value) > 0) {
      setOrderQuantity(value.replace(/^0+/, ""));
    } else {
      setOrderQuantity("0");
    }
  };

  const handleAddToCart = () => {
    if (!data) {
      return;
    }
    const color =
      data.variant_attributes?.color &&
      (JSON.parse(
        data.variant_attributes?.color[colorSelected].split("'").join('"')
      ) as {
        name: string;
        code: string;
      });
    const dataCartItem = {
      color: color?.name,
      package:
        data.variant_attributes?.package &&
        data.variant_attributes?.package[packageSelected],
      size:
        data.variant_attributes?.size &&
        data.variant_attributes?.size[sizeSelected],
      orderQuantity: +orderQuantity,
      unitPrice:
        priceSelected !== undefined ? data.price[priceSelected].price : null,
    };

    if (temporaryCart) {
      let isDuplicateVariant = false;
      temporaryCart.map((item) => {
        if (
          item.color === dataCartItem.color &&
          item.package === dataCartItem.package &&
          item.size === dataCartItem.size
        ) {
          item.orderQuantity += +dataCartItem.orderQuantity;
          (item.unitPrice =
            priceSelected !== undefined
              ? data.price[priceSelected].price
              : null),
            (isDuplicateVariant = true);
          return;
        }
      });
      if (isDuplicateVariant) {
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
        {data?.variant_attributes?.color && (
          <>
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
                  {data?.variant_attributes?.color &&
                    JSON.parse(
                      data?.variant_attributes?.color[colorSelected]
                        .split("'")
                        .join('"')
                    ).name}
                </Typography>
              </Box>
              <Box display={"flex"} gap={"16px"} flexWrap={"wrap"}>
                {data?.variant_attributes?.color?.map((item, index) => {
                  const color = JSON.parse(item.split("'").join('"')) as {
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
                        index === colorSelected
                          ? theme.palette.primary.main
                          : theme.blue[100]
                      }`}
                      borderRadius={"4px"}
                      onClick={() => setColorSelected(index)}
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
          </>
        )}
        {data?.variant_attributes?.package && (
          <>
            <Divider sx={{ borderColor: theme.blue[600], my: "20px" }} />
            <Box width={"100%"}>
              <Box display={"flex"} gap={"6px"} mb={"16px"}>
                <Typography
                  fontFamily={theme.fontFamily.secondary}
                  fontSize={14}
                  color={theme.palette.grey[400]}
                >
                  Package:&nbsp;
                </Typography>
                <Typography
                  fontFamily={theme.fontFamily.secondary}
                  fontWeight={theme.fontWeight.medium}
                  fontSize={14}
                  textTransform={"capitalize"}
                >
                  {data?.variant_attributes?.package[sizeSelected]}
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
                {data?.variant_attributes?.package.map((item, index) => {
                  return (
                    <Box
                      component={"button"}
                      key={index}
                      width={"fit-content"}
                      height={"fit-content"}
                      bgcolor={"white"}
                      p={"8px 12px"}
                      border={`1px solid ${
                        packageSelected === index
                          ? theme.palette.primary.main
                          : theme.blue[100]
                      }`}
                      borderRadius={"4px"}
                      onClick={() => setPackageSelected(index)}
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
          </>
        )}
        {data?.variant_attributes?.size && (
          <>
            <Divider sx={{ borderColor: theme.blue[600], my: "20px" }} />
            <Box width={"100%"}>
              <Box display={"flex"} gap={"6px"} mb={"16px"}>
                <Typography
                  fontFamily={theme.fontFamily.secondary}
                  fontSize={14}
                  color={theme.palette.grey[400]}
                >
                  Size:&nbsp;
                </Typography>
                <Typography
                  fontFamily={theme.fontFamily.secondary}
                  fontWeight={theme.fontWeight.medium}
                  fontSize={14}
                  textTransform={"capitalize"}
                >
                  {data?.variant_attributes?.size[sizeSelected]}
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
                {data?.variant_attributes?.size?.map((item, index) => {
                  return (
                    <Box
                      component={"button"}
                      key={index}
                      width={"fit-content"}
                      height={"fit-content"}
                      bgcolor={"white"}
                      p={"8px 12px"}
                      border={`1px solid ${
                        sizeSelected === index
                          ? theme.palette.primary.main
                          : theme.blue[100]
                      }`}
                      borderRadius={"4px"}
                      onClick={() => setSizeSelected(index)}
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
          </>
        )}
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
                  data?.min_order && +orderQuantity < data?.min_order
                    ? theme.blue[700]
                    : theme.palette.primary.main
                }!important`,
                color: "white",
                pointerEvents:
                  data?.min_order && +orderQuantity < data?.min_order
                    ? "none"
                    : "auto",
                borderRadius: "8px",
                "&: hover": {
                  bgcolor: theme.palette.primary.main,
                },
              }}
            >
              {priceSelected == undefined ? "Contact" : "Add to cart"}
            </Button>
          </Box>
          {data?.min_order && +orderQuantity < data?.min_order && (
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
      <CartContact
        openCart={openCartContact}
        handleCloseCart={handleCloseCartContact}
        handleOpenCart={handleOpenCartContact}
      />
    </Box>
  );
};

export default ProductCharacteristics;
