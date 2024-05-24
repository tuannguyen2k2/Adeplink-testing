"use client";
import { Clear, KeyboardArrowLeft } from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  Icon,
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
import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";

type CartContactType = {
  openCart: boolean;
  handleOpenCart: () => void;
  handleCloseCart: () => void;
};

const CartContact = ({openCart, handleOpenCart, handleCloseCart}: CartContactType) => {
  const theme = useTheme();


  const data = [
    { id: 1, item: "Black, Paper, XL", price: 999, quantity: 1234 },
    { id: 2, item: "Black, Paper, XL", price: 999, quantity: 1234 },
    { id: 3, item: "Black, Paper, XL", price: 999, quantity: 1234 },
    { id: 4, item: "Black, Paper, XL", price: 999, quantity: 1234 },
    { id: 5, item: "Black, Paper, XL", price: 999, quantity: 1234 },
    { id: 1, item: "Black, Paper, XL", price: 999, quantity: 1234 },
    { id: 2, item: "Black, Paper, XL", price: 999, quantity: 1234 },
    { id: 3, item: "Black, Paper, XL", price: 999, quantity: 1234 },
    { id: 4, item: "Black, Paper, XL", price: 999, quantity: 1234 },
    { id: 5, item: "Black, Paper, XL", price: 999, quantity: 1234 },
    { id: 1, item: "Black, Paper, XL", price: 999, quantity: 1234 },
    { id: 2, item: "Black, Paper, XL", price: 999, quantity: 1234 },
    { id: 3, item: "Black, Paper, XL", price: 999, quantity: 1234 },
    { id: 4, item: "Black, Paper, XL", price: 999, quantity: 1234 },
    { id: 5, item: "Black, Paper, XL", price: 999, quantity: 1234 },
  ];

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          width: "fit-content",
          position: "fixed",
          right: 0,
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
            badgeContent={100}
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
      <Drawer open={openCart} anchor="right" onClose={handleCloseCart} sx={{}}>
        <Box sx={{ width: 542, borderTopLeftRadius: 16, px: 2, py: 3 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
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
              Total: 4 items
            </Typography>
          </Box>
          <Divider sx={{ mt: 2 }} />

          <Box>
            <TableContainer sx={{ height: `calc(100vh - 380px )` }}>
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
                <TableBody sx={{ height: 200, overflowY: "scroll" }}>
                  {data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell
                        sx={{
                          px: 0,
                          fontFamily: theme.fontFamily.secondary,
                          fontWeight: theme.fontWeight.regular,
                          fontSize: 14,
                        }}
                      >
                        {item.item}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          px: 0,
                          fontFamily: theme.fontFamily.secondary,
                          fontWeight: theme.fontWeight.regular,
                          fontSize: 14,
                        }}
                      >
                        ${item.price}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          px: 0,
                          fontFamily: theme.fontFamily.secondary,
                          fontWeight: theme.fontWeight.regular,
                          fontSize: 14,
                        }}
                      >
                        {item.quantity}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          px: 0,
                          fontFamily: theme.fontFamily.secondary,
                          fontWeight: theme.fontWeight.regular,
                          fontSize: 14,
                        }}
                      >
                        <Icon
                          component={Clear}
                          sx={{ color: theme.blue[600] }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box
            sx={{
              backgroundColor: "#F8FBFF",
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
        </Box>
      </Drawer>
    </>
  );
};

export default CartContact;
