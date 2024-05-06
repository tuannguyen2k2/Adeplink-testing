"use client";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { RiArrowRightLine } from "react-icons/ri";
import Light from "@/assets/icons/light.svg";
import { useState } from "react";
const CategoryItem = () => {
  const theme = useTheme();
  const [openArrowButton, setOpenArrowButton] = useState(false);
  return (
    <Box
      component={"button"}
      sx={{
        height: "280px",
        display: "flex!important",
        alignItems: "center",
        justifyContent: "center",
      }}
      onMouseEnter={() => setOpenArrowButton(true)}
      onMouseLeave={() => setOpenArrowButton(false)}
    >
      <Box
        width={"280px"}
        m={"10px"}
        height={"100%"}
        bgcolor={theme.blue[300]}
        borderRadius={"50px"}
        display={"flex"}
        flexDirection={"column"}
        // alignItems={"center"}
      >
        <Image
          src={Light}
          alt="light"
          width={120}
          height={200}
          style={{ alignSelf: "center", marginTop: "60px" }}
        />
        <Box
          mx={"20px"}
          mt={3}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Box display={"flex"} flexDirection={"column"} alignItems={"start"}>
            <Typography
              color={theme.black[100]}
              fontWeight={theme.fontWeight.semiBold}
              fontSize={24}
            >
              Light
            </Typography>
            <Typography>20 suppliers</Typography>
          </Box>
          <Box
            component={"button"}
            mb={"4%"}
            p={"8px"}
            alignSelf={"end"}
            bgcolor={theme.blue[900]}
            width={"fit-content"}
            height={"fit-content"}
            borderRadius={"50%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
              opacity: openArrowButton ? 1 : 0,
              transition: "opacity 0.1s",
            }}
          >
            <RiArrowRightLine size={36} color="white" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryItem;
