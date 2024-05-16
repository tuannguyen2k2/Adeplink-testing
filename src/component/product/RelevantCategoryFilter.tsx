import { useClickOutside } from "@/hook/useClickOutside";
import Product2 from "@/assets/images/product2.jpg";
import {
  Box,
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  FC,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoMdSearch } from "react-icons/io";
import {
  MdArrowBackIos,
  MdArrowForwardIos,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";
import SliderContent from "../common/SliderContent";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
const categoryFake = [
  {
    id: 0,
    name: " cate level 2 cate level 2 cate level 2 cate level 2",
    children: [
      {
        name: "Agricultural Crops",
        children: [
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
        ],
      },
      {
        name: "Agricultural Crops",
        children: [
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
        ],
      },
      {
        name: "Agricultural Crops",
        children: [
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
        ],
      },
      {
        name: "Agricultural Crops",
        children: [
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
        ],
      },
      {
        name: "Agricultural Crops",
        children: [
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
        ],
      },
      {
        name: "Agricultural Crops",
        children: [
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
        ],
      },
      {
        name: "Agricultural Crops",
        children: [
          {
            name: "Lvl 3 cate name fdsfdsfdsfdsfds",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
        ],
      },
      {
        name: "Agricultural Crops",
        children: [
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
        ],
      },
    ],
  },
  {
    id: 1,
    name: "cate level 1",
    children: [
      {
        name: "Agricultural Crops",
        children: [
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
        ],
      },
      {
        name: "Agricultural Crops",
        children: [
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
        ],
      },
      {
        name: "Agricultural Crops",
        children: [
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
          {
            name: "Lvl 3 cate name",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "cate level 1",
    children: [],
  },
  {
    id: 3,
    name: "cate level 1",
    children: [],
  },
  {
    id: 4,
    name: "cate level 1",
    children: [],
  },
  {
    id: 5,
    name: "cate level 1",
    children: [],
  },
  {
    id: 6,
    name: "cate level 1",
    children: [],
  },
  {
    id: 7,
    name: "cate level 1",
    children: [],
  },
  {
    id: 8,
    name: "cate level 1",
    children: [],
  },
  {
    id: 9,
    name: "cate level 1",
    children: [],
  },
  {
    id: 10,
    name: "cate level 1",
    children: [],
  },
];
interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
  currentSlide?: number;
  slideCount?: number;
}
const PrevArrow: FC<ArrowProps> = ({
  className,
  style,
  onClick,
  currentSlide,
  slideCount,
}) => {
  useEffect(() => {
    const removeClonedElements = () => {
      const clonedElements = document.querySelectorAll(".slick-cloned");
      clonedElements.forEach((element) => element.remove());
    };
    if (slideCount === 1) removeClonedElements();
  }, []);
  if (slideCount === 1) {
    return;
  }
  const isDisabled = currentSlide === 0; // Check if it's the first slide

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (isDisabled) return; // If disabled, don't execute onClick
    onClick?.(event);
  };
  return (
    <Box className={className} style={style} onClick={handleClick}>
      <MdArrowBackIos size={36} color={isDisabled ? "#D1D5D6" : "#0C71BA"} />
    </Box>
  );
};

const NextArrow: FC<ArrowProps> = ({
  className,
  style,
  onClick,
  currentSlide,
  slideCount,
}) => {
  if (slideCount === 1) {
    return;
  }
  const isDisabled = slideCount && currentSlide === slideCount - 1;

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (event) => {
    if (isDisabled) return;
    onClick?.(event);
  };
  return (
    <Box className={className} style={style} onClick={handleClick}>
      <MdArrowForwardIos size={36} color={isDisabled ? "#D1D5D6" : "#0C71BA"} />
    </Box>
  );
};
const RelevantCategoryFilter = () => {
  const [categoryLevel2Hovered, setCategoryLevel2Hovered] =
    useState<number>(-1);
  const [categoryLevel2Selected, setCategoryLevel2Selected] =
    useState<number>(-1);
  const [categoryLevel3Selected, setCategoryLevel3Selected] = useState<
    number | null
  >();
  var settings = {
    dots: false,
    infinity: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    rows: 2,
    slidesPerRow: 5,
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
  const [isFocusInput, setIsFocusInput] = useState<boolean>(false);
  const [isFocusButtonRelevant, setIsFocusButtonRelevant] =
    useState<boolean>(false);
  const searchBoxRef = useRef<HTMLElement | null>(null);
  const handleClickOutSide = () => {
    setIsFocusInput(false);
  };
  useClickOutside(searchBoxRef, handleClickOutSide);

  const handleFocusInput = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsFocusInput(true);
  };
  return (
    <Box
      width={"100%"}
      p={"16px"}
      mb={"20px"}
      border={`1px solid ${theme.blue[100]}`}
      borderRadius={"16px"}
    >
      <Typography
        fontFamily={theme.fontFamily.secondary}
        fontWeight={theme.fontWeight.bold}
        fontSize={24}
        mb={"16px"}
      >
        Agriculture Crops
      </Typography>
      <Box
        width={"40%"}
        borderRadius={"8px"}
        display={"flex"}
        ref={searchBoxRef}
        alignItems={"center"}
        mb={"16px"}
        px={"16px"}
        border={
          isFocusInput
            ? `1px solid ${theme.palette.primary.main}`
            : `1px solid ${theme.palette.grey[100]}`
        }
      >
        <IoMdSearch size={24} color={"#0C71B9"} />
        <TextField
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              fontFamily: theme.fontFamily.secondary,
            },
          }}
          placeholder={"Search in Agriculture Crops"}
          onFocus={(e) => handleFocusInput(e)}
          InputProps={{
            sx: {
              input: {
                "&::placeholder": {
                  color: theme.palette.grey[400],
                },
                padding: "12px 0 12px 10px",
              },
            },
          }}
        />
      </Box>
      <Button
        onClick={() => setIsFocusButtonRelevant(!isFocusButtonRelevant)}
        sx={{
          bgcolor: "white",
          padding: "12px 12px 12px 16px",
          mb: "10px",
          color: "common.black",
          fontWeight: theme.fontWeight.regular,
          fontSize: 14,
          border: isFocusButtonRelevant
            ? `1px solid ${theme.palette.primary.main}`
            : `1px solid ${theme.palette.grey[100]}`,
          borderRadius: "8px",
          "&:hover": {
            bgcolor: "white",
          },
        }}
        endIcon={
          isFocusButtonRelevant ? (
            <MdKeyboardArrowUp color="#0C71B9" />
          ) : (
            <MdKeyboardArrowDown />
          )
        }
      >
        Explore other&nbsp;
        <Typography fontWeight={theme.fontWeight.medium} fontSize={14}>
          relevant categories
        </Typography>
      </Button>

      <Collapse
        in={isFocusButtonRelevant}
        sx={{
          width: "100%",
          "& .MuiCollapse-wrapperInner": { display: "flex" },
        }}
      >
        <List
          component="nav"
          sx={{
            width: "40%",
            p: 0,
            maxHeight: "281px",
            overflowY: "auto",
            ".Mui-selected": {
              bgcolor: "white!important",
            },
          }}
        >
          <Button
            sx={{
              pl: 2,
              bgcolor:
                -1 === categoryLevel2Selected
                  ? `${theme.blue[700]}!important`
                  : "white!important",
              width: "100%",
            }}
            // selected={-1 === categoryLevel2Hovered}
            onMouseEnter={() => setCategoryLevel2Hovered(-1)}
            onClick={() => setCategoryLevel2Selected(-1)}
          >
            <ListItemText
              primary={
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: 14,
                    fontWeight:
                      -1 === categoryLevel2Selected
                        ? theme.fontWeight.semiBold
                        : theme.fontWeight.regular,
                    fontFamily: theme.fontFamily.secondary,
                    color:
                      -1 === categoryLevel2Selected
                        ? theme.blue[500]
                        : theme.black[100],
                  }}
                >
                  All
                </Typography>
              }
            />
          </Button>
          {categoryFake?.map((categoryLevel2, index) => {
            return (
              <Button
                sx={{
                  width: "100%",
                  pl: 2,
                  bgcolor:
                    index === categoryLevel2Selected
                      ? `${theme.blue[700]}!important`
                      : "white!important",
                  "&:hover": {
                    bgcolor: "white",
                  },
                }}
                key={index}
                // selected={index === categoryLevel2Hovered}
                onMouseEnter={() => setCategoryLevel2Hovered(index)}
                onClick={() => setCategoryLevel2Selected(index)}
              >
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 1,
                        overflow: "hidden",
                        fontSize: 14,
                        textAlign: "start",
                        fontWeight:
                          index === categoryLevel2Selected
                            ? theme.fontWeight.semiBold
                            : theme.fontWeight.regular,
                        fontFamily: theme.fontFamily.secondary,
                        color:
                          index === categoryLevel2Selected
                            ? theme.blue[500]
                            : theme.black[100],
                      }}
                    >
                      {categoryLevel2.name}
                    </Typography>
                  }
                />
                <ListItemIcon sx={{ justifyContent: "end" }}>
                  <MdKeyboardArrowRight
                    color={
                      index === categoryLevel2Selected ? "#0C71BA" : "#3F4958"
                    }
                  />
                </ListItemIcon>
              </Button>
            );
          })}
        </List>
        <Box
          width={"70%"}
          mx={"40px"}
          sx={{
            "& .slick-arrow::before": {
              content: "none",
            },
            "& .slick-slider": {
              display: "flex!important",
              alignItems: "center",
            },
            "& .slick-slide": {
              display: "grid!important",
              gap: "32px",
            },
            "& .slick-list": {
              width: "100%",
            },
          }}
        >
          <SliderContent settings={settings}>
            {Array.from(Array(14)).map((_, index1) => {
              return (
                <Box key={index1} width={"20%!important"}>
                  <Box
                    key={index1}
                    width={"100%"}
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"center"}
                  >
                    <Box
                      component={"button"}
                      width={"90%"}
                      display={"flex"}
                      flexDirection={"column"}
                      alignItems={"center"}
                      sx={{ cursor: "pointer" }}
                      onClick={() => setCategoryLevel3Selected(index1)}
                    >
                      <Image src={Product2} alt="" width={88} height={88} />
                      <Typography
                        fontSize={14}
                        fontFamily={theme.fontFamily.secondary}
                        sx={{
                          bgcolor: categoryLevel3Selected === index1
                            ? theme.blue[700]
                            : "transparent",
                          color: categoryLevel3Selected === index1
                            ? theme.blue[500]
                            : "black",
                          fontWeight: categoryLevel3Selected === index1
                            ? theme.fontWeight.semiBold
                            : theme.fontWeight.regular,
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 2,
                          overflow: "hidden",
                        }}
                      >
                        Herbs & Spice Crops Herbs & Spice Crops Herbs & Spice
                        Crops
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </SliderContent>
        </Box>
      </Collapse>
    </Box>
  );
};

export default RelevantCategoryFilter;
