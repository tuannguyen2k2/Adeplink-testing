"use client";
import {
  Badge,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import { GrLanguage } from "react-icons/gr";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineMessage, MdOutlineShoppingCart } from "react-icons/md";
import Avatar from "@/assets/images/avatar_user.png";
import React from "react";
import { useTranslations } from "next-intl";

type AccountMenuType = {
  open: boolean;
  handleCloseMenu: () => void;
  handleOpenMenu: (event: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
};

const AccountMenu = ({
  open,
  handleCloseMenu,
  handleOpenMenu,
  anchorEl,
}: AccountMenuType) => {
  const theme = useTheme();
  const translate = useTranslations();
  return (
    <>
      <Box
        component={"button"}
        id="account-button"
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleOpenMenu}
      >
        <Image src={Avatar} alt="avatar" width={36} height={36} />
      </Box>
      <Menu
        disableScrollLock
        id="account-menu"
        aria-labelledby="account-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{
          p: "10px 16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "10px",
          top: "6px",
        }}
        MenuListProps={{
          sx: {
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Typography
          color={theme.black[300]}
          fontSize={14}
          fontWeight={theme.fontWeight.semiBold}
          fontFamily={theme.fontFamily.secondary}
          px={"16px"}
        >
          {translate("hi")},{/* Nguyen Van Quoc Tuan */}
          {translate("greeting")}
        </Typography>
        <Box
          height={"1px"}
          width={"90%"}
          bgcolor={theme.blue[600]}
          alignSelf={"center"}
          mt={1}
          mb={"4px"}
        />
        <MenuItem
          onClick={handleCloseMenu}
          sx={[
            {
              "&:hover": {
                fontWeight: theme.fontWeight.medium,
                bgcolor: theme.blue[700],
              },
              color: theme.black[300],
              fontSize: 12,
              fontWeight: theme.fontWeight.regular,
              fontFamily: theme.fontFamily.secondary,
            },
          ]}
        >
          {translate("myAccount")}
        </MenuItem>
        <MenuItem
          onClick={handleCloseMenu}
          sx={[
            {
              "&:hover": {
                fontWeight: theme.fontWeight.medium,
                bgcolor: theme.blue[700],
              },
              color: theme.black[300],
              fontSize: 12,
              fontWeight: theme.fontWeight.regular,
              fontFamily: theme.fontFamily.secondary,
            },
          ]}
        >
          {translate("order")}
        </MenuItem>
        <MenuItem
          onClick={handleCloseMenu}
          sx={[
            {
              "&:hover": {
                fontWeight: theme.fontWeight.medium,
                bgcolor: theme.blue[700],
              },
              color: theme.black[300],
              fontSize: 12,
              fontWeight: theme.fontWeight.regular,
              fontFamily: theme.fontFamily.secondary,
            },
          ]}
        >
          {translate("messages")}
        </MenuItem>
        <Box
          height={"1px"}
          width={"90%"}
          bgcolor={theme.blue[600]}
          alignSelf={"center"}
          my={"4px"}
        />
        {/* <MenuItem
          onClick={handleCloseMenu}
          sx={[
            {
              "&:hover": {
                fontWeight: theme.fontWeight.medium,
                bgcolor: theme.blue[700],
              },
              color: theme.black[300],
              fontSize: 12,
              fontWeight: theme.fontWeight.regular,
              fontFamily: theme.fontFamily.secondary,
            },
          ]}
        >
          {translate("businessProfile")}
        </MenuItem>
        <MenuItem
          onClick={handleCloseMenu}
          sx={[
            {
              "&:hover": {
                fontWeight: theme.fontWeight.medium,
                bgcolor: theme.blue[700],
              },
              color: theme.black[300],
              fontSize: 12,
              fontWeight: theme.fontWeight.regular,
              fontFamily: theme.fontFamily.secondary,
            },
          ]}
        >
          {translate("myProducts")}
        </MenuItem> */}
        <MenuItem
          onClick={handleCloseMenu}
          sx={[
            {
              "&:hover": {
                bgcolor: theme.blue[700],
              },
              color: theme.black[300],
              fontSize: 12,
              fontWeight: theme.fontWeight.regular,
              fontFamily: theme.fontFamily.secondary,
              display: "flex",
              alignItems: "end",
              lineHeight: "1.6",
            },
          ]}
        >
          {translate("customerAppeal1")}
          <Typography
            color={theme.palette.primary.main}
            sx={{
              fontSize: 12,
              fontWeight: theme.fontWeight.regular,
              whiteSpace: "pre-wrap",
            }}
          >
            {" "}
            {translate("supplier")}
          </Typography>
          {translate("customerAppeal2")}
          <Typography
            color={theme.palette.primary.main}
            sx={{
              fontSize: 12,
              fontWeight: theme.fontWeight.regular,
              whiteSpace: "pre-wrap",
            }}
          >
            {" "}
            {translate("free")}{" "}
          </Typography>
          {translate("now")}
          {"!"}
        </MenuItem>
        <Box
          height={"1px"}
          width={"90%"}
          bgcolor={theme.blue[600]}
          alignSelf={"center"}
          my={"4px"}
        />
        <MenuItem
          onClick={handleCloseMenu}
          sx={[
            {
              "&:hover": {
                fontWeight: theme.fontWeight.medium,
                bgcolor: theme.blue[700],
              },
              color: theme.black[300],
              fontSize: 12,
              fontWeight: theme.fontWeight.regular,
              fontFamily: theme.fontFamily.secondary,
            },
          ]}
        >
          {translate("signOut")}
        </MenuItem>
      </Menu>
    </>
  );
};

export default AccountMenu;
