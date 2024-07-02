"use client";

import Avatar from "@/assets/images/avatar_user.png";
import { Box, Divider, List, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { FaAngleDown } from "react-icons/fa6";
import SidebarItem from "./item";
import { ACCOUNT_SIDEBAR } from "@/constant/sidebar";

const SidebarAccount = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "258px" },
        paddingX: "16px",
        paddingY: "24px",
        borderRadius: "8px",
        height: "100%",
      }}
      className=" bg-white h-full "
    >
      <Box
        component={"button"}
        id="account-button"
        aria-haspopup="true"
        display={"flex"}
        gap={"8px"}
        alignItems={"center"}
        justifyContent={"space-between"}
        borderRadius={"8px"}
        sx={{
          "&:hover": {
            backgroundColor: "#F8FBFF",
          },
          width: "100%",
          padding: "8px",
          cursor: "pointer",
        }}
      >
        <Box display={"flex"} gap={"8px"} alignItems={"center"}>
          <Image
            src={Avatar}
            alt="avatar"
            width={36}
            height={36}
            className=" w-9 h-9 object-cover"
          />
          <Box textAlign={"left"}>
            <Typography
              color={theme.black.main}
              fontSize={12}
              fontWeight={theme.fontWeight.medium}
              fontFamily={theme.fontFamily.secondary}
            >
              Mai Trâm Anh
            </Typography>
            <Typography
              color={theme.palette.primary.main}
              fontSize={12}
              fontWeight={theme.fontWeight.medium}
              fontFamily={theme.fontFamily.secondary}
              sx={{
                backgroundColor: "#F0F6FF",
                padding: "4px",
                borderRadius: "4px",
                width: "max-content",
              }}
            >
              Buyer
            </Typography>
          </Box>
        </Box>

        <FaAngleDown color={theme.black.main} />
      </Box>

      <Divider
        sx={{
          borderColor: theme.blue[600],
          marginTop: "8px",
          marginBottom: "24px",
        }}
      />

      <List sx={{ color: theme.black.main }}>
        {ACCOUNT_SIDEBAR.map((item, index) => (
          <SidebarItem
            label={item.label}
            url={item.path}
            subItems={item.subItems}
            key={index}
          />
        ))}
      </List>
    </Box>
  );
};

export default SidebarAccount;
