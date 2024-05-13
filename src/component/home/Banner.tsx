"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactNode, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import SliderContent from "../common/SliderContent";
import useDevices from "@/hook/useDevices";
import { useGetAllBanner } from "@/api/banner/query";
import Image from "next/image";
import BannerImage from "@/assets/images/banner.jpg";
var settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 5000,
  appendDots: (dots: ReactNode) => <ul className="bottom-[-50px]">{dots}</ul>,
  customPaging: (i: number) => (
    <div
      style={{
        width: "8px",
        height: "8px",
        borderRadius: "50%",
        margin: "0 5px",
        backgroundColor: "#E6EFFB",
      }}
    ></div>
  ),
};

const Banner = () => {
  const { isMobile } = useDevices();
  const { getAllBanner, data } = useGetAllBanner();
  useEffect(() => {
    getAllBanner();
  }, []);
  const convertImage = (image: string | null) => {
    if (image) {
      if (
        image.includes("https://localhost:8000") &&
        process.env.NEXT_APP_API_URL
      ) {
        return image.replace(
          "https://localhost:8000",
          process.env.NEXT_APP_API_URL
        );
      } else if (process.env.NEXT_APP_API_URL) {
        return `${process.env.NEXT_APP_API_URL}/${image}`;
      }
    }
  };
  return (
    <Box
      sx={{
        height: "379px",
        "& .slick-list": {
          borderRadius: "8px",
        },
      }}
    >
      <SliderContent settings={settings}>
        {data &&
          data?.map((banner, index) => {
            return (
              <Box
                key={banner.id}
                sx={{
                  height: "379px",
                  width: "100%",
                  backgroundImage: `url("${convertImage(banner.image)}")`,
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  bgcolor: "#C9DEFF",
                  display: "flex!important",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                }}
              ></Box>
            );
          })}
        {!data &&
          Array(3)
            .fill(null)
            ?.map((banner, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    height: "379px",
                    width: "379px",
                    bgcolor: "#C9DEFF",
                    display: "flex!important",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: isMobile ? "80px" : "96px",
                      color: "white",
                      fontWeight: "700",
                    }}
                  >
                    BANNER
                  </Typography>
                </Box>
              );
            })}
      </SliderContent>
    </Box>
  );
};

export default Banner;
