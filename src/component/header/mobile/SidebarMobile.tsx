"use client";
import { Badge, Box, Hidden, IconButton, Paper, useTheme } from "@mui/material";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineMessage, MdOutlineShoppingCart } from "react-icons/md";

const SidebarMobile = () => {
  const theme = useTheme();
  return (
    <Paper
      elevation={1}
      sx={{
        width: "100%",
        bgcolor: "common.white",
        position: "fixed",
        height: "60px",
        bottom: -1,
        p: "10px",
        display: "flex",
        zIndex: "1000",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <IconButton>
        <MdOutlineMessage size={24} color={"#0C71BA"} />
      </IconButton>
      <IconButton>
        <MdOutlineShoppingCart size={24} color={"#0C71BA"} />
      </IconButton>
      <IconButton>
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
          <IoMdNotificationsOutline size={24} color={"#0C71BA"} />
        </Badge>
      </IconButton>
    </Paper>
  );
};

export default SidebarMobile;
