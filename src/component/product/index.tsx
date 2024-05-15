"use client";
import { useGetProductSearch } from "@/api/product/query";
import { MAX_WIDTH_APP } from "@/constant/css";
import useDevices from "@/hook/useDevices";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useSearchParams } from "next/navigation";
import CheckboxComponent from "../common/CheckboxComponent";
import ProductList from "./ProductList";
import RelevantCategoryFilter from "./RelevantCategoryFilter";
import { ChangeEvent, useEffect, useState } from "react";
import NotFound from "./NotFound";
const Product = () => {
  const { isMobile } = useDevices();
  const theme = useTheme();
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const { getProductSearch, isSuccess, data } = useGetProductSearch();
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
    getProductSearch({});
  }, []);
  console.log(countryCheckedList);
  const handleOnCheckCategory = (
    e: ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const isChecked = e.target.checked;
    const updatedList = [...categoryIdCheckedList];

    if (isChecked) {
      updatedList.push(id);
    } else {
      const index = updatedList.indexOf(id);
      if (index !== -1) {
        updatedList.splice(index, 1);
      }
    }

    setCategoryIdCheckedList(updatedList);
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

    setCountryCheckedList(updatedList);
  };
  const handleApply = () => {
    getProductSearch({
      category_ids: categoryIdCheckedList,
      countries: countryCheckedList,
      from_price: priceFilter.from_price,
      to_price: priceFilter.to_price,
      moq: moq,
    });
  };

  return (
    <Container
      sx={{
        mt: "184px",
        p: isMobile ? "20px!important" : "0 88px!important",
        maxWidth: `${MAX_WIDTH_APP}!important`,
        fontFamily: theme.fontFamily.secondary,
      }}
    >
      <RelevantCategoryFilter />
      {keyword && (
        <Typography fontFamily={theme.fontFamily.secondary} mb={"20px"}>
          {`Showing 2,000+ products for "${keyword}"`}
        </Typography>
      )}
       {!keyword && (
        <Typography fontFamily={theme.fontFamily.secondary} mb={"20px"}>
          {`Showing 2,000+ products recommendations`}
        </Typography>
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
              {data?.categories &&
                Object.entries(data?.categories).map(([id, name]) => {
                  return (
                    <Box display={"flex"} gap={1} key={id}>
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
                })}
              <Box
                component={"button"}
                fontFamily={theme.fontFamily.secondary}
                fontSize={14}
                color={theme.palette.primary.main}
              >
                Show more
              </Box>
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
              {data?.countries &&
                data?.countries.map((country) => {
                  return (
                    <Box display={"flex"} gap={1} key={country}>
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
                })}
              <Box
                component={"button"}
                fontFamily={theme.fontFamily.secondary}
                fontSize={14}
                color={theme.palette.primary.main}
              >
                Show more
              </Box>
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
                  sx={{
                    width: "100px",
                    bgcolor: "white",
                    fontFamily: theme.fontFamily.secondary,
                    borderRadius: "8px",
                    border: `1px solid ${theme.palette.grey[50]}`,
                    input: {
                      padding: "12px 16px",
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
                  },
                }}
                inputProps={{
                  min: 0,
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
              />
            </Box>
            <Box width={"100%"}>
              <Box
                component={"button"}
                sx={{
                  p: "20px 14px",
                  textAlign: "start",
                  color: theme.palette.primary.main,
                  fontFamily: theme.fontFamily.secondary,
                  width: "45%",
                  fontWeight: theme.fontWeight.medium,
                  fontSize: 14,
                }}
              >
                Clear All
              </Box>
              <Button
                onClick={handleApply}
                sx={{
                  p: "10px 14px!important",
                  borderRadius: "6px",
                  bgcolor: `${theme.blue[500]}!important`,
                  color: "common.white",
                  fontFamily: theme.fontFamily.secondary,
                  width: "55%",
                  fontWeight: theme.fontWeight.medium,
                  fontSize: 14,
                }}
              >
                Apply
              </Button>
            </Box>
          </>
        </Box>
        {data?.products && data?.products?.length > 0 ? (
          <ProductList data={data?.products} />
        ) : (
          <NotFound caseValue={1} />
        )}
      </Box>
    </Container>
  );
};

export default Product;
