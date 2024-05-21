"use client";
import {
  Badge,
  Button,
  Container,
  Drawer,
  IconButton,
  Paper,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { MdOutlineShoppingCart } from "react-icons/md";
const Cart = () => {
  const theme = useTheme();
  const [openCart, setOpenCart] = useState(false);

  const handleOpenCart = () => {
    setOpenCart(true);
  };

  const handleCloseCart = () => {
    setOpenCart(false);
  };

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
      <Drawer open={openCart} anchor="right" onClose={handleCloseCart}>
        Content
      </Drawer>
    </>
  );
};

export default Cart;
