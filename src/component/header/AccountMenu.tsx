"use client";
import { useLogout } from "@/api/auth/query";
import Avatar from "@/assets/images/avatar_user.png";
import { setUser } from "@/store/slice/accountSlice";
import { Box, Menu, MenuItem, Typography, useTheme } from "@mui/material";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SupplierSignUpModal from "../home/supplierRegister/SupplierSignUpModal";
import { userSelector } from "@/store/selector";

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
  const [openSupplierSignUpModal, setOpenSupplierSignUpModal] = useState(false);
  const theme = useTheme();
  const translate = useTranslations();
  const { logout } = useLogout();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const handleSignOut = async () => {
    logout();
    dispatch(setUser(null));
    Cookies.remove("user");
  };
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
            width: "250px",
            borderRadius: "8px",
          },
        }}
      >
        <Typography
          color={theme.black[300]}
          fontSize={14}
          fontWeight={theme.fontWeight.semiBold}
          fontFamily={theme.fontFamily.secondary}
          px={"26px"}
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
          }}
        >
          {translate("hi")},&nbsp;{user?.name}
        </Typography>
        <Box
          height={"1px"}
          width={"80%"}
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
              px: "26px",
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
              px: "26px",
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
              px: "26px",
            },
          ]}
        >
          {translate("messages")}
        </MenuItem>
        <Box
          height={"1px"}
          width={"80%"}
          bgcolor={theme.blue[600]}
          alignSelf={"center"}
          my={"4px"}
        />
        {user?.is_supplier ? (
          <>
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
                  px: "26px",
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
                  px: "26px",
                },
              ]}
            >
              {translate("myProducts")}
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              onClick={() => {
                setOpenSupplierSignUpModal(true);
                handleCloseMenu();
              }}
              sx={[
                {
                  "&:hover": {
                    bgcolor: theme.blue[700],
                  },
                  color: theme.black[300],
                  fontSize: 12,
                  fontWeight: theme.fontWeight.regular,
                  fontFamily: theme.fontFamily.secondary,
                  px: "26px",
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
          </>
        )}
        <Box
          height={"1px"}
          width={"80%"}
          bgcolor={theme.blue[600]}
          alignSelf={"center"}
          my={"4px"}
        />
        <MenuItem
          onClick={handleSignOut}
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
              px: "26px",
            },
          ]}
        >
          {translate("signOut")}
        </MenuItem>
      </Menu>
      <SupplierSignUpModal
        openSupplierSignUpModal={openSupplierSignUpModal}
        setOpenSupplierSignUpModal={setOpenSupplierSignUpModal}
      />
    </>
  );
};

export default AccountMenu;
