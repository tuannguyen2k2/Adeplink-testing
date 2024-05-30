"use client";
import { useGetProductSearch } from "@/api/product/query";
import { getAllSupplier } from "@/api/supplier";
import {
  RECENTLY_SEARCH_PRODUCT_RESULT,
  RECENTLY_SEARCH_SUPPLIER_RESULT,
} from "@/constant/cookies";
import { PRODUCT_PATH_URL, SUPPLIER_PATH_URL } from "@/constant/pathUrl";
import { SUPPLIER_KEY } from "@/constant/queryKey";
import { useClickOutside } from "@/hook/useClickOutside";
import useDebounce from "@/hook/useDebounce";
import useDevices from "@/hook/useDevices";
import { FilterSupplierDto } from "@/interface/common";
import { CircularProgress } from "@material-ui/core";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useRouter } from "next-nprogress-bar";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdClose,
  IoMdSearch,
} from "react-icons/io";
import SearchResult from "./SearchResult";

const useStyles = makeStyles((theme) => ({
  spinner: {
    marginRight: "20px",
    animation: "$spin 1s infinite linear",
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)",
    },
    "100%": {
      transform: "rotate(360deg)",
    },
  },
}));
const Search = () => {
  const theme = useTheme();
  const classes = useStyles();
  const translate = useTranslations();
  const router = useRouter();
  const { isTablet } = useDevices();
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [isFocusInput, setIsFocusInput] = useState<boolean>(false);
  const [valueInput, setValueInput] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { getProductSearch, isSuccess, data } = useGetProductSearch();
  const pagination = {
    page: 1,
    limit: 5,
  };
  const [selectedSearchOption, setSelectedSearchOption] = useState<
  "product" | "supplier"
  >("product");
  
  const debouncedValue = useDebounce(valueInput, 500);
  const [recentlySearchResult, setRecentlySearchResult] = useState(
    Cookies.get(RECENTLY_SEARCH_PRODUCT_RESULT)
  );
  const searchBoxRef = useRef<HTMLElement | null>(null);
  const [filter, setFilter] = useState<FilterSupplierDto>({
    keyword: "",
    category_ids: [],
    countries: [],
  });
  const sortOrder = "";
  const {
    data: supplierData,
    isLoading,
    isSuccess: supplierSuccess,
  } = useQuery({
    queryKey: [SUPPLIER_KEY, pagination, filter, sortOrder],
    queryFn: async () =>
      await getAllSupplier(filter, sortOrder, {
        page: pagination.page,
        limit: pagination.limit,
      }).then((response) => {
        return response.data;
      }),
  });
  const handleClickOutSide = () => {
    setIsFocusInput(false);
  };

  useClickOutside(searchBoxRef, handleClickOutSide);

  const handleFocusInput = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsFocusInput(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    let RECENTLY_SEARCH_RESULT;
    if (selectedSearchOption === "product") {
      RECENTLY_SEARCH_RESULT = RECENTLY_SEARCH_PRODUCT_RESULT;
    } else {
      RECENTLY_SEARCH_RESULT = RECENTLY_SEARCH_SUPPLIER_RESULT;
    }
    if (e.key === "Enter") {
      if (valueInput === "") {
        return;
      }
      e.preventDefault();

      const searchValue = {
        keyword: valueInput,
        id: null,
      };
      if (recentlySearchResult) {
        const recentlySearchResultParse = JSON.parse(recentlySearchResult);
        if (recentlySearchResultParse.length === 5) {
          recentlySearchResultParse.pop();
        }
        Cookies.set(
          RECENTLY_SEARCH_RESULT,
          JSON.stringify([searchValue, ...recentlySearchResultParse])
        );
      } else {
        Cookies.set(RECENTLY_SEARCH_RESULT, JSON.stringify([searchValue]));
      }
      if (selectedSearchOption === "product") {
        router.push(`${PRODUCT_PATH_URL.PRODUCT_LIST}?keyword=${valueInput}`);
      } else {
        router.push(`${SUPPLIER_PATH_URL.SUPPLIER_LIST}?keyword=${valueInput}`);
      }
      
    }
  };

  const handleOnChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    if (searchValue.startsWith(" ")) {
      return;
    }
    setValueInput(searchValue);
  };

  useEffect(() => {
    if (debouncedValue == "") {
      if (selectedSearchOption === "product") {
        setRecentlySearchResult(Cookies.get(RECENTLY_SEARCH_PRODUCT_RESULT));
      } else if (selectedSearchOption === "supplier") {
        setRecentlySearchResult(Cookies.get(RECENTLY_SEARCH_SUPPLIER_RESULT));
      }
      return;
    }
    if (selectedSearchOption === "product") {
      setLoading(true);
      getProductSearch({ keyword: debouncedValue, limit: "5" });
    } else if (selectedSearchOption === "supplier") {
      setFilter({ keyword: debouncedValue });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue, selectedSearchOption]);

  useEffect(() => {
    if (isSuccess || supplierSuccess) {
      setLoading(false);
    }
  }, [isSuccess, supplierSuccess]);

  return (
    <Box
      ref={searchBoxRef}
      bgcolor={"common.white"}
      display={"flex"}
      alignItems={"center"}
      width={isTablet ? "100%" : "40%"}
      borderRadius={"10px"}
      border={
        isFocusInput
          ? `1px solid ${theme.palette.primary.main}`
          : `1px solid ${theme.palette.grey[100]}`
      }
    >
      <Select
        MenuProps={{ disableScrollLock: true }}
        sx={{
          fontFamily: theme.fontFamily.secondary,
          "#search-select": {
            pr: "44px",
            fontSize: 14,
            fontWeight: theme.fontWeight.medium,
            color: theme.blue[500],
            zIndex: 1,
            textTransform: "capitalize",
          },
        }}
        id="search-select"
        defaultValue={"product"}
        onChange={(event: SelectChangeEvent) =>
          setSelectedSearchOption(event.target.value as "supplier" | "product")
        }
        IconComponent={() => {
          if (openSelect) {
            return (
              <IoIosArrowUp
                size={20}
                color="#0C71B9"
                style={{ position: "absolute", right: "-4px", zIndex: 0 }}
              />
            );
          } else {
            return (
              <IoIosArrowDown
                size={20}
                color="#0C71B9"
                style={{ position: "absolute", right: "-4px", zIndex: 0 }}
              />
            );
          }
        }}
        onOpen={() => setOpenSelect(true)}
        onClose={() => setOpenSelect(false)}
      >
        <MenuItem
          value={"product"}
          sx={{
            fontFamily: theme.fontFamily.secondary,
            fontSize: 14,
            fontWeight: theme.fontWeight.medium,
            textTransform: "capitalize",
          }}
        >
          {translate("products")}
        </MenuItem>
        <MenuItem
          value={"supplier"}
          sx={{
            fontFamily: theme.fontFamily.secondary,
            fontSize: 14,
            fontWeight: theme.fontWeight.medium,
            textTransform: "capitalize",
          }}
        >
          {translate("supplier")}
        </MenuItem>
      </Select>
      <Box
        height={"24px"}
        width={"1px"}
        bgcolor={theme.palette.grey[400]}
        mx={"16px"}
      />
      <Box
        display={"flex"}
        alignItems={"center"}
        width={"100%"}
        position={"relative"}
      >
        <IoMdSearch size={24} color={"#0C71B9"} />
        <TextField
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              fontFamily: theme.fontFamily.secondary,
            },
          }}
          onKeyDown={handleKeyDown}
          value={valueInput}
          placeholder={translate("placeHolderSearch")}
          onFocus={(e) => handleFocusInput(e)}
          onChange={handleOnChangeInput}
          InputProps={{
            sx: {
              input: {
                "&::placeholder": {
                  color: theme.palette.grey[400],
                },
              },
            },
          }}
        />
        {isFocusInput && valueInput !== "" && !loading && !isLoading && (
          <IconButton sx={{ mr: "10px" }} onClick={() => setValueInput("")}>
            <IoMdClose color="#0C71B9" size={18} />
          </IconButton>
        )}
        {loading ||
          (isLoading && (
            <CircularProgress
              className={classes.spinner}
              size={16}
              color="primary"
            />
          ))}
        {isFocusInput && (
          <SearchResult
            debouncedValue={debouncedValue}
            selectedSearchOption={selectedSearchOption}
            data={
              debouncedValue !== ""
                ? selectedSearchOption === "product"
                  ? data?.products.map((product) => ({
                      name: product.name,
                      id: product.slug,
                    }))
                  : supplierData?.companies.map((company) => ({
                      name: company.company_name,
                      id: company.slug,
                    }))
                : undefined
            }
            setIsFocusInput={setIsFocusInput}
            totalData={
              selectedSearchOption === "product"
                ? data?.metadata.total_data
                : supplierData?.metadata.total_data
            }
            recentlySearchResultParse={
              recentlySearchResult && JSON.parse(recentlySearchResult)
            }
            isSearchHeader
            css={{ paper: { width: "104%", top: "58px", left: "-16px" } }}
          />
        )}
      </Box>
    </Box>
  );
};

export default Search;
