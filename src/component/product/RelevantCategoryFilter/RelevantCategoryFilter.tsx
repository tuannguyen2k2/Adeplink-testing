import { useClickOutside } from "@/hook/useClickOutside";
import Product2 from "@/assets/images/product2.jpg";
import {
  Box,
  Button,
  Collapse,
  Grid,
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
import SliderContent from "../../common/SliderContent";
import Image from "next/image";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetCategoriesChildren } from "@/api/category/query";
import { CategoriesHierarchyDto } from "@/interface/common";
import CategoryItemLevel3 from "./CategoryItemLevel3";
import Cookies from "js-cookie";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
import Search from "./Search";

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
  const searchParams = useSearchParams();
  const cate_level1_id = searchParams.get("cate_level1_id");
  const cate_level2_id = searchParams.get("cate_level2_id");
  const cate_level3_id = searchParams.get("cate_level3_id");
  const cate_name = searchParams.get("cate_name");
  const router = useRouter();
  const locale = Cookies.get("NEXT_LOCALE");
  const [categoryLevel2Hovered, setCategoryLevel2Hovered] =
    useState<string>("all");
  const [categoryLevel2Selected, setCategoryLevel2Selected] = useState<
    string | null
  >(cate_level2_id ?? "all");

  const [categoryLevel3List, setCategoryLevel3List] = useState<
    CategoriesHierarchyDto[]
  >([]);
  const { getCategoriesChildren, data, isSuccess } = useGetCategoriesChildren();

  const theme = useTheme();

  const [isFocusButtonRelevant, setIsFocusButtonRelevant] =
    useState<boolean>(false);

  useEffect(() => {
    if (cate_level2_id) {
      setCategoryLevel2Selected(cate_level2_id);
    } else {
      setCategoryLevel2Selected("all");
    }
  }, [cate_level2_id]);

  useEffect(() => {
    if (!cate_level2_id) {
      setCategoryLevel2Selected("all");
      setCategoryLevel3List([]);
    }
    cate_level1_id && getCategoriesChildren(cate_level1_id);
  }, [cate_level1_id]);

  useEffect(() => {
    if (isSuccess && cate_level2_id) {
      const cateLevel2 = data?.child_categories.find(
        (cateLevel2) => cateLevel2.id == cate_level2_id
      );
      if (cateLevel2) {
        setCategoryLevel3List(cateLevel2?.child_categories);
      }
    }
  }, [data, cate_level3_id]);

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
        {cate_name}
      </Typography>
      <Search />
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
            width: "20%",
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
                "all" === categoryLevel2Selected
                  ? `${theme.blue[700]}!important`
                  : "white!important",
              width: "100%",
            }}
            // selected={-1 === categoryLevel2Hovered}
            onMouseEnter={() => setCategoryLevel2Hovered("all")}
            onClick={() => {
              router.push(
                `${PRODUCT_PATH_URL.PRODUCT_LIST}?cate_level1_id=${cate_level1_id}&cate_name=${data?.name}`
              );
            }}
          >
            <ListItemText
              primary={
                <Typography
                  sx={{
                    textAlign: "start",
                    fontSize: 14,
                    fontWeight:
                      "all" === categoryLevel2Selected
                        ? theme.fontWeight.semiBold
                        : theme.fontWeight.regular,
                    fontFamily: theme.fontFamily.secondary,
                    color:
                      "all" === categoryLevel2Selected
                        ? theme.blue[500]
                        : theme.black[100],
                  }}
                >
                  All
                </Typography>
              }
            />
          </Button>
          {data?.child_categories?.map((categoryLevel2, index) => {
            return (
              <Button
                sx={{
                  width: "100%",
                  pl: 2,
                  bgcolor:
                    categoryLevel2.id === categoryLevel2Selected
                      ? `${theme.blue[700]}!important`
                      : "white!important",
                  "&:hover": {
                    bgcolor: "white",
                  },
                }}
                key={categoryLevel2.id}
                // selected={categoryLevel2.id === categoryLevel2Hovered}
                onMouseEnter={() => {
                  setCategoryLevel2Hovered(categoryLevel2.id);
                  setCategoryLevel3List(categoryLevel2.child_categories);
                }}
                onClick={() =>
                  router.push(
                    `${PRODUCT_PATH_URL.PRODUCT_LIST}?cate_level1_id=${categoryLevel2.parent_category_id}&cate_level2_id=${categoryLevel2.id}&cate_name=${categoryLevel2.name}`
                  )
                }
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
                          categoryLevel2.id === categoryLevel2Selected
                            ? theme.fontWeight.semiBold
                            : theme.fontWeight.regular,
                        fontFamily: theme.fontFamily.secondary,
                        color:
                          categoryLevel2.id === categoryLevel2Selected
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
                      categoryLevel2.id === categoryLevel2Selected
                        ? "#0C71BA"
                        : "#3F4958"
                    }
                  />
                </ListItemIcon>
              </Button>
            );
          })}
        </List>
        <Box
          width={"70%"}
          display={"flex"}
          alignItems={"center"}
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
          {categoryLevel3List.length <= 10 ? (
            <Box width={"100%"}>
              <Grid container spacing={10} width={"100%"} marginLeft={0}>
                {categoryLevel3List.map((categoryLevel3) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={12 / 5}
                    xl={12 / 5}
                    key={categoryLevel3.id}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      paddingLeft: "0!important",
                      paddingTop: "32px!important",
                    }}
                  >
                    <CategoryItemLevel3 categoryLevel3={categoryLevel3} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <SliderContent settings={settings}>
              {categoryLevel3List.map((categoryLevel3) => {
                return (
                  <Box key={categoryLevel3.id} width={"20%!important"}>
                    <CategoryItemLevel3 categoryLevel3={categoryLevel3} />
                  </Box>
                );
              })}
            </SliderContent>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

export default RelevantCategoryFilter;
