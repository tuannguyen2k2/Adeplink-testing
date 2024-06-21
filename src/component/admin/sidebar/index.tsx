"use client";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { NAVIGATION } from "@/constant/sidebar";
import logo from "@/assets/images/logo_admin.png";
import SidebarItem from "./SidebarItem";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { IoMdMenu } from "react-icons/io";

const drawerWidth = 282;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: "84px",
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const SidebarAdmin = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div onMouseEnter={handleDrawerOpen} onMouseLeave={handleDrawerClose}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        open={open}
        sx={{ "& .MuiPaper-root": { borderRight: "none" } }}
      >
        <DrawerHeader>
          {open ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                color={"#0B7ECA"}
                fontSize={24}
                fontWeight={theme.fontWeight.semiBold}
                fontFamily={theme.fontFamily.secondary}
                width={"200px"}
              >
                Adeptlink
              </Typography>
              <IconButton onClick={handleDrawerClose}>
                <IoMdMenu color="#0B7ECA" />
              </IconButton>
            </Box>
          ) : (
            <Image
              width={57}
              height={57}
              alt=""
              src={logo}
              className=" object-cover w-14 h-14"
            />
          )}
        </DrawerHeader>

        <List>
          {NAVIGATION.map((item, index) => (
            <SidebarItem
              label={item.label}
              ICon={item.Icon}
              url={item.path}
              open={open}
              key={index}
              subItems={item.subItems}
            />
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default SidebarAdmin;
