"use client";
import { Badge, Box, Button, IconButton, useTheme } from "@mui/material";
import React from "react";
import { GrLanguage } from "react-icons/gr";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineMessage, MdOutlineShoppingCart } from "react-icons/md";
import AccountMenu from "./AccountMenu";
import Image from "next/image";
import User from "@/assets/icons/user.svg";
import { UserCircle } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";

const Personal = () => {
  const theme = useTheme();
  const translate = useTranslations();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box display={"flex"} alignItems={"center"} gap={1} height={"100%"}>
        <IconButton>
          <GrLanguage size={23} color={"#0C71BA"} />
        </IconButton>
        <IconButton>
          <MdOutlineMessage size={24} color={"#0C71BA"} />
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
        <IconButton>
          <MdOutlineShoppingCart size={24} color={"#0C71BA"} />
        </IconButton>
        <AccountMenu
          open={open}
          handleCloseMenu={handleCloseMenu}
          handleOpenMenu={handleOpenMenu}
          anchorEl={anchorEl}
        />
        {/* <Box
          display={"flex"}
          alignItems={"center"}
          gap={"20px"}
          height={"100%"}
        >
          <Box height={"24px"} width={"1px"} bgcolor={"common.white"} />
          <Box
            component={"button"}
            color={theme.blue[500]}
            fontWeight={theme.fontWeight.medium}
            fontFamily={theme.fontFamily.secondary}
          >
            {translate("signIn")}
          </Box>
          <Button
            sx={{
              bgcolor: `${theme.blue[500]}!important`,
              color: "common.white",
              display: "flex",
              alignItems: "center",
              gap: 1,
              borderRadius: "6px",
              height: "100%",
              px: "18px!important",
              fontFamily: theme.fontFamily.secondary,
            }}
          >
            <UserCircle size={24} />
            {translate("signUp")}
          </Button>
        </Box> */}
      </Box>
    </>
  );
};

export default Personal;
