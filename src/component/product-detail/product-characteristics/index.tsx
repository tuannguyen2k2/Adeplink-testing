import QuantityComponent from "@/component/common/QuantityComponent";
import { PriceType, ProductDto } from "@/interface/common";
import {
  Box,
  Button,
  Divider,
  Grid,
  Rating,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ChangeEvent, useEffect, useState } from "react";
import CartContact from "../CartContact";

const fakePrice = [
  {
    quantity: "1000 - 2000",
    price: "999",
  },
  {
    quantity: "2000 - 2500",
    price: "990",
  },
  {
    quantity: ">=2501",
    price: "990",
  },
  {
    quantity: "1000 - 2000",
    price: "999",
  },
  {
    quantity: "2000 - 2500",
    price: "990",
  },
  {
    quantity: ">=2501",
    price: "990",
  },
];

const fakeColor = [
  {
    name: "Black",
    code: "#000",
  },
  {
    name: "Blue",
    code: "rgba(12, 113, 186, 1)",
  },
  {
    name: "Yellow",
    code: "yellow",
  },
  {
    name: "white",
    code: "#fff",
  },
];

const fakePackage = [
  {
    name: "Value 1",
  },
  {
    name: "Value 2",
  },
  {
    name: "Value 3",
  },
  {
    name: "Value 4",
  },
  {
    name: "Value 5",
  },
  {
    name: "Value 6",
  },
  {
    name: "Value 7",
  },
  {
    name: "Value 8",
  },
  {
    name: "Value 9",
  },
  {
    name: "Value 10",
  },
  {
    name: "Paper",
  },
];

const fakeSize = [
  {
    name: "S",
  },
  {
    name: "L",
  },
  {
    name: "XS",
  },
  {
    name: "XL",
  },
];

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

const ProductCharacteristics = ({ data }: { data?: ProductDto }) => {
  const theme = useTheme();

  const [priceSelected, setPriceSelected] = useState<number | undefined>(1);
  const [colorSelected, setColorSelected] = useState(0);
  const [packageSelected, setPackageSelected] = useState({ name: "Value 1" });
  const [sizeSelected, setSizeSelected] = useState(0);
  const [orderQuantity, setOrderQuantity] = useState<number | undefined>();
  const [openCartContact, setOpenCartContact] = useState(false);

  const handleOpenCartContact = () => {
    setOpenCartContact(true);
  };

  const handleCloseCartContact = () => {
    setOpenCartContact(false);
  };
  useEffect(() => {
    if (data?.min_order) {
      setOrderQuantity(data.min_order);
    }
  }, [data]);

  useEffect(() => {
    let foundPrice = false;
    data?.price?.some((item, index) => {
      if (
        parseInt(item.min_amount) <= (orderQuantity as number) &&
        (orderQuantity as number) <= parseInt(item.max_amount)
      ) {
        setPriceSelected(index);
        foundPrice = true;
        return true;
      }
      return false;
    });
    if (!foundPrice) {
      setPriceSelected(undefined);
    }
  }, [orderQuantity]);

  const handleDecreaseQuantity = () => {
    if (orderQuantity) setOrderQuantity(orderQuantity - 1);
  };
  const handleIncreaseQuantity = () => {
    if (orderQuantity) setOrderQuantity(orderQuantity + 1);
  };

  const handleOnChangeQuantityInput = (e: ChangeEvent<HTMLInputElement>) => {
    setOrderQuantity(parseInt(e.target.value));
  };
  console.log(orderQuantity);
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
                        component={"button"}
                        onClick={() => setPriceSelected(index)}
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
              {packageSelected.name}
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
            {fakePackage.map((item, index) => {
              return (
                <Box
                  component={"button"}
                  key={index}
                  width={"fit-content"}
                  height={"fit-content"}
                  bgcolor={"white"}
                  p={"8px 12px"}
                  border={`1px solid ${
                    packageSelected.name === item.name
                      ? theme.palette.primary.main
                      : theme.blue[100]
                  }`}
                  borderRadius={"4px"}
                  onClick={() => setPackageSelected(item)}
                >
                  <Typography
                    fontFamily={theme.fontFamily.secondary}
                    fontSize={14}
                  >
                    {item.name}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
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
              {data?.variant_attributes?.size &&
                data?.variant_attributes?.size[sizeSelected]}
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
            <QuantityComponent
              quantity={orderQuantity}
              handleDecreaseQuantity={handleDecreaseQuantity}
              handleIncreaseQuantity={handleIncreaseQuantity}
              handleOnChangeQuantityInput={handleOnChangeQuantityInput}
            />
            <Button
              onClick={() => {
                !priceSelected && handleOpenCartContact();
              }}
              sx={{
                width: "100%",
                bgcolor: `${
                  data?.min_order &&
                  ((orderQuantity as number) < data?.min_order ||
                    isNaN(orderQuantity as number))
                    ? theme.blue[700]
                    : theme.palette.primary.main
                }!important`,
                color: "white",
                pointerEvents:
                  data?.min_order &&
                  ((orderQuantity as number) < data?.min_order ||
                    isNaN(orderQuantity as number))
                    ? "none"
                    : "auto",
                borderRadius: "8px",
                "&: hover": {
                  bgcolor: theme.palette.primary.main,
                },
              }}
            >
              {priceSelected ? "Add to cart" : "Contact"}
            </Button>
          </Box>
          {data?.min_order &&
            ((orderQuantity as number) < data?.min_order ||
              isNaN(orderQuantity as number)) && (
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
