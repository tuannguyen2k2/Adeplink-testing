"use client";
import NoImage from "@/assets/images/no-image.png";
import SliderContent from "@/component/common/SliderContent";
import { ImageType } from "@/interface/common";
import { convertImage } from "@/utils";
import { Box } from "@mui/material";
import { Modal } from "antd";
import Image from "next/image";
import {
  FC,
  LegacyRef,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoMdClose } from "react-icons/io";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  size?: number;
}
const SliderProduct = ({ images }: { images?: ImageType[] }) => {
  const PrevArrow: FC<ArrowProps> = ({ className, style, onClick, size }) => {
    return (
      <Box className={className} style={style} onClick={onClick}>
        <MdArrowBackIos size={size} color="#0C71BA" />
      </Box>
    );
  };

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
            src={
              (images && convertImage(images[imageSelected]?.image_url)) ||
              NoImage
            }
            alt={""}
            width={623}
            height={623}
            style={{ height: "100%", borderRadius: "16px" }}
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
        {images && images.length > 0 && images.length < 6 && (
          <Box width={"100%"} display={"flex"} justifyContent={"center"}>
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
                  key={index}
                  onMouseEnter={() => setImageSelected(index)}
                  onClick={() => handleClickImage(index)}
                  sx={{
                    outline: "none",
                    opacity: index === imageSelected ? 1 : 0.5,
                  }}
                >
                  <Image
                    src={convertImage(image.image_url) || NoImage}
                    alt={"product image"}
                    width={88}
                    height={88}
                    style={{ height: "100%", borderRadius: "8px" }}
                  />
                </Box>
              );
            })}
          </Box>
        )}
        {images && images?.length > 5 && (
          <SliderContent settings={settingMultipleSlider}>
            {images?.map((image, index) => {
              return (
                <Box
                  component={"button"}
                  width={"100%"}
                  height={88}
                  key={image.id}
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
                    src={convertImage(image?.image_url) || NoImage}
                    alt={image?.id}
                    width={88}
                    height={88}
                    style={{ height: "100%", borderRadius: "8px" }}
                  />
                </Box>
              );
            })}
          </SliderContent>
        )}
      </Box>
      <Modal
        footer={false}
        open={openModal && images && images.length > 0}
        onCancel={handleCancelModal}
        style={{ left: -250 }}
        closeIcon={<IoMdClose size={30} color="black" />}
      >
        {images && (
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
            {images && images.length > 1 ? (
              <Slider
                {...settingSingleSlider}
                className="w-[80%] h-full"
                ref={singleSliderRef as LegacyRef<Slider>}
              >
                {images?.map((image, index) => {
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
                        borderRadius: "16px",
                      }}
                    >
                      <Image
                        src={convertImage(image?.image_url) || NoImage}
                        alt={image?.id}
                        width={623}
                        height={623}
                        style={{ height: "100%", borderRadius: "16px" }}
                      />
                    </Box>
                  );
                })}
              </Slider>
            ) : (
              <Box
                width={623}
                height={623}
                sx={{
                  display: "flex!important",
                  justifyContent: "center",
                  outline: "none",
                  width: "90%!important",
                }}
              >
                <Image
                  src={convertImage(images[0]?.image_url) || NoImage}
                  alt={images[0]?.id}
                  width={623}
                  height={623}
                  style={{ height: "100%", borderRadius: "16px" }}
                />
              </Box>
            )}
            <Box width={"100%"} display={"flex"} justifyContent={"center"}>
              {images?.map((image, index) => {
                return (
                  <Box
                    component={"button"}
                    mx={"10px"}
                    width={88}
                    height={88}
                    key={image.id}
                    onClick={() => handleClickImage(index)}
                    sx={{
                      outline: "none",
                      opacity: index === imageModalSelected ? 1 : 0.5,
                    }}
                  >
                    <Image
                      src={convertImage(image.image_url) || NoImage}
                      alt={image.id}
                      width={88}
                      height={88}
                      style={{ height: "100%", borderRadius: "8px" }}
                    />
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
      </Modal>
    </Box>
  );
};

export default SliderProduct;
