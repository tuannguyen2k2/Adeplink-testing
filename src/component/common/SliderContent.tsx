"use client";
import { ReactNode } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

type SettingsType = {
  dots?: boolean;
  infinite?: boolean;
  speed?: number;
  slidesToShow?: number;
  slidesToScroll?: number;
  appendDots?: (dots: ReactNode) => JSX.Element;
  customPaging?: (i: number) => JSX.Element;
  arrows?: boolean;
  prevArrow?: JSX.Element;
  nextArrow?: JSX.Element;
  autoplay?: boolean,
  autoplaySpeed?: number,
};

type SliderContentType = {
  children: ReactNode;
  settings: SettingsType;
  className?: string;
};

const SliderContent = ({
  children,
  settings,
  className = "w-full h-full",
}: SliderContentType) => {
  return (
    <Slider {...settings} className={className}>
      {children}
    </Slider>
  );
};

export default SliderContent;
