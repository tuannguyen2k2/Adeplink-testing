"use client";
import DetailProduct1 from "@/assets/images/detailproduct_1.png";
import DetailProduct2 from "@/assets/images/detailproduct_2.jpg";
import DetailProduct3 from "@/assets/images/detailproduct_3.jpg";
import DetailProduct4 from "@/assets/images/detailproduct_4.jpg";
import DetailProduct5 from "@/assets/images/detailproduct_5.jpg";
import { Box } from "@mui/material";
import {
  FC,
  LegacyRef,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Image, { StaticImageData } from "next/image";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { Modal } from "antd";
import SliderContent from "@/component/common/SliderContent";
import { IoMdClose } from "react-icons/io";
const images = [
  { src: DetailProduct1, alt: "Image 1" },
  { src: DetailProduct2, alt: "Image 2" },
  { src: DetailProduct3, alt: "Image 3" },
  { src: DetailProduct4, alt: "Image 4" },
  { src: DetailProduct5, alt: "Image 5" },
  { src: DetailProduct5, alt: "Image 5" },
];
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  size?: number;
}
const SliderProduct = () => {
  const PrevArrow: FC<ArrowProps> = ({ className, style, onClick, size }) => {
    return (
      <Box className={className} style={style} onClick={onClick}>
        <MdArrowBackIos size={size} color="#0C71BA" />
      </Box>
    );
  };

  // Component tùy chỉnh cho mũi tên sau
  const NextArrow: FC<ArrowProps> = ({ className, style, onClick, size }) => {
    return (
      <Box className={className} style={style} onClick={onClick}>
        <MdArrowForwardIos size={size} color="#0C71BA" />
      </Box>
    );
  };

  const [openModal, setOpenModal] = useState(false);
  const [imageSelected, setImageSelected] = useState<number>(0);
  const [imageModalSelected, setImageModalSelected] = useState<number>(0);
  const singleSliderRef = useRef<Slider>(null);
  const settingSingleSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <PrevArrow size={36} />,
    nextArrow: <NextArrow size={36} />,
    initialSlide: imageModalSelected,
    afterChange: (index: number) => setImageModalSelected(index),
  };
  const settingMultipleSlider = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    prevArrow: <PrevArrow size={14} />,
    nextArrow: <NextArrow size={14} />,
    swipeToSlide: true,
    centerMode: true,
    centerPadding: "0px",

    // afterChange: (index: number) => setImageSelected(index),
  };
  const handleCancelModal = () => {
    setOpenModal(false);
  };

  const handleClickImage = (index: number) => {
    setOpenModal(true);
    setImageModalSelected(index);
  };

  useEffect(() => {
    if (singleSliderRef.current) {
      singleSliderRef.current.slickGoTo(imageModalSelected);
    }
  }, [imageModalSelected]);
  return (
    <Box
      width={"50%"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <Box width={"fit-content"} mb={"20px"}>
        <Box
          component={"button"}
          width={"fit-content"}
          height={623}
          onClick={() => handleClickImage(imageSelected)}
        >
          <Image
            src={images[imageSelected].src}
            alt={""}
            width={623}
            height={623}
            style={{ height: "100%" }}
          />
        </Box>
      </Box>
      <Box
        width={"84%"}
        sx={{
          "& .slick-arrow::before": {
            content: "none",
          },
          // "& .slick-slide": {
          //   opacity: 0.5,
          // },
          // "& .slick-current": {
          //   opacity: 1,
          // },
        }}
      >
        {/* <Box width={"100%"} display={"flex"} justifyContent={"center"}>
          {images.map((image, index) => {
            if (index === 5) {
              return;
            }
            return (
              <Box
                component={"button"}
                mx={"10px"}
                width={88}
                height={88}
                key={image.alt}
                onMouseEnter={() => setImageSelected(index)}
                onClick={() => handleClickImage(index)}
                sx={{
                  outline: "none",
                  opacity: index === imageSelected ? 1 : 0.5,
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={88}
                  height={88}
                  style={{ height: "100%" }}
                />
              </Box>
            );
          })}
        </Box> */}
        <SliderContent settings={settingMultipleSlider}>
          {images.map((image, index) => {
            return (
              <Box
                component={"button"}
                width={"100%"}
                height={88}
                key={image.alt}
                onClick={() => handleClickImage(index)}
                onMouseEnter={() => setImageSelected(index)}
                sx={{
                  display: "flex!important",
                  justifyContent: "center",
                  outline: "none",
                  opacity: index === imageSelected ? 1 : 0.5,
                }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={88}
                  height={88}
                  style={{ height: "100%" }}
                />
              </Box>
            );
          })}
        </SliderContent>
      </Box>
      <Modal
        footer={false}
        open={openModal}
        onCancel={handleCancelModal}
        style={{ left: -250 }}
        closeIcon={<IoMdClose size={30} color="black" />}
      >
        <Box
          width={1000}
          sx={{
            "& .slick-arrow::before": {
              content: "none",
            },
            "& .slick-slide > div:first-child": {
              display: "flex",
              justifyContent: "center",
            },
            "& .slick-prev": {
              left: "-31px",
            },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Slider
            {...settingSingleSlider}
            className="w-[80%] h-full"
            ref={singleSliderRef as LegacyRef<Slider>}
          >
            {images.map((image, index) => {
              return (
                <Box
                  width={623}
                  height={623}
                  key={index}
                  sx={{
                    display: "flex!important",
                    justifyContent: "center",
                    outline: "none",
                    width: "90%!important",
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={623}
                    height={623}
                    style={{ height: "100%" }}
                  />
                </Box>
              );
            })}
          </Slider>
          <Box width={"100%"} display={"flex"} justifyContent={"center"}>
            {images.map((image, index) => {
              return (
                <Box
                  component={"button"}
                  mx={"10px"}
                  width={88}
                  height={88}
                  key={image.alt}
                  onClick={() => handleClickImage(index)}
                  sx={{
                    outline: "none",
                    opacity: index === imageModalSelected ? 1 : 0.5,
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={88}
                    height={88}
                    style={{ height: "100%" }}
                  />
                </Box>
              );
            })}
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default SliderProduct;
