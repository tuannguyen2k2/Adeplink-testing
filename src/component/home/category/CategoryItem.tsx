"use client";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { RiArrowRightLine } from "react-icons/ri";
import Light from "@/assets/icons/light.svg";
import { useState } from "react";
import { CategoryDto } from "@/interface/common";
import { convertImage } from "@/utils";
import NoImage from "@/assets/images/no-image.png";
import { useRouter } from "next-nprogress-bar";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
type CategoryItemType = {
  data?: CategoryDto;
};

const CategoryItem = ({ data }: CategoryItemType) => {
  const theme = useTheme();
  const [openArrowButton, setOpenArrowButton] = useState(false);
  const router = useRouter();
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
      onClick={() =>
        router.push(
          `${PRODUCT_PATH_URL.PRODUCT_LIST}?cate_level1_id=${
            data && data.id
          }&cate_name=${data && encodeURIComponent(data?.name)}`
        )
      }
    >
      <Box
        width={"280px"}
        mx={"10px"}
        height={"100%"}
        bgcolor={theme.blue[300]}
        borderRadius={"50px"}
        display={"flex"}
        flexDirection={"column"}
        // alignItems={"center"}
      >
        <Image
          src={convertImage(data?.image) || NoImage}
          alt="light"
          width={120}
          height={120}
          style={{ alignSelf: "center", marginTop: "60px", height: "120px" }}
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
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                overflow: "hidden",
              }}
            >
              {data?.name}
            </Typography>
            <Typography>{data?.supplier_count || 0} suppliers</Typography>
          </Box>
          <Box
            component={"button"}
            mb={"4%"}
            ml={"10px"}
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
