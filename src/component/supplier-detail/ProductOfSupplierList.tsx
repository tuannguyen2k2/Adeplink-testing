import { Box, Menu, MenuItem, Pagination, Tooltip, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import ListProductComponent from "../common/show-list-product/ListProductComponent";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
import { CategoryDto, FilterProductDto, ProductDto } from "@/interface/common";
import { useQuery } from "@tanstack/react-query";
import { getProductByCategory } from "@/api/product/api";

const ProductOfSupplierList = ({ listCategory }: { listCategory: CategoryDto[] }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [categorySelected, setCategorySelected] = useState<string>("all");
  const [filterProduct, setFilterProduct] = useState<FilterProductDto>({ page: "1", limit: "10", product_category_id: "" });
  const open = Boolean(anchorEl);
  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const { data: productData } = useQuery({
    queryKey: ["product-category", filterProduct],
    queryFn: async () => await getProductByCategory(filterProduct).then((response) => response.products),
  });

  return (
    <Box width={"100%"} mt={"32px"}>
      <Box
        display={"flex"}
        // justifyContent={"space-between"}
        paddingBottom={"6px"}
        borderBottom={`2px solid ${theme.blue[1000]}`}
        mb={"24px"}
        py={"16px"}
      >
        <Box component={"button"} color={theme.blue[500]} onClick={() => setFilterProduct({ ...filterProduct, product_category_id: "" })} width={150}>
          <Typography
            sx={{
              fontFamily: theme.fontFamily.secondary,
              fontWeight: filterProduct.product_category_id == "" ? theme.fontWeight.semiBold : theme.fontWeight.regular,
              whiteSpace: "nowrap",
            }}
          >
            All Products
          </Typography>
        </Box>
        {listCategory?.slice(0, listCategory.length <= 5 ? 5 : 4).map((item, index) => {
          return (
            <CategoryTooltip
              key={item.id}
              item={item}
              categorySelected={filterProduct.product_category_id as string}
              setCategorySelected={(value) => setFilterProduct({ ...filterProduct, product_category_id: value as string })}
            />
          );
        })}
        {listCategory?.length > 5 && (
          <Box component={"button"} color={theme.blue[500]} display={"flex"} alignItems={"center"} gap={"8px"} onClick={handleOpenMenu} ml={"12px"}>
            <Typography
              sx={{
                fontFamily: theme.fontFamily.secondary,
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 1,
                overflow: "hidden",
              }}
            >
              More
            </Typography>
            <IoIosArrowDown color="#0C71B9" />
          </Box>
        )}
        <Menu
          disableScrollLock
          id="account-menu"
          aria-labelledby="account-button"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            p: "10px 16px",
            display: "flex",
            flexDirection: "column",

            alignItems: "center",
            top: "6px",
          }}
          PaperProps={{
            sx: {
              borderRadius: "8px!important",
            },
          }}
          MenuListProps={{
            sx: {
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            },
          }}
        >
          {listCategory?.slice(4).map((item) => {
            return (
              <MenuItem
                key={item.id}
                onClick={() => {
                  setFilterProduct({ ...filterProduct, product_category_id: item.id });
                  handleCloseMenu();
                }}
                selected={filterProduct.product_category_id == item.id}
              >
                <Typography
                  sx={{
                    fontWeight: filterProduct.product_category_id == item.id ? theme.fontWeight.semiBold : theme.fontWeight.regular,
                    color: theme.blue[500],
                    fontFamily: theme.fontFamily.secondary,
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                    overflow: "hidden",
                  }}
                >
                  {item.name}
                </Typography>
              </MenuItem>
            );
          })}
        </Menu>
      </Box>
      <Box width={"100%"} display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <ListProductComponent url={PRODUCT_PATH_URL.PRODUCT_LIST} data={productData as ProductDto[]} />
        <Pagination
          count={10}
          color="primary"
          shape="rounded"
          sx={{
            justifyContent: "center",
            mt: "20px",
            "& .Mui-selected": {
              borderRadius: "8px",
              bgcolor: theme.palette.primary.main,
              color: "white",
            },
          }}
          page={1}
          onChange={(e, page: number) => setFilterProduct({ ...filterProduct, page: String(page) })}
        />
      </Box>
    </Box>
  );
};

type CategoryTooltipType = {
  item: {
    name: string;
    id: string;
  };
  categorySelected: string;
  setCategorySelected: (value: React.SetStateAction<string>) => void;
};
const CategoryTooltip = ({ item, categorySelected, setCategorySelected }: CategoryTooltipType) => {
  const theme = useTheme();
  const nameRef = useRef<HTMLInputElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHover, setIsHover] = useState(false);
  useEffect(() => {
    if (nameRef.current) {
      const { offsetWidth, scrollWidth, scrollHeight, offsetHeight } = nameRef.current;
      if (scrollWidth > offsetWidth || scrollHeight > offsetHeight) {
        setShowTooltip(true);
      } else {
        setShowTooltip(false);
      }
    }
  }, [isHover]);
  return (
    <Box
      onClick={() => setCategorySelected(item.id)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      component={"button"}
      color={theme.blue[500]}
      key={item.id}
      mx={"12px"}
      width={210}
    >
      <Tooltip
        open={isHover && showTooltip}
        title={item.name}
        arrow={true}
        slotProps={{
          tooltip: {
            sx: {
              color: theme.blue[500],
              backgroundColor: theme.blue[100],
              p: "8px 12px",
              fontSize: 12,
              fontWeight: theme.fontWeight.regular,
            },
          },
          arrow: {
            sx: {
              color: theme.blue[100],
            },
          },
        }}
      >
        <Typography
          ref={nameRef}
          sx={{
            fontFamily: theme.fontFamily.secondary,
            fontWeight: categorySelected == item.id ? theme.fontWeight.semiBold : theme.fontWeight.regular,
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 1,
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          {item.name}
        </Typography>
      </Tooltip>
    </Box>
  );
};

export default ProductOfSupplierList;
