"use client";
import { Box, Typography, useTheme } from "@mui/material";
import { FC, MouseEventHandler, ReactNode, useState } from "react";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import SliderContent from "../../common/SliderContent";
import Image from "next/image";
import Light from "@/assets/icons/light.svg";
import { MdArrowBackIos } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { RiArrowRightLine } from "react-icons/ri";
import CategoryItem from "./CategoryItem";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
const Category = () => {
  const PrevArrow: FC<ArrowProps> = ({ className, style, onClick }) => {
    return (
      <Box className={className} style={style} onClick={onClick}>
        <MdArrowBackIos size={36} color="#0C71BA" />
      </Box>
    );
  };

  // Component tùy chỉnh cho mũi tên sau
  const NextArrow: FC<ArrowProps> = ({ className, style, onClick }) => {
    return (
      <Box className={className} style={style} onClick={onClick}>
        <MdArrowForwardIos size={36} color="#0C71BA" />
      </Box>
    );
  };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
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
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 840,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const theme = useTheme();

  return (
    <Box sx={{ bgcolor: "transparent", mt: "60px" }}>
      <Typography
        fontWeight={theme.fontWeight.bold}
        fontSize={"20px"}
        lineHeight={"36.4px"}
        mb={"20px"}
        fontFamily={theme.fontFamily.secondary}
      >
        Category
      </Typography>
      <Box
        width={"100%"}
        px={4}
        sx={{
          "& .slick-arrow::before": {
            content: "none",
          },
        }}
      >
        <SliderContent settings={settings}>
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <CategoryItem key={index} />
            ))}
        </SliderContent>
      </Box>
    </Box>
  );
};

export default Category;
