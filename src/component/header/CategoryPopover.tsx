"use client";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Popover,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import {
  AwaitedReactNode,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { MdOutlineArrowRight } from "react-icons/md";

const categoryFake = [
  {
    id: 0,
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

const CategoryPopover = () => {
  const theme = useTheme();
  const translate = useTranslations();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [categoryLevel1Selected, setCategoryLevel1Selected] = useState(0);
  const [listCategoryLevel2, setListCategoryLevel2] = useState<any>([]);
  const handleHover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "category-popover" : undefined;

  useEffect(() => {
    categoryFake.map((category) => {
      if (category.id === categoryLevel1Selected) {
        setListCategoryLevel2(category.children);
      }
    });
  }, [categoryLevel1Selected]);
  console.log(listCategoryLevel2);
  return (
    <>
      <Box
        component={"button"}
        aria-describedby={id}
        fontWeight={theme.fontWeight.bold}
        fontFamily={theme.fontFamily.secondary}
        fontSize={12}
        color={open ? theme.blue[500] : theme.black[100]}
        textTransform={"uppercase"}
        sx={{
          "&:hover": {
            color: theme.blue[500],
          },
        }}
        onMouseEnter={handleHover}
      >
        {translate("category")}
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        disableRestoreFocus
        hideBackdrop
        disableScrollLock
        PaperProps={{
          onMouseLeave: handleClose,
          sx: {
            top: "120px!important",
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
            sx={{ width: "25%", p: 0, maxHeight: "400px", overflowY: "auto" }}
          >
            {Array(10)
              .fill(null)
              .map((_, index) => {
                return (
                  <ListItemButton
                    sx={{ pl: 2 }}
                    key={index}
                    selected={index === categoryLevel1Selected}
                    onMouseEnter={() => setCategoryLevel1Selected(index)}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight:
                              index === categoryLevel1Selected
                                ? theme.fontWeight.semiBold
                                : theme.fontWeight.regular,
                            fontFamily: theme.fontFamily.secondary,
                            color:
                              index === categoryLevel1Selected
                                ? theme.blue[500]
                                : theme.black[100],
                          }}
                        >
                          Category level 1
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
              (
                categoryLevel2: { name: string; children: any },
                index1: number
              ) => {
                return (
                  <Box
                    display={"flex"}
                    flexDirection={"column"}
                    alignItems={"start"}
                    key={index1}
                  >
                    <Box display={"flex"} gap={0.5} alignItems={"center"}>
                      <Typography
                        fontSize={14}
                        fontFamily={theme.fontFamily.secondary}
                        fontWeight={theme.fontWeight.semiBold}
                        whiteSpace={"nowrap"}
                      >
                        {categoryLevel2.name}
                      </Typography>
                      <MdOutlineArrowRight size={18} />
                    </Box>
                    <List component="nav">
                      {categoryLevel2.children?.map(
                        (categoryLevel3: { name: string }, index2: number) => {
                          return (
                            <ListItemButton
                              key={index2}
                              sx={{ pl: 0, py: "4px", maxWidth: "150px" }}
                            >
                              <ListItemText
                                primary={
                                  <Typography
                                    sx={{
                                      fontSize: 12,
                                      fontWeight: theme.fontWeight.regular,
                                      fontFamily: theme.fontFamily.secondary,
                                      color: theme.black[100],
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
