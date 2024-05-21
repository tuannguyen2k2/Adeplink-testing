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
import { convertImage } from "@/utils";
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
  const { getAllBanner, data } = useGetAllBanner();
  useEffect(() => {
    getAllBanner();
  }, []);

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
                  bgcolor: "#C9DEFF",
                  display: "flex!important",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                <Image
                  key={banner.id}
                  src={convertImage(banner.image) || BannerImage}
                  alt={banner.id}
                  width={1440}
                  height={379}
                  style={{
                    height: "379px",
                    width: "auto",
                    aspectRatio: "16/4",
                  }}
                />
              </Box>
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
                      fontSize: { xs: "80px", md: "96px" },
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
