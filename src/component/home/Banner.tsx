"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ReactNode, useState } from "react";
import { Box, Typography } from "@mui/material";
import SliderContent from "../common/SliderContent";
const Banner = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
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
        <Box
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
            sx={{ fontSize: "96px", color: "white", fontWeight: "700" }}
          >
            BANNER
          </Typography>
        </Box>
        <Box
          sx={{
            height: "379px",
            width: "379px",
            bgcolor: "#C9DEFF!important",
            display: "flex!important",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
          }}
        >
          <Typography
            sx={{ fontSize: "96px", color: "white", fontWeight: "700" }}
          >
            BANNER
          </Typography>
        </Box>
        <Box
          sx={{
            height: "379px",
            width: "379px",
            bgcolor: "#C9DEFF",
            display: "flex!important",
            fontWeight: "900",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
          }}
        >
          <Typography
            sx={{ fontSize: "96px", color: "white", fontWeight: "700" }}
          >
            BANNER
          </Typography>
        </Box>
      </SliderContent>
    </Box>
  );
};

export default Banner;
