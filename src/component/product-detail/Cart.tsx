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
  Typography,
  tableCellClasses,
  useTheme,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
import QuantityComponent from "../common/QuantityComponent";
const Cart = () => {
  const theme = useTheme();
  const [openCart, setOpenCart] = useState(false);

  const handleOpenCart = () => {
    setOpenCart(true);
  };

  const handleCloseCart = () => {
    setOpenCart(false);
  };

  const data = [
    { id: 1, item: "Black, Paper, XL", price: 999, quantity: 1234 },
    { id: 2, item: "Black, Paper, XS longlonglonglonglonglonglonglonglonglonglonglong ", price: 999, quantity: 1234 },
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
        <Button sx={{ borderRadius: 0, p: "12px 16px 12px 16px" }} onClick={handleOpenCart}>
          <Badge
            badgeContent={45}
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
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography
              sx={{
                fontWeight: theme.fontWeight.semiBold,
                fontSize: 20,
                fontFamily: theme.fontFamily.secondary,
                "&:hover": { cursor: "pointer", textDecorationLine: "underline" },
              }}
              onClick={handleCloseCart}
            >
              <Icon component={KeyboardArrowLeft} sx={{ mr: 1 }} />
              Continue sourcing
            </Typography>
            <Typography sx={{ fontWeight: theme.fontWeight.regular, fontSize: 14, fontFamily: theme.fontFamily.secondary, mr: 1 }}>Total: 4 items</Typography>
          </Box>
          <Divider sx={{ mt: 2 }} />

          <Box>
            <TableContainer sx={{ height: `calc(100vh - 300px )` }}>
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
                    <TableCell align="left" sx={{ px: 0, fontFamily: theme.fontFamily.secondary, fontWeight: theme.fontWeight.semiBold, fontSize: 14, width: "212px" }}>
                      Item
                    </TableCell>
                    <TableCell align="left" sx={{ px: 0, fontFamily: theme.fontFamily.secondary, fontWeight: theme.fontWeight.semiBold, fontSize: 14, width: "96px" }}>
                      Unit Price
                    </TableCell>
                    <TableCell align="center" sx={{ px: 0, fontFamily: theme.fontFamily.secondary, fontWeight: theme.fontWeight.semiBold, fontSize: 14, width: "132px" }}>
                      Order Quantity
                    </TableCell>
                    <TableCell align="center" sx={{ px: 0, fontFamily: theme.fontFamily.secondary, fontWeight: theme.fontWeight.semiBold, fontSize: 14, width: "20px" }} />
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
                          color: "black",
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3,
                          overflow: "hidden",
                          width: "212px",
                        }}
                      >
                        {item.item}
                      </TableCell>
                      <TableCell align="left" sx={{ px: 0, fontFamily: theme.fontFamily.secondary, fontWeight: theme.fontWeight.regular, fontSize: 14, color: "black" }}>
                        ${item.price}
                      </TableCell>
                      <TableCell align="center" sx={{ px: 0, fontFamily: theme.fontFamily.secondary, fontWeight: theme.fontWeight.regular, fontSize: 14, color: "black" }}>
                        <Box sx={{ height: 42, display: "flex" }}>
                          <QuantityComponent
                            quantity={item.quantity}
                            handleIncreaseQuantity={() => {}}
                            handleDecreaseQuantity={() => void {}}
                            handleOnChangeQuantityInput={() => {}}
                          />
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ px: 0, fontFamily: theme.fontFamily.secondary, fontWeight: theme.fontWeight.regular, fontSize: 14, color: "black" }}>
                        <Icon component={Clear} sx={{ color: theme.blue[600] }} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <Box sx={{ backgroundColor: "#F8FBFF", padding: "16px", borderRadius: "8px" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography sx={{ fontFamily: theme.fontFamily.secondary, fontSize: 14, fontWeight: theme.fontWeight.regular, color: "black" }}>Item subtotal</Typography>
              <Typography sx={{ fontFamily: theme.fontFamily.secondary, fontSize: 14, fontWeight: theme.fontWeight.regular, color: "black" }}>$999</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography sx={{ fontFamily: theme.fontFamily.secondary, fontSize: 14, fontWeight: theme.fontWeight.regular, color: "black" }}>Shipping fee</Typography>
              <Typography sx={{ fontFamily: theme.fontFamily.secondary, fontSize: 14, fontWeight: theme.fontWeight.regular, color: "black" }}>$999</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography sx={{ fontFamily: theme.fontFamily.secondary, fontSize: 16, fontWeight: theme.fontWeight.semiBold }}>Subtotal</Typography>
              <Typography sx={{ fontFamily: theme.fontFamily.secondary, fontSize: 16, fontWeight: theme.fontWeight.semiBold }}>$999</Typography>
            </Box>
            <Button sx={{ width: "100%", bgcolor: `${theme.palette.primary.main}!important`, color: "white", borderRadius: "8px" }}>Continue to order</Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Cart;
