import { Box, Menu, MenuItem, Pagination, Tooltip, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import ListProductComponent from "../common/show-list-product/ListProductComponent";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
import { CategoryDto, FilterProductDto, ProductDto } from "@/interface/common";
import { useQuery } from "@tanstack/react-query";
import { getProductByCategory } from "@/api/product/api";

// const supplierProduct = [
//   {
//     name: "Fresh Red Chili pepper",
//     description: "Fresh Red Chili pepper",
//     unit: "string",
//     user_id: "4bec8330-ac21-48e8-8ca2-7ecbdaaa2f8b",
//     slug: "fresh-red-chili-pepper",
//     min_order: 2000,
//     category_id: "6cc706c2-b9a2-4d50-bd2a-017f767c1d20",
//     industry: "string",
//     min_order_unit: "1000",
//     price: [
//       {
//         min_amount: 100,
//         max_amount: 500,
//         price: 2000,
//       },
//       {
//         min_amount: 200,
//         max_amount: 600,
//         price: 4000,
//       },
//       {
//         min_amount: 200,
//         max_amount: 1000,
//         price: 6000,
//       },
//     ],
//     package: "string",
//     view: 0,
//     title: "string",
//     port: "string",
//     like: 0,
//     id: "22d3ed7f-c156-4156-9d1b-8c527b6e2903",
//     group: "string",
//     lead_time: "2024-05-21",
//     created_at: "2024-05-21T09:02:16.211571",
//     video: "string",
//     is_showcase: true,
//     updated_at: "2024-05-21T09:02:16.211574",
//     image: [],
//   },
//   {
//     name: "Fresh Onions Fast Shipping High Quality",
//     description: "Fresh Onions Fast Shipping High Quality",
//     unit: "string",
//     user_id: "4bec8330-ac21-48e8-8ca2-7ecbdaaa2f8b",
//     slug: "fresh-onions-fast-shipping-high-quality",
//     min_order: 2000,
//     category_id: "1414f972-79a9-472c-8621-c2b816b7902a",
//     industry: "string",
//     min_order_unit: "1000",
//     price: [
//       {
//         min_amount: 100,
//         max_amount: 500,
//         price: 6000,
//       },
//       {
//         min_amount: 400,
//         max_amount: 600,
//         price: 8000,
//       },
//       {
//         min_amount: 400,
//         max_amount: 1200,
//         price: 10000,
//       },
//     ],
//     package: "string",
//     view: 0,
//     title: "string",
//     port: "string",
//     like: 0,
//     id: "29b89cab-06bf-496a-95ce-9ca0a2d008bc",
//     group: "string",
//     lead_time: "2024-05-21",
//     created_at: "2024-05-21T09:21:00.218890",
//     video: "string",
//     is_showcase: true,
//     updated_at: "2024-05-21T09:21:00.218893",
//     image: [],
//   },
//   {
//     name: "Fresh Brown Light Gingers",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Sem integer vitae justo eget. Diam vel quam elementum pulvinar. Fringilla urna porttitor rhoncus dolor purus. Scelerisque viverra mauris in aliquam sem. Urna porttitor rhoncus dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Sem integer vitae justo eget. Diam vel quam elementum pulvinar. Fringilla urna porttitor rhoncus dolor purus. Scelerisque viverra mauris in aliquam sem. Urna porttitor rhoncus dolor ",
//     unit: "string",
//     user_id: "4bec8330-ac21-48e8-8ca2-7ecbdaaa2f8b",
//     slug: "fresh-brown-light-gingers",
//     min_order: 500,
//     category_id: "98b2dfa6-6f5e-4699-9803-48e081899111",
//     industry: "string",
//     min_order_unit: "50",
//     price: [
//       {
//         min_amount: 50,
//         max_amount: 100,
//         price: 60,
//       },
//     ],
//     package: "string",
//     view: 0,
//     title: "string",
//     port: "string",
//     like: 0,
//     id: "3fd928c8-f415-49c5-87ba-0ebd45a21aa0",
//     group: "string",
//     lead_time: "2024-05-20",
//     created_at: "2024-05-20T13:19:26.929915",
//     video: "string",
//     is_showcase: true,
//     updated_at: "2024-05-20T13:19:26.929919",
//     image: [
//       {
//         id: "bdb2cf84-a286-4b3c-a441-718e59087fd3",
//         url: "https://localhost:8000/uploads/Product/PRO-1716138000.0-ginger1-0754256001632461047-150-jpg.jpg",
//       },
//     ],
//   },
//   {
//     name: "GARLIC",
//     description: "ORGANIC ONION/RED/YELLOW/WHITE",
//     unit: "string",
//     user_id: "4bec8330-ac21-48e8-8ca2-7ecbdaaa2f8b",
//     slug: "garlic",
//     min_order: 2000,
//     category_id: "0e237881-7781-4649-9132-1c5670d5cd3c",
//     industry: "string",
//     min_order_unit: "1000",
//     price: [
//       {
//         min_amount: 100,
//         max_amount: 500,
//         price: 6000,
//       },
//       {
//         min_amount: 400,
//         max_amount: 600,
//         price: 8000,
//       },
//       {
//         min_amount: 400,
//         max_amount: 1200,
//         price: 10000,
//       },
//     ],
//     package: "string",
//     view: 0,
//     title: "string",
//     port: "string",
//     like: 0,
//     id: "5740b098-0268-4a7b-af75-8f7d74778775",
//     group: "string",
//     lead_time: "2024-05-21",
//     created_at: "2024-05-21T09:17:29.420852",
//     video: "string",
//     is_showcase: true,
//     updated_at: "2024-05-21T09:17:29.420856",
//     image: [],
//   },
//   {
//     name: "Fresh Vegetables (Cabbage, Cucumber, Eggplant, Pumpkins, Okra, Taro, Cassava)",
//     description: "Fresh Vegetables (Cabbage, Cucumber, Eggplant, Pumpkins, Okra, Taro, Cassava)",
//     unit: "string",
//     user_id: "4bec8330-ac21-48e8-8ca2-7ecbdaaa2f8b",
//     slug: "fresh-vegetables-cabbage-cucumber-eggplant-pumpkins-okra-taro-cassava",
//     min_order: 2000,
//     category_id: "6cc706c2-b9a2-4d50-bd2a-017f767c1d20",
//     industry: "string",
//     min_order_unit: "1000",
//     price: [
//       {
//         min_amount: 100,
//         max_amount: 500,
//         price: 6000,
//       },
//       {
//         min_amount: 400,
//         max_amount: 600,
//         price: 8000,
//       },
//       {
//         min_amount: 400,
//         max_amount: 1200,
//         price: 10000,
//       },
//     ],
//     package: "string",
//     view: 0,
//     title: "string",
//     port: "string",
//     like: 0,
//     id: "7012fc04-3130-4c6e-86a9-0ab2521b4487",
//     group: "string",
//     lead_time: "2024-05-21",
//     created_at: "2024-05-21T09:05:39.889338",
//     video: "string",
//     is_showcase: true,
//     updated_at: "2024-05-21T09:05:39.889341",
//     image: [],
//   },
//   {
//     name: "High Quality 100% Natural Product Cheap Price Professional Export Wholesale Fresh Potato",
//     description: "High Quality 100% Natural Product Cheap Price Professional Export Wholesale Fresh Potato",
//     unit: "string",
//     user_id: "4bec8330-ac21-48e8-8ca2-7ecbdaaa2f8b",
//     slug: "high-quality-100-natural-product-cheap-price-professional-export-wholesale-fresh-potato",
//     min_order: 2000,
//     category_id: "1414f972-79a9-472c-8621-c2b816b7902a",
//     industry: "string",
//     min_order_unit: "1000",
//     price: [
//       {
//         min_amount: 100,
//         max_amount: 500,
//         price: 6000,
//       },
//       {
//         min_amount: 400,
//         max_amount: 600,
//         price: 8000,
//       },
//       {
//         min_amount: 400,
//         max_amount: 1200,
//         price: 10000,
//       },
//     ],
//     package: "string",
//     view: 0,
//     title: "string",
//     port: "string",
//     like: 0,
//     id: "7be461dd-58be-4639-8ab2-22bf122bbdf3",
//     group: "string",
//     lead_time: "2024-05-21",
//     created_at: "2024-05-21T09:19:02.982180",
//     video: "string",
//     is_showcase: true,
//     updated_at: "2024-05-21T09:19:02.982182",
//     image: [],
//   },
//   {
//     name: "Buy New Ginger Fresh Wholesale Supplier",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Sem integer vitae justo eget. Diam vel quam elementum pulvinar. Fringilla urna porttitor rhoncus dolor purus. Scelerisque viverra mauris in aliquam sem. Urna porttitor rhoncus dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Sem integer vitae justo eget. Diam vel quam elementum pulvinar. Fringilla urna porttitor rhoncus dolor purus. Scelerisque viverra mauris in aliquam sem. Urna porttitor rhoncus dolor ",
//     unit: "string",
//     user_id: "4bec8330-ac21-48e8-8ca2-7ecbdaaa2f8b",
//     slug: "buy-new-ginger-fresh-wholesale-supplier",
//     min_order: 1200,
//     category_id: "98b2dfa6-6f5e-4699-9803-48e081899111",
//     industry: "string",
//     min_order_unit: "50",
//     price: [
//       {
//         min_amount: 50,
//         max_amount: 100,
//         price: 80,
//       },
//       {
//         min_amount: 200,
//         max_amount: 400,
//         price: 1000,
//       },
//     ],
//     package: "string",
//     view: 0,
//     title: "string",
//     port: "string",
//     like: 0,
//     id: "8bae2761-fe51-4ca1-a5df-7664b0b32f9f",
//     group: "string",
//     lead_time: "2024-05-20",
//     created_at: "2024-05-20T15:04:18.149018",
//     video: "string",
//     is_showcase: true,
//     updated_at: "2024-05-20T15:04:18.149021",
//     image: [],
//   },
//   {
//     name: "Top Quality Fresh Ginger For Sale",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Sem integer vitae justo eget. Diam vel quam elementum pulvinar. Fringilla urna porttitor rhoncus dolor purus. Scelerisque viverra mauris in aliquam sem. Urna porttitor rhoncus dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Sem integer vitae justo eget. Diam vel quam elementum pulvinar. Fringilla urna porttitor rhoncus dolor purus. Scelerisque viverra mauris in aliquam sem. Urna porttitor rhoncus dolor ",
//     unit: "string",
//     user_id: "4bec8330-ac21-48e8-8ca2-7ecbdaaa2f8b",
//     slug: "top-quality-fresh-ginger-for-sale",
//     min_order: 500,
//     category_id: "98b2dfa6-6f5e-4699-9803-48e081899111",
//     industry: "string",
//     min_order_unit: "50",
//     price: [
//       {
//         min_amount: 50,
//         max_amount: 100,
//         price: 60,
//       },
//     ],
//     package: "string",
//     view: 0,
//     title: "string",
//     port: "string",
//     like: 0,
//     id: "8c4a7b1b-19c1-40d2-b3d8-07c43e9c12e8",
//     group: "string",
//     lead_time: "2024-05-20",
//     created_at: "2024-05-20T14:58:37.878460",
//     video: "string",
//     is_showcase: true,
//     updated_at: "2024-05-20T14:58:37.878463",
//     image: [],
//   },
//   {
//     name: "Dry split ginger",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Sem integer vitae justo eget. Diam vel quam elementum pulvinar. Fringilla urna porttitor rhoncus dolor purus. Scelerisque viverra mauris in aliquam sem. Urna porttitor rhoncus dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Sem integer vitae justo eget. Diam vel quam elementum pulvinar. Fringilla urna porttitor rhoncus dolor purus. Scelerisque viverra mauris in aliquam sem. Urna porttitor rhoncus dolor ",
//     unit: "string",
//     user_id: "4bec8330-ac21-48e8-8ca2-7ecbdaaa2f8b",
//     slug: "dry-split-ginger",
//     min_order: 1200,
//     category_id: "98b2dfa6-6f5e-4699-9803-48e081899111",
//     industry: "string",
//     min_order_unit: "50",
//     price: [
//       {
//         min_amount: 50,
//         max_amount: 100,
//         price: 200,
//       },
//       {
//         min_amount: 200,
//         max_amount: 400,
//         price: 2000,
//       },
//     ],
//     package: "string",
//     view: 0,
//     title: "string",
//     port: "string",
//     like: 0,
//     id: "a12c09d6-97fe-49ed-823a-8ca46ad5b148",
//     group: "string",
//     lead_time: "2024-05-20",
//     created_at: "2024-05-20T16:26:04.503827",
//     video: "string",
//     is_showcase: true,
//     updated_at: "2024-05-20T16:26:04.503830",
//     image: [],
//   },
//   {
//     name: "Fresh onion for sale",
//     description: "ORGANIC ONION/RED/YELLOW/WHITE",
//     unit: "string",
//     user_id: "4bec8330-ac21-48e8-8ca2-7ecbdaaa2f8b",
//     slug: "fresh-onion-for-sale",
//     min_order: 2000,
//     category_id: "0e237881-7781-4649-9132-1c5670d5cd3c",
//     industry: "string",
//     min_order_unit: "1000",
//     price: [
//       {
//         min_amount: 100,
//         max_amount: 500,
//         price: 6000,
//       },
//       {
//         min_amount: 400,
//         max_amount: 600,
//         price: 8000,
//       },
//       {
//         min_amount: 400,
//         max_amount: 1200,
//         price: 10000,
//       },
//     ],
//     package: "string",
//     view: 0,
//     title: "string",
//     port: "string",
//     like: 0,
//     id: "b909c215-2a6d-4dfb-b4b6-5f4989a337a3",
//     group: "string",
//     lead_time: "2024-05-21",
//     created_at: "2024-05-21T09:17:53.160659",
//     video: "string",
//     is_showcase: true,
//     updated_at: "2024-05-21T09:17:53.160662",
//     image: [],
//   },
// ];

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
