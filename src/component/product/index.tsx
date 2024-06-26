"use client";
import {
  useGetProductByCategory,
  useGetProductSearch,
} from "@/api/product/query";
import { MARGIN_BOTTOM_ON_FOOTER, MAX_WIDTH_APP } from "@/constant/css";
import useDevices from "@/hook/useDevices";
import {
  Box,
  Button,
  Container,
  Pagination,
  Skeleton,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import CheckboxComponent from "../common/CheckboxComponent";
import ProductList from "./ProductList";
import RelevantCategoryFilter from "./RelevantCategoryFilter/RelevantCategoryFilter";
import { ChangeEvent, useEffect, useState } from "react";
import NotFound from "./NotFound";
import { isEqual } from "lodash";
import { ProductSearchResultDto } from "@/interface/common";
import { PRODUCT_LIST_LIMIT } from "@/constant";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
import FilterSkeleton from "../common/skeleton/FilterSkeleton";
import ProductListSkeleton from "./ProductListSkeleton";
const Product = () => {
  const { isMobile } = useDevices();
  const theme = useTheme();
  const searchParams = useSearchParams();
  const cate_name = searchParams.get("cate_name");
  const cate_level1_id = searchParams.get("cate_level1_id");
  const cate_level2_id = searchParams.get("cate_level2_id");
  const cate_level3_id = searchParams.get("cate_level3_id");
  const page = searchParams.get("page");
  const router = useRouter();
  const keyword = searchParams.get("keyword");
  const keyword_by_category = searchParams.get("keyword_by_category");
  const [listCategoryFilter, setListCategoryFilter] = useState<{
    [key: string]: string;
  }>();
  const [data, setData] = useState<ProductSearchResultDto>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [listCountryFilter, setListCountryFilter] = useState<string[]>();
  const [showMoreCategory, setShowMoreCategory] = useState(false);
  const [showMoreCountry, setShowMoreCountry] = useState(false);
  const [invalidPriceFilter, setInvalidPriceFilter] = useState(false);
  const {
    getProductSearch,
    isSuccess: isSuccessProductSearch,
    data: productSearch,
  } = useGetProductSearch();
  const {
    getProductByCategory,
    isSuccess: isSuccessProductByCategory,
    data: productByCategory,
  } = useGetProductByCategory();
  const [priceFilter, setPriceFilter] = useState<{
    from_price?: string;
    to_price?: string;
  }>({});
  const [moq, setMoq] = useState<string>();
  const [categoryIdCheckedList, setCategoryIdCheckedList] = useState<string[]>(
    []
  );
  const [countryCheckedList, setCountryCheckedList] = useState<string[]>([]);

  useEffect(() => {
    if (cate_name) {
      setData(productByCategory);
      setIsSuccess(isSuccessProductByCategory);
    } else {
      setData(productSearch);
      setIsSuccess(isSuccessProductSearch);
    }
  }, [isSuccessProductByCategory, isSuccessProductSearch]);
  useEffect(() => {
    if (isSuccess && !isEqual(listCategoryFilter, data?.categories)) {
      setListCategoryFilter(data?.categories);
    }
    if (isSuccess && !isEqual(listCountryFilter, data?.countries)) {
      setListCountryFilter(data?.countries);
    }
  }, [data]);

  const handleGetProduct = (page: string | null) => {
    if (cate_name) {
      getProductByCategory({
        page: page,
        limit: PRODUCT_LIST_LIMIT,
        keyword: keyword_by_category,
        product_category_id: cate_level3_id ?? cate_level2_id ?? cate_level1_id,
      });
    } else {
      getProductSearch({
        keyword: keyword,
        limit: PRODUCT_LIST_LIMIT,
        page: page,
      });
    }
  };

  const handleFilterProduct = (
    category_ids: string[],
    countries: string[],
    page: string | null
  ) => {
    if (cate_name) {
      getProductByCategory({
        keyword: keyword_by_category,
        product_category_id: cate_level3_id ?? cate_level2_id ?? cate_level1_id,
        category_ids: category_ids,
        countries: countries,
        from_price: priceFilter.from_price,
        to_price: priceFilter.to_price,
        moq: moq,
        limit: PRODUCT_LIST_LIMIT,
        page: page,
      });
    } else {
      getProductSearch({
        page: page,
        keyword: keyword,
        category_ids: category_ids,
        countries: countries,
        from_price: priceFilter.from_price,
        to_price: priceFilter.to_price,
        moq: moq,
        limit: PRODUCT_LIST_LIMIT,
      });
    }
  };

  useEffect(() => {
    handleGetProduct("1");
  }, [
    keyword_by_category,
    keyword,
    cate_level3_id,
    cate_level2_id,
    cate_level1_id,
  ]);
  const handleOnCheckCategory = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const isChecked = e.target.checked;
    const updatedList = [...categoryIdCheckedList];

    if (isChecked) {
      handleFilterProduct(
        [...categoryIdCheckedList, id],
        countryCheckedList,
        page
      );
      updatedList.push(id);
    } else {
      const index = updatedList.indexOf(id);
      if (index !== -1) {
        updatedList.splice(index, 1);
        handleFilterProduct([...updatedList], countryCheckedList, page);
      }
    }

    setCategoryIdCheckedList(updatedList);
    if (page) {
      const updatedSearchParams = new URLSearchParams(searchParams.toString());
      updatedSearchParams.delete("page");
      router.push(
        `${PRODUCT_PATH_URL.PRODUCT_LIST}?${updatedSearchParams.toString()}`
      );
    }
  };

  const handleOnCheckCountry = (
    e: ChangeEvent<HTMLInputElement>,
    country: string
  ) => {
    const isChecked = e.target.checked;
    const updatedList = [...countryCheckedList];

    if (isChecked) {
      updatedList.push(country);
    } else {
      const index = updatedList.indexOf(country);
      if (index !== -1) {
        updatedList.splice(index, 1);
      }
    }
    handleFilterProduct(categoryIdCheckedList, updatedList, page);

    setCountryCheckedList(updatedList);
    if (page) {
      const updatedSearchParams = new URLSearchParams(searchParams.toString());
      updatedSearchParams.delete("page");
      router.push(
        `${PRODUCT_PATH_URL.PRODUCT_LIST}?${updatedSearchParams.toString()}`
      );
    }
  };
  const handleApply = () => {
    if (
      priceFilter.from_price &&
      priceFilter.to_price &&
      +priceFilter.from_price > +priceFilter.to_price
    ) {
      setInvalidPriceFilter(true);
      return;
    } else {
      setInvalidPriceFilter(false);
    }
    handleFilterProduct(categoryIdCheckedList, countryCheckedList, page);
    if (page) {
      const updatedSearchParams = new URLSearchParams(searchParams.toString());
      updatedSearchParams.delete("page");
      router.push(
        `${PRODUCT_PATH_URL.PRODUCT_LIST}?${updatedSearchParams.toString()}`
      );
    }
  };

  const handleClearAll = () => {
    setCategoryIdCheckedList([]);
    setCountryCheckedList([]);
    setPriceFilter({ from_price: "", to_price: "" });
    setMoq("");
    handleGetProduct(page);
  };

  const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set("page", page.toString());
    handleFilterProduct(
      categoryIdCheckedList,
      countryCheckedList,
      page.toString()
    );
    router.push(
      `${PRODUCT_PATH_URL.PRODUCT_LIST}?${updatedSearchParams.toString()}`
    );
  };
  return (
    <Container
      sx={{
        mt: "184px",
        p: { xs: "20px!important", sm: "0 88px!important" },
        maxWidth: `${MAX_WIDTH_APP}!important`,
        fontFamily: theme.fontFamily.secondary,
        mb: MARGIN_BOTTOM_ON_FOOTER,
      }}
    >
      {cate_name && <RelevantCategoryFilter />}
      {keyword &&
      data?.metadata?.total_data !== null &&
      data?.metadata?.total_data !== undefined ? (
        <Typography fontFamily={theme.fontFamily.secondary} mb={"20px"}>
          {`Showing ${data?.metadata?.total_data} products for "${keyword}"`}
        </Typography>
      ) : null}
      {!keyword && !keyword_by_category && !cate_name && (
        <Typography fontFamily={theme.fontFamily.secondary} mb={"20px"}>
          {`Showing ${
            data?.metadata?.total_data || 0
          } products recommendations`}
        </Typography>
      )}
      {keyword_by_category && cate_name && (
        <Typography fontFamily={theme.fontFamily.secondary} mb={"20px"}>
          {`Showing ${
            data?.metadata?.total_data || 0
          } products for "${keyword_by_category}" in ${cate_name}`}
        </Typography>
      )}
      {cate_name && !keyword_by_category && (
        <Box
          fontFamily={theme.fontFamily.secondary}
          mb={"20px"}
          display={"flex"}
        >
          Browser&nbsp;
          <Typography
            fontFamily={theme.fontFamily.secondary}
            fontWeight={theme.fontWeight.semiBold}
          >
            All Products&nbsp;
          </Typography>
          {`in ${cate_name}`}
        </Box>
      )}
      <Box display={"flex"}>
        <Box
          bgcolor={theme.blue[100]}
          p={"24px"}
          borderRadius={"16px"}
          height={"fit-content"}
          mr={"10px"}
        >
          <Typography
            fontFamily={theme.fontFamily.secondary}
            color={theme.black[200]}
            fontWeight={theme.fontWeight.bold}
            mb={"24px"}
          >
            Filter
          </Typography>
          <>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"start"}
              mb={"24px"}
            >
              <Typography
                fontSize={14}
                fontFamily={theme.fontFamily.secondary}
                fontWeight={theme.fontWeight.bold}
                whiteSpace={"nowrap"}
                mb={"16px"}
              >
                Matching Products Categories
              </Typography>
              {listCategoryFilter ? (
                Object.entries(listCategoryFilter)
                  .slice(
                    0,
                    showMoreCategory
                      ? Object.entries(listCategoryFilter).length
                      : 5
                  )
                  .map(([id, name]) => {
                    return (
                      <Box display={"flex"} gap={1} mb={2} key={id}>
                        <CheckboxComponent
                          id={id}
                          handleOnCheck={handleOnCheckCategory}
                          checked={categoryIdCheckedList.includes(id)}
                        />
                        <Typography
                          sx={{
                            fontFamily: theme.fontFamily.secondary,
                            fontSize: 14,
                          }}
                        >
                          {name}
                        </Typography>
                      </Box>
                    );
                  })
              ) : (
                <FilterSkeleton />
              )}
              {data?.categories &&
                Object.entries(data?.categories).length > 5 && (
                  <Box
                    component={"button"}
                    fontFamily={theme.fontFamily.secondary}
                    fontSize={14}
                    color={theme.palette.primary.main}
                    onClick={() => setShowMoreCategory(!showMoreCategory)}
                  >
                    {showMoreCategory ? "Show less" : "Show more"}
                  </Box>
                )}
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"start"}
              mb={"24px"}
            >
              <Typography
                fontSize={14}
                fontFamily={theme.fontFamily.secondary}
                fontWeight={theme.fontWeight.bold}
                whiteSpace={"nowrap"}
                mb={"16px"}
              >
                Suppliers Country
              </Typography>
              {listCountryFilter ? (
                listCountryFilter
                  ?.slice(0, showMoreCategory ? listCountryFilter.length : 5)
                  .map((country) => {
                    return (
                      <Box display={"flex"} gap={1} mb={2} key={country}>
                        <CheckboxComponent
                          id={country}
                          handleOnCheck={handleOnCheckCountry}
                          checked={countryCheckedList.includes(country)}
                        />
                        <Typography
                          sx={{
                            fontFamily: theme.fontFamily.secondary,
                            fontSize: 14,
                          }}
                        >
                          {country}
                        </Typography>
                      </Box>
                    );
                  })
              ) : (
                <FilterSkeleton />
              )}
              {data?.countries && data.countries.length > 5 && (
                <Box
                  component={"button"}
                  fontFamily={theme.fontFamily.secondary}
                  fontSize={14}
                  color={theme.palette.primary.main}
                  onClick={() => setShowMoreCountry(!showMoreCountry)}
                >
                  {showMoreCountry ? "Show less" : "Show more"}
                </Box>
              )}
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"start"}
              mb={"24px"}
            >
              <Typography
                fontSize={14}
                fontFamily={theme.fontFamily.secondary}
                fontWeight={theme.fontWeight.bold}
                whiteSpace={"nowrap"}
                mb={"10px"}
              >
                Price
              </Typography>
              <Box display={"flex"} alignItems={"center"}>
                <TextField
                  value={priceFilter.from_price}
                  type="number"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPriceFilter({
                      from_price: e.target.value,
                      to_price: priceFilter.to_price,
                    })
                  }
                  sx={{
                    width: "100px",
                    bgcolor: "white",
                    fontFamily: theme.fontFamily.secondary,
                    borderRadius: "8px",
                    border: `1px solid ${theme.palette.grey[50]}`,
                    input: {
                      padding: "12px 16px",
                      fontFamily: theme.fontFamily.secondary,
                    },
                  }}
                  placeholder="From"
                  inputProps={{
                    min: 0,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                />
                <Box
                  mx={"16px"}
                  width={"23px"}
                  height={"1px"}
                  bgcolor={theme.palette.grey[500]}
                />
                <TextField
                  type="number"
                  value={priceFilter.to_price}
                  sx={{
                    width: "100px",
                    bgcolor: "white",
                    fontFamily: theme.fontFamily.secondary,
                    borderRadius: "8px",
                    border: `1px solid ${theme.palette.grey[50]}`,
                    input: {
                      padding: "12px 16px",
                      fontFamily: theme.fontFamily.secondary,
                    },
                  }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPriceFilter({
                      from_price: priceFilter.from_price,
                      to_price: e.target.value,
                    })
                  }
                  placeholder="To"
                  inputProps={{
                    min: 0,
                    inputMode: "numeric",
                    pattern: "[0-9]*",
                  }}
                />
              </Box>
              {invalidPriceFilter && (
                <Typography
                  width={"100%"}
                  textAlign={"center"}
                  mt={"8px"}
                  fontFamily={theme.fontFamily.secondary}
                  fontSize={14}
                  fontWeight={theme.fontWeight.medium}
                  color={theme.red[300]}
                >
                  Please enter a valid price range
                </Typography>
              )}
            </Box>

            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"start"}
              width={"100%"}
              mb={"24px"}
            >
              <Typography
                fontSize={14}
                fontFamily={theme.fontFamily.secondary}
                fontWeight={theme.fontWeight.bold}
                whiteSpace={"nowrap"}
                mb={"10px"}
              >
                Minimum Order Quantity
              </Typography>
              <TextField
                value={moq}
                type="number"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setMoq(e.target.value)
                }
                sx={{
                  width: "100%",
                  bgcolor: "white",
                  fontFamily: theme.fontFamily.secondary,
                  borderRadius: "8px",
                  border: `1px solid ${theme.palette.grey[50]}`,
                  input: {
                    padding: "10px 16px",
                    fontFamily: theme.fontFamily.secondary,
                  },
                }}
                inputProps={{
                  min: 0,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
              />
            </Box>
            <Box width={"100%"} display={"flex"}>
              <Box
                onClick={handleClearAll}
                component={"button"}
                width={"45%"}
                sx={{
                  p: "16px 10px",
                  textAlign: "center",
                  color: theme.palette.primary.main,
                  fontFamily: theme.fontFamily.secondary,
                  fontWeight: theme.fontWeight.medium,
                  fontSize: 14,
                }}
              >
                Clear All
              </Box>
              <Button
                onClick={handleApply}
                sx={{
                  width: "55%",
                  p: "10px 14px!important",
                  borderRadius: "8px",
                  bgcolor: `${theme.blue[500]}!important`,
                  color: "common.white",
                  fontFamily: theme.fontFamily.secondary,
                  fontWeight: theme.fontWeight.medium,
                  fontSize: 14,
                }}
              >
                Apply
              </Button>
            </Box>
          </>
        </Box>

        {data && data.products.length > 0 ? (
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            width={"100%"}
          >
            <ProductList data={data?.products} />
            {data &&
              data.metadata.total_page &&
              data.metadata.total_page > 1 && (
                <Pagination
                  count={data.metadata.total_page || 1}
                  color="primary"
                  shape="rounded"
                  sx={{ justifyContent: "center", mt: "20px" }}
                  page={page ? parseInt(page) : 1}
                  onChange={(e: ChangeEvent<unknown>, page: number) =>
                    handleChangePage(e, page)
                  }
                />
              )}
          </Box>
        ) : null}
        {!data && (
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            width={"100%"}
          >
            <ProductListSkeleton />
          </Box>
        )}
        {data?.products && data?.products?.length === 0 ? (
          <NotFound caseValue={keyword ? 2 : 1} />
        ) : null}
      </Box>
    </Container>
  );
};

export default Product;
