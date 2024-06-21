"use client";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
import { CategoriesHierarchyDto } from "@/interface/common";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useRouter } from "next-nprogress-bar";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdOutlineArrowRight } from "react-icons/md";

const useStyles = makeStyles({
  popover: {
    pointerEvents: "none",
  },
  popoverContent: {
    pointerEvents: "auto",
  },
});
type CategoryPopoverType = {
  data?: CategoriesHierarchyDto[];
};

const CategoryPopover = ({ data }: CategoryPopoverType) => {
  const theme = useTheme();
  const router = useRouter();
  const locale = Cookies.get("NEXT_LOCALE");
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  const translate = useTranslations();
  const [categoryLevel1Selected, setCategoryLevel1Selected] = useState<
    string | null
  >(data ? data[0]?.id : null);
  const [listCategoryLevel2, setListCategoryLevel2] = useState<
    CategoriesHierarchyDto[]
  >([]);
  const [openedPopover, setOpenedPopover] = useState(false);
  const popoverAnchor = useRef(null);

  const popoverEnter = () => {
    setOpenedPopover(true);
  };

  const popoverLeave = () => {
    setOpenedPopover(false);
  };

  useEffect(() => {
    data?.map((category) => {
      if (category.id === categoryLevel1Selected) {
        setListCategoryLevel2(category.child_categories);
      }
    });
  }, [categoryLevel1Selected]);

  return (
    <>
      <Box
        component={"button"}
        ref={popoverAnchor}
        aria-describedby={"category-popover"}
        fontWeight={theme.fontWeight.bold}
        fontFamily={theme.fontFamily.secondary}
        fontSize={12}
        color={openedPopover ? theme.blue[500] : theme.black[100]}
        textTransform={"uppercase"}
        pt={"8px"}
        pb={"7px"}
        sx={{
          "&:hover": {
            color: theme.blue[500],
          },
        }}
        onMouseEnter={popoverEnter}
        onMouseLeave={popoverLeave}
      >
        {translate("category")}
      </Box>
      <Popover
        className={classes.popover}
        classes={{
          paper: classes.popoverContent,
        }}
        id={"category-popover"}
        open={openedPopover}
        anchorEl={popoverAnchor.current}
        disableRestoreFocus
        hideBackdrop
        disableScrollLock
        PaperProps={{
          onMouseEnter: popoverEnter,
          onMouseLeave: popoverLeave,
          sx: {
            // top: "120px!important",
            width: "100vw",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box width={"100%"} display={"flex"} maxHeight={"100%"} p={2} pl={0}>
          <List
            component="nav"
            sx={{
              width: isMobile ? "60%" : "25%",
              p: 0,
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {data &&
              data?.length > 0 &&
              data?.map((categoryLevel1, index) => {
                return (
                  <ListItemButton
                    sx={{ pl: 2 }}
                    key={categoryLevel1.id}
                    selected={categoryLevel1.id === categoryLevel1Selected}
                    onMouseEnter={() =>
                      setCategoryLevel1Selected(categoryLevel1.id)
                    }
                    onClick={() =>
                      router.push(
                        `${PRODUCT_PATH_URL.PRODUCT_LIST}?cate_level1_id=${
                          categoryLevel1.id
                        }&cate_name=${encodeURIComponent(categoryLevel1?.name)}`
                      )
                    }
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight:
                              categoryLevel1.id === categoryLevel1Selected
                                ? theme.fontWeight.semiBold
                                : theme.fontWeight.regular,
                            fontFamily: theme.fontFamily.secondary,
                            color:
                              categoryLevel1.id === categoryLevel1Selected
                                ? theme.blue[500]
                                : theme.black[100],
                          }}
                        >
                          {categoryLevel1.name}
                        </Typography>
                      }
                    />
                  </ListItemButton>
                );
              })}
          </List>
          <Box width={"1px"} height={"auto"} bgcolor={theme.blue[100]} mx={2} />
          <Box
            display={"flex"}
            gap={4}
            sx={{
              maxHeight: "400px",
              overflow: "auto",
              width: "100%",
              maxWidth: "75%",
            }}
          >
            {listCategoryLevel2?.map(
              (categoryLevel2: CategoriesHierarchyDto) => {
                return (
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"start"}
                    key={categoryLevel2.id}
                  >
                    <Box display={"flex"} gap={0.5} alignItems={"center"}>
                      <Box
                        component={"button"}
                        fontSize={14}
                        fontFamily={theme.fontFamily.secondary}
                        fontWeight={theme.fontWeight.semiBold}
                        whiteSpace={"nowrap"}
                        onClick={() =>
                          router.push(
                            `${PRODUCT_PATH_URL.PRODUCT_LIST}?cate_level1_id=${
                              categoryLevel2.parent_category_id
                            }&cate_level2_id=${
                              categoryLevel2.id
                            }&cate_name=${encodeURIComponent(
                              categoryLevel2?.name
                            )}`
                          )
                        }
                      >
                        {categoryLevel2.name}
                      </Box>
                      <MdOutlineArrowRight size={18} />
                    </Box>
                    <List component="nav">
                      {categoryLevel2?.child_categories?.map(
                        (categoryLevel3: CategoriesHierarchyDto) => {
                          return (
                            <ListItemButton
                              key={categoryLevel3.id}
                              sx={{
                                pl: 0,
                                py: "4px",
                                maxWidth: "150px",
                                "&:hover": {
                                  bgcolor: "transparent",
                                },
                              }}
                              onClick={() =>
                                router.push(
                                  `${
                                    PRODUCT_PATH_URL.PRODUCT_LIST
                                  }?cate_level1_id=${
                                    categoryLevel2.parent_category_id
                                  }&cate_level2_id=${
                                    categoryLevel2.id
                                  }&cate_level3_id=${
                                    categoryLevel3.id
                                  }&cate_name=${encodeURIComponent(
                                    categoryLevel3?.name
                                  )}`
                                )
                              }
                            >
                              <ListItemText
                                primary={
                                  <Typography
                                    sx={{
                                      fontSize: 12,
                                      fontWeight: theme.fontWeight.regular,
                                      fontFamily: theme.fontFamily.secondary,
                                      color: theme.black[100],
                                      "&:hover": {
                                        color: theme.blue[500],
                                        fontWeight: theme.fontWeight.semiBold,
                                      },
                                    }}
                                  >
                                    {categoryLevel3.name}
                                  </Typography>
                                }
                              />
                            </ListItemButton>
                          );
                        }
                      )}
                    </List>
                  </Box>
                );
              }
            )}
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default CategoryPopover;
