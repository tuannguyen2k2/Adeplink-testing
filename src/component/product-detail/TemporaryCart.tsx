"use client";
import { ProductDetailDto, TemporaryCartType } from "@/interface/common";
import { Clear, KeyboardArrowLeft } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  Icon,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  tableCellClasses,
  useTheme,
} from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import QuantityComponent from "../common/QuantityComponent";

const TemporaryCart = ({
  openCart,
  handleCloseCart,
  handleOpenCart,
  data,
  temporaryCart,
  setTemporaryCart,
}: {
  temporaryCart: TemporaryCartType[];
  setTemporaryCart: Dispatch<SetStateAction<TemporaryCartType[]>>;
  data?: ProductDetailDto;
  openCart: boolean;
  handleCloseCart: () => void;
  handleOpenCart: () => void;
}) => {
  const theme = useTheme();
  let [totalPrice, setTotalPrice] = useState<number | null>(null);
  const getMatchingPriceByAmount = (amount: number) => {
    const sortedPriceList = data?.price.sort(
      (a, b) => parseInt(a.min_amount) - parseInt(b.min_amount)
    );
    const matchingPrice =
      sortedPriceList &&
      sortedPriceList?.find((item) => {
        return (
          amount >= parseInt(item.min_amount) &&
          amount <= parseInt(item.max_amount)
        );
      });
    return matchingPrice ? matchingPrice.price : null;
  };

  const handleDecreaseQuantity = (index: number) => {
    if (temporaryCart[index].orderQuantity - 1 < 0) {
      return;
    }
    temporaryCart[index].orderQuantity -= 1;
    let totalOrderQuantity = 0;
    temporaryCart.forEach((item) => {
      totalOrderQuantity += item.orderQuantity;
    });
    const matchingPrice = getMatchingPriceByAmount(totalOrderQuantity - 1);
    temporaryCart[0].unitPrice = matchingPrice ?? null;
    setTemporaryCart([...temporaryCart]);
  };
  const handleIncreaseQuantity = (index: number) => {
    temporaryCart[index].orderQuantity += 1;
    let totalOrderQuantity = 0;
    temporaryCart.forEach((item) => {
      totalOrderQuantity += item.orderQuantity;
    });
    const matchingPrice = getMatchingPriceByAmount(totalOrderQuantity + 1);
    temporaryCart[0].unitPrice = matchingPrice ?? null;
    setTemporaryCart([...temporaryCart]);
  };

  const handleOnChangeQuantityInput = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    temporaryCart[index].orderQuantity = parseInt(e.target.value);
    let totalOrderQuantity = 0;
    temporaryCart.forEach((item, indexTemporary) => {
      if (index !== indexTemporary) totalOrderQuantity += item.orderQuantity;
    });

    const matchingPrice = getMatchingPriceByAmount(
      totalOrderQuantity + parseInt(e.target.value)
    );
    temporaryCart[0].unitPrice = matchingPrice ?? null;
    setTemporaryCart([...temporaryCart]);
  };

  useEffect(() => {
    let totalQuantity = 0;
    temporaryCart.map((item) => {
      totalQuantity += item.orderQuantity;
    });
    const matchingPrice = getMatchingPriceByAmount(totalQuantity);

    matchingPrice
      ? setTotalPrice(parseFloat(matchingPrice) * totalQuantity)
      : setTotalPrice(null);
  }, [temporaryCart]);

  if (temporaryCart.length < 1) {
    return;
  }

  const handleDeleteItemCart = (index: number) => {
    const newTemporaryCart = [...temporaryCart];
    newTemporaryCart.splice(index, 1);
    setTemporaryCart(newTemporaryCart);
  };
  const revertNameVariant = (attributeCartTemporary: {
    [key: string]: string[];
  }) => {
    let name = "";
    Object.entries(attributeCartTemporary).map(([key, value], index) => {
      if (Object.keys(attributeCartTemporary).length - 1 == index) {
        name += `${value}`;
      } else {
        name += `${value}, `;
      }
    });
    return name;
  };
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "fit-content",
          position: "fixed",
          right: 0,
          top: "150px",
          borderRadius: "8px",
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        <Button
          sx={{ borderRadius: 0, p: "12px 16px 12px 16px" }}
          onClick={handleOpenCart}
        >
          <Badge
            badgeContent={temporaryCart.length}
            sx={{
              "& .MuiBadge-badge": {
                bgcolor: theme.red[100],
                color: "white",
                fontSize: "10px",
                p: 0,
              },
            }}
          >
            <MdOutlineShoppingCart size={24} color={"#0C71BA"} />
          </Badge>
        </Button>
      </Paper>
      <Drawer
        open={openCart}
        anchor="right"
        onClose={handleCloseCart}
        PaperProps={{
          sx: { borderTopLeftRadius: "16px", borderBottomLeftRadius: "16px" },
        }}
      >
        <Box sx={{ width: 600, px: 2, py: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: theme.fontWeight.semiBold,
                fontSize: 20,
                fontFamily: theme.fontFamily.secondary,
                "&:hover": {
                  cursor: "pointer",
                  textDecorationLine: "underline",
                },
              }}
              onClick={handleCloseCart}
            >
              <Icon component={KeyboardArrowLeft} sx={{ mr: 1 }} />
              Continue sourcing
            </Typography>
            <Typography
              sx={{
                fontWeight: theme.fontWeight.regular,
                fontSize: 14,
                fontFamily: theme.fontFamily.secondary,
                mr: 1,
              }}
            >
              Total: {temporaryCart.length} items
            </Typography>
          </Box>
          <Divider sx={{ mt: 2 }} />

          <Box>
            <TableContainer
              sx={{ height: `calc(100vh - 390px )`, overflowY: "scroll" }}
            >
              <Table
                stickyHeader
                sx={{
                  [`& .${tableCellClasses.root}`]: {
                    borderBottom: "none",
                  },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="left"
                      sx={{
                        px: 0,
                        fontFamily: theme.fontFamily.secondary,
                        fontWeight: theme.fontWeight.semiBold,
                        fontSize: 14,
                        width: "212px",
                      }}
                    >
                      Item
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{
                        px: 0,
                        fontFamily: theme.fontFamily.secondary,
                        fontWeight: theme.fontWeight.semiBold,
                        fontSize: 14,
                        width: "96px",
                      }}
                    >
                      Unit Price
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        px: 0,
                        fontFamily: theme.fontFamily.secondary,
                        fontWeight: theme.fontWeight.semiBold,
                        fontSize: 14,
                        width: "132px",
                      }}
                    >
                      Order Quantity
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        px: 0,
                        fontFamily: theme.fontFamily.secondary,
                        fontWeight: theme.fontWeight.semiBold,
                        fontSize: 14,
                        width: "20px",
                      }}
                    />
                  </TableRow>
                </TableHead>
                <TableBody>
                  {temporaryCart.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell
                        align="left"
                        component="th"
                        scope="row"
                        sx={{
                          px: 0,
                          fontFamily: theme.fontFamily.secondary,
                          fontWeight: theme.fontWeight.regular,
                          fontSize: 14,
                          color: "black",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3,
                          overflow: "hidden",
                          width: "212px",
                        }}
                      >
                        {item.name ||
                          revertNameVariant(item.attributeCartTemporary)}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          px: 0,
                          fontFamily: theme.fontFamily.secondary,
                          fontWeight: theme.fontWeight.regular,
                          fontSize: 14,
                          color: "black",
                        }}
                      >
                        {temporaryCart[0].unitPrice
                          ? `$${temporaryCart[0].unitPrice}`
                          : "To be negotiated"}
                      </TableCell>
                      <TableCell
                        sx={{
                          px: 0,
                          fontFamily: theme.fontFamily.secondary,
                          fontWeight: theme.fontWeight.regular,
                          fontSize: 14,
                          color: "black",
                          textAlign: "center",
                        }}
                      >
                        <Box
                          sx={{
                            height: 42,
                            width: 132,
                            display: "flex",
                            marginLeft: "28px",
                          }}
                        >
                          <QuantityComponent
                            quantity={item.orderQuantity}
                            handleDecreaseQuantity={() =>
                              handleDecreaseQuantity(index)
                            }
                            handleIncreaseQuantity={() =>
                              handleIncreaseQuantity(index)
                            }
                            handleOnChangeQuantityInput={(
                              e: ChangeEvent<HTMLInputElement>
                            ) => handleOnChangeQuantityInput(e, index)}
                          />
                        </Box>
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          px: 0,
                          fontFamily: theme.fontFamily.secondary,
                          fontWeight: theme.fontWeight.regular,
                          fontSize: 14,
                          color: "black",
                          pr: "6px",
                        }}
                      >
                        <IconButton onClick={() => handleDeleteItemCart(index)}>
                          <Icon
                            component={Clear}
                            sx={{ color: theme.blue[900] }}
                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {totalPrice ? (
            <Box
              sx={{
                backgroundColor: theme.blue[1100],
                padding: "16px",
                borderRadius: "8px",
              }}
            >
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography
                  sx={{
                    fontFamily: theme.fontFamily.secondary,
                    fontSize: 14,
                    fontWeight: theme.fontWeight.regular,
                    color: "black",
                  }}
                >
                  Item subtotal
                </Typography>
                <Typography
                  sx={{
                    fontFamily: theme.fontFamily.secondary,
                    fontSize: 14,
                    fontWeight: theme.fontWeight.regular,
                    color: "black",
                  }}
                >
                  {totalPrice.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography
                  sx={{
                    fontFamily: theme.fontFamily.secondary,
                    fontSize: 14,
                    fontWeight: theme.fontWeight.regular,
                    color: "black",
                  }}
                >
                  Shipping fee
                </Typography>
                <Typography
                  sx={{
                    fontFamily: theme.fontFamily.secondary,
                    fontSize: 14,
                    fontWeight: theme.fontWeight.regular,
                    color: "black",
                  }}
                >
                  $100.00
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
              >
                <Typography
                  sx={{
                    fontFamily: theme.fontFamily.secondary,
                    fontSize: 16,
                    fontWeight: theme.fontWeight.semiBold,
                  }}
                >
                  Subtotal
                </Typography>
                <Typography
                  sx={{
                    fontFamily: theme.fontFamily.secondary,
                    fontSize: 16,
                    fontWeight: theme.fontWeight.semiBold,
                  }}
                >
                  {(totalPrice + 100).toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </Typography>
              </Box>
              <Button
                sx={{
                  width: "100%",
                  bgcolor: `${theme.palette.primary.main}!important`,
                  color: "white",
                  borderRadius: "8px",
                  py: "12px",
                }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                backgroundColor: theme.blue[1100],
                padding: "16px",
                borderRadius: "8px",
              }}
            >
              <Typography
                sx={{
                  fontFamily: theme.fontFamily.secondary,
                  fontSize: 14,
                  fontWeight: theme.fontWeight.regular,
                  color: theme.palette.grey[400],
                }}
              >
                *A request for quotation will be send to this supplier and they
                will get in touch with your order soon!
              </Typography>

              <Box sx={{ my: 2 }}>
                <Typography
                  sx={{
                    fontFamily: theme.fontFamily.secondary,
                    fontSize: 14,
                    fontWeight: theme.fontWeight.regular,
                    color: "black",
                  }}
                >
                  Message
                </Typography>
                <TextField
                  multiline
                  minRows={4}
                  sx={{
                    border: "1px solid #E6EFFB",
                    width: "100%",
                    backgroundColor: "white",
                    borderRadius: "8px",
                  }}
                />
              </Box>

              <Button
                sx={{
                  width: "100%",
                  bgcolor: `${theme.palette.primary.main}!important`,
                  color: "white",
                  borderRadius: "8px",
                }}
              >
                Send Request for Quotation
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default TemporaryCart;
