"use client";
import { Box, Divider, Grid, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import { MdArrowForwardIos } from "react-icons/md";
import Product2 from "@/assets/images/product2.jpg";
import { MAX_WIDTH_APP } from "@/constant/css";

import useDevices from "@/hook/useDevices";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
import ListProductComponent from "../common/show-list-product/ListProductComponent";
import { ProductDto } from "@/interface/common";

const supplierProduct = [
  {
    name: "Fresh Red Chili pepper",
    description: "Fresh Red Chili pepper",
    unit: "string",
    user_id: "4bec8330-ac21-48e8-8ca2-7ecbdaaa2f8b",
    slug: "fresh-red-chili-pepper",
    min_order: 2000,
    category_id: "6cc706c2-b9a2-4d50-bd2a-017f767c1d20",
    industry: "string",
    min_order_unit: "1000",
    price: [
      {
        min_amount: 100,
        max_amount: 500,
        price: 2000,
      },
      {
        min_amount: 200,
        max_amount: 600,
        price: 4000,
      },
      {
        min_amount: 200,
        max_amount: 1000,
        price: 6000,
      },
    ],
    package: "string",
    view: 0,
    title: "string",
    port: "string",
    like: 0,
    id: "22d3ed7f-c156-4156-9d1b-8c527b6e2903",
    group: "string",
    lead_time: "2024-05-21",
    created_at: "2024-05-21T09:02:16.211571",
    video: "string",
    is_showcase: true,
    updated_at: "2024-05-21T09:02:16.211574",
    image: [],
  },
  {
    name: "Fresh Onions Fast Shipping High Quality",
    description: "Fresh Onions Fast Shipping High Quality",
    unit: "string",
    user_id: "4bec8330-ac21-48e8-8ca2-7ecbdaaa2f8b",
    slug: "fresh-onions-fast-shipping-high-quality",
    min_order: 2000,
    category_id: "1414f972-79a9-472c-8621-c2b816b7902a",
    industry: "string",
    min_order_unit: "1000",
    price: [
      {
        min_amount: 100,
        max_amount: 500,
        price: 6000,
      },
      {
        min_amount: 400,
        max_amount: 600,
        price: 8000,
      },
      {
        min_amount: 400,
        max_amount: 1200,
        price: 10000,
      },
    ],
    package: "string",
    view: 0,
    title: "string",
    port: "string",
    like: 0,
    id: "29b89cab-06bf-496a-95ce-9ca0a2d008bc",
    group: "string",
    lead_time: "2024-05-21",
    created_at: "2024-05-21T09:21:00.218890",
    video: "string",
    is_showcase: true,
    updated_at: "2024-05-21T09:21:00.218893",
    image: [],
  },
  {
    name: "Fresh Brown Light Gingers",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Sem integer vitae justo eget. Diam vel quam elementum pulvinar. Fringilla urna porttitor rhoncus dolor purus. Scelerisque viverra mauris in aliquam sem. Urna porttitor rhoncus dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Sem integer vitae justo eget. Diam vel quam elementum pulvinar. Fringilla urna porttitor rhoncus dolor purus. Scelerisque viverra mauris in aliquam sem. Urna porttitor rhoncus dolor ",
    unit: "string",
    user_id: "4bec8330-ac21-48e8-8ca2-7ecbdaaa2f8b",
    slug: "fresh-brown-light-gingers",
    min_order: 500,
    category_id: "98b2dfa6-6f5e-4699-9803-48e081899111",
    industry: "string",
    min_order_unit: "50",
    price: [
      {
        min_amount: 50,
        max_amount: 100,
        price: 60,
      },
    ],
    package: "string",
    view: 0,
    title: "string",
    port: "string",
    like: 0,
    id: "3fd928c8-f415-49c5-87ba-0ebd45a21aa0",
    group: "string",
    lead_time: "2024-05-20",
    created_at: "2024-05-20T13:19:26.929915",
    video: "string",
    is_showcase: true,
    updated_at: "2024-05-20T13:19:26.929919",
    image: [
      {
        id: "bdb2cf84-a286-4b3c-a441-718e59087fd3",
        url: "https://localhost:8000/uploads/Product/PRO-1716138000.0-ginger1-0754256001632461047-150-jpg.jpg",
      },
    ],
  },
  {
    name: "GARLIC",
    description: "ORGANIC ONION/RED/YELLOW/WHITE",
    unit: "string",
    user_id: "4bec8330-ac21-48e8-8ca2-7ecbdaaa2f8b",
    slug: "garlic",
    min_order: 2000,
    category_id: "0e237881-7781-4649-9132-1c5670d5cd3c",
    industry: "string",
    min_order_unit: "1000",
    price: [
      {
        min_amount: 100,
        max_amount: 500,
        price: 6000,
      },
      {
        min_amount: 400,
        max_amount: 600,
        price: 8000,
      },
      {
        min_amount: 400,
        max_amount: 1200,
        price: 10000,
      },
    ],
    package: "string",
    view: 0,
    title: "string",
    port: "string",
    like: 0,
    id: "5740b098-0268-4a7b-af75-8f7d74778775",
    group: "string",
    lead_time: "2024-05-21",
    created_at: "2024-05-21T09:17:29.420852",
    video: "string",
    is_showcase: true,
    updated_at: "2024-05-21T09:17:29.420856",
    image: [],
  },
  {
    name: "Fresh Vegetables (Cabbage, Cucumber, Eggplant, Pumpkins, Okra, Taro, Cassava)",
    description: "Fresh Vegetables (Cabbage, Cucumber, Eggplant, Pumpkins, Okra, Taro, Cassava)",
    unit: "string",
    user_id: "4bec8330-ac21-48e8-8ca2-7ecbdaaa2f8b",
    slug: "fresh-vegetables-cabbage-cucumber-eggplant-pumpkins-okra-taro-cassava",
    min_order: 2000,
    category_id: "6cc706c2-b9a2-4d50-bd2a-017f767c1d20",
    industry: "string",
    min_order_unit: "1000",
    price: [
      {
        min_amount: 100,
        max_amount: 500,
        price: 6000,
      },
      {
        min_amount: 400,
        max_amount: 600,
        price: 8000,
      },
      {
        min_amount: 400,
        max_amount: 1200,
        price: 10000,
      },
    ],
    package: "string",
    view: 0,
    title: "string",
    port: "string",
    like: 0,
    id: "7012fc04-3130-4c6e-86a9-0ab2521b4487",
    group: "string",
    lead_time: "2024-05-21",
    created_at: "2024-05-21T09:05:39.889338",
    video: "string",
    is_showcase: true,
    updated_at: "2024-05-21T09:05:39.889341",
    image: [],
  },
  {
    name: "High Quality 100% Natural Product Cheap Price Professional Export Wholesale Fresh Potato",
    description: "High Quality 100% Natural Product Cheap Price Professional Export Wholesale Fresh Potato",
    unit: "string",
    user_id: "4bec8330-ac21-48e8-8ca2-7ecbdaaa2f8b",
    slug: "high-quality-100-natural-product-cheap-price-professional-export-wholesale-fresh-potato",
    min_order: 2000,
    category_id: "1414f972-79a9-472c-8621-c2b816b7902a",
    industry: "string",
    min_order_unit: "1000",
    price: [
      {
        min_amount: 100,
        max_amount: 500,
        price: 6000,
      },
      {
        min_amount: 400,
        max_amount: 600,
        price: 8000,
      },
      {
        min_amount: 400,
        max_amount: 1200,
        price: 10000,
      },
    ],
    package: "string",
    view: 0,
    title: "string",
    port: "string",
    like: 0,
    id: "7be461dd-58be-4639-8ab2-22bf122bbdf3",
    group: "string",
    lead_time: "2024-05-21",
    created_at: "2024-05-21T09:19:02.982180",
    video: "string",
    is_showcase: true,
    updated_at: "2024-05-21T09:19:02.982182",
    image: [],
  },
  {
    name: "Buy New Ginger Fresh Wholesale Supplier",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Sem integer vitae justo eget. Diam vel quam elementum pulvinar. Fringilla urna porttitor rhoncus dolor purus. Scelerisque viverra mauris in aliquam sem. Urna porttitor rhoncus dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Sem integer vitae justo eget. Diam vel quam elementum pulvinar. Fringilla urna porttitor rhoncus dolor purus. Scelerisque viverra mauris in aliquam sem. Urna porttitor rhoncus dolor ",
    unit: "string",
    user_id: "4bec8330-ac21-48e8-8ca2-7ecbdaaa2f8b",
    slug: "buy-new-ginger-fresh-wholesale-supplier",
    min_order: 1200,
    category_id: "98b2dfa6-6f5e-4699-9803-48e081899111",
    industry: "string",
    min_order_unit: "50",
    price: [
      {
        min_amount: 50,
        max_amount: 100,
        price: 80,
      },
      {
        min_amount: 200,
        max_amount: 400,
        price: 1000,
      },
    ],
    package: "string",
    view: 0,
    title: "string",
    port: "string",
    like: 0,
    id: "8bae2761-fe51-4ca1-a5df-7664b0b32f9f",
    group: "string",
    lead_time: "2024-05-20",
    created_at: "2024-05-20T15:04:18.149018",
    video: "string",
    is_showcase: true,
    updated_at: "2024-05-20T15:04:18.149021",
    image: [],
  },
  {
    name: "Top Quality Fresh Ginger For Sale",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Sem integer vitae justo eget. Diam vel quam elementum pulvinar. Fringilla urna porttitor rhoncus dolor purus. Scelerisque viverra mauris in aliquam sem. Urna porttitor rhoncus dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Sem integer vitae justo eget. Diam vel quam elementum pulvinar. Fringilla urna porttitor rhoncus dolor purus. Scelerisque viverra mauris in aliquam sem. Urna porttitor rhoncus dolor ",
    unit: "string",
    user_id: "4bec8330-ac21-48e8-8ca2-7ecbdaaa2f8b",
    slug: "top-quality-fresh-ginger-for-sale",
    min_order: 500,
    category_id: "98b2dfa6-6f5e-4699-9803-48e081899111",
    industry: "string",
    min_order_unit: "50",
    price: [
      {
        min_amount: 50,
        max_amount: 100,
        price: 60,
      },
    ],
    package: "string",
    view: 0,
    title: "string",
    port: "string",
    like: 0,
    id: "8c4a7b1b-19c1-40d2-b3d8-07c43e9c12e8",
    group: "string",
    lead_time: "2024-05-20",
    created_at: "2024-05-20T14:58:37.878460",
    video: "string",
    is_showcase: true,
    updated_at: "2024-05-20T14:58:37.878463",
    image: [],
  },
  {
    name: "Dry split ginger",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Sem integer vitae justo eget. Diam vel quam elementum pulvinar. Fringilla urna porttitor rhoncus dolor purus. Scelerisque viverra mauris in aliquam sem. Urna porttitor rhoncus dolor Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sed ullamcorper morbi tincidunt ornare. Sem integer vitae justo eget. Diam vel quam elementum pulvinar. Fringilla urna porttitor rhoncus dolor purus. Scelerisque viverra mauris in aliquam sem. Urna porttitor rhoncus dolor ",
    unit: "string",
    user_id: "4bec8330-ac21-48e8-8ca2-7ecbdaaa2f8b",
    slug: "dry-split-ginger",
    min_order: 1200,
    category_id: "98b2dfa6-6f5e-4699-9803-48e081899111",
    industry: "string",
    min_order_unit: "50",
    price: [
      {
        min_amount: 50,
        max_amount: 100,
        price: 200,
      },
      {
        min_amount: 200,
        max_amount: 400,
        price: 2000,
      },
    ],
    package: "string",
    view: 0,
    title: "string",
    port: "string",
    like: 0,
    id: "a12c09d6-97fe-49ed-823a-8ca46ad5b148",
    group: "string",
    lead_time: "2024-05-20",
    created_at: "2024-05-20T16:26:04.503827",
    video: "string",
    is_showcase: true,
    updated_at: "2024-05-20T16:26:04.503830",
    image: [],
  },
  {
    name: "Fresh onion for sale",
    description: "ORGANIC ONION/RED/YELLOW/WHITE",
    unit: "string",
    user_id: "4bec8330-ac21-48e8-8ca2-7ecbdaaa2f8b",
    slug: "fresh-onion-for-sale",
    min_order: 2000,
    category_id: "0e237881-7781-4649-9132-1c5670d5cd3c",
    industry: "string",
    min_order_unit: "1000",
    price: [
      {
        min_amount: 100,
        max_amount: 500,
        price: 6000,
      },
      {
        min_amount: 400,
        max_amount: 600,
        price: 8000,
      },
      {
        min_amount: 400,
        max_amount: 1200,
        price: 10000,
      },
    ],
    package: "string",
    view: 0,
    title: "string",
    port: "string",
    like: 0,
    id: "b909c215-2a6d-4dfb-b4b6-5f4989a337a3",
    group: "string",
    lead_time: "2024-05-21",
    created_at: "2024-05-21T09:17:53.160659",
    video: "string",
    is_showcase: true,
    updated_at: "2024-05-21T09:17:53.160662",
    image: [],
  },
];

const RecommendedProduct = () => {
  const theme = useTheme();
  const locale = Cookies.get("NEXT_LOCALE");
  const router = useRouter();
  return (
    <Box bgcolor={theme.blue[100]} display={"flex"} justifyContent={"center"} mt={"100px"}>
      <Box px={"88px"} py={"24px"} p={{ xs: "0 20px 20px", sm: "24px 88px" }} maxWidth={MAX_WIDTH_APP}>
        {/* <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} mb={"100px"}>
          <Typography fontSize={20} fontWeight={theme.fontWeight.bold} fontFamily={theme.fontFamily.secondary}>
            Recommended Products
          </Typography>
          <Box
            component={"button"}
            onClick={() => router.push(PRODUCT_PATH_URL.PRODUCT_LIST)}
            display={"flex"}
            alignItems={"center"}
            gap={1}
            sx={{
              "&:hover": {
                color: theme.palette.primary.main,
                svg: {
                  fill: theme.palette.primary.main,
                },
              },
            }}
            color={theme.black[200]}
            fontSize={14}
            fontFamily={theme.fontFamily.secondary}
            fontWeight={theme.fontWeight.medium}
          >
            Explore more
            <MdArrowForwardIos size={14} color="#0C0C0C" />
          </Box>
        </Box> */}
        {/* <Box display={"flex"} justifyContent={"center"}>
          <Grid container spacing={10} width={"100%"} marginLeft={0}>
            {Array.from(Array(10)).map((_, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={12 / 5}
                xl={12 / 5}
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  paddingLeft: "0!important",
                  paddingTop: "32px!important",
                }}
              >
                <Box
                  width={"242px"}
                  height={"100%"}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  bgcolor={"common.white"}
                  p={"16px"}
                  borderRadius={"10px"}
                >
                  <Image
                    src={Product2}
                    alt="product"
                    width={210}
                    height={210}
                  />
                  <Box>
                    <Typography
                      color={theme.blue[500]}
                      fontSize={14}
                      mt={2}
                      mb={1}
                      fontWeight={theme.fontWeight.regular}
                      fontFamily={theme.fontFamily.secondary}
                    >
                      Category
                    </Typography>
                    <Typography
                      color={theme.black[200]}
                      fontWeight={theme.fontWeight.semiBold}
                      fontFamily={theme.fontFamily.secondary}
                      sx={{
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        WebkitLineClamp: 2,
                        overflow: "hidden",
                        mb: 1,
                      }}
                    >
                      Name of Product Name of Product Name of Product Name of
                      Product
                    </Typography>
                    <Box
                      height={"1px"}
                      width={1}
                      bgcolor={theme.blue[600]}
                      mt={2}
                      mb={1}
                    />
                    <Box display={"flex"} gap={0.5} fontSize={14}>
                      <Typography
                        color={theme.blue[500]}
                        fontWeight={theme.fontWeight.regular}
                        fontFamily={theme.fontFamily.secondary}
                      >
                        From
                      </Typography>
                      <Typography
                        color={theme.blue[500]}
                        fontWeight={theme.fontWeight.medium}
                        fontFamily={theme.fontFamily.secondary}
                      >
                        $45.00
                      </Typography>
                      <Typography
                        color={theme.blue[500]}
                        fontWeight={theme.fontWeight.regular}
                        fontFamily={theme.fontFamily.secondary}
                      >
                        to
                      </Typography>
                      <Typography
                        color={theme.blue[500]}
                        fontWeight={theme.fontWeight.medium}
                        fontFamily={theme.fontFamily.secondary}
                      >
                        $100.00
                      </Typography>
                    </Box>
                    <Box
                      display={"flex"}
                      gap={0.5}
                      color={theme.palette.grey[400]}
                    >
                      <Typography fontFamily={theme.fontFamily.secondary}>
                        MOQ
                      </Typography>
                      <Typography fontFamily={theme.fontFamily.secondary}>
                        1000
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box> */}
        <ListProductComponent title={"Recommended Products"} url={PRODUCT_PATH_URL.PRODUCT_LIST} data={supplierProduct as unknown as ProductDto[]} />
      </Box>
    </Box>
  );
};

export default RecommendedProduct;
