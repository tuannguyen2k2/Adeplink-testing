"use client";
import { useGetAllCategoryRoot } from "@/api/category/query";
import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import { FC, MouseEventHandler, ReactNode, useEffect } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import SliderContent from "../../common/SliderContent";
import CategoryItem from "./CategoryItem";

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
}
const Category = () => {
  const { getAllCategoryRoot, data } = useGetAllCategoryRoot();
  useEffect(() => {
    getAllCategoryRoot();
  }, []);
  console.log(data);
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
        {data && data?.length <= 4 && (
          <Box width={"100%"} display={"flex"}>
            {data?.map((category, index) => (
              <CategoryItem key={index} data={category} />
            ))}
          </Box>
        )}
        {data && data?.length > 4 && (
          <SliderContent settings={settings}>
            {data?.map((category, index) => (
              <CategoryItem key={index} data={category} />
            ))}
          </SliderContent>
        )}
        {!data && (
          <Box width={"100%"} display={"flex"}>
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={280}
                  height={280}
                  sx={{ mx: "10px", borderRadius: "50px" }}
                />
              ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Category;
