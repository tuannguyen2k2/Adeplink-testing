"use client";
import { useClickOutside } from "@/hook/useClickOutside";
import useDevices from "@/hook/useDevices";
import {
  Box,
  IconButton,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoMdSearch } from "react-icons/io";
import SearchResult from "./SearchResult";
import Cookies from "js-cookie";
import { RECENTLY_SEARCH_RESULT } from "@/constant/cookies";
import { IoMdClose } from "react-icons/io";
import useDebounce from "@/hook/useDebounce";
import { useGetProductSearch } from "@/api/product/query";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { useRouter } from "next/navigation";

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
  const debouncedValue = useDebounce(valueInput, 500);
  const searchBoxRef = useRef<HTMLElement | null>(null);
  const locale = Cookies.get("NEXT_LOCALE");
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
    if (e.key === "Enter") {
      if (valueInput === "") {
        return;
      }
      e.preventDefault();
      const recentlySearchResult = Cookies.get(RECENTLY_SEARCH_RESULT);
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
      router.push(`/${locale}/product?keyword=${valueInput}`);
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
      return;
    }
    setLoading(true);
    getProductSearch({ keyword: debouncedValue });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
    }
  }, [isSuccess]);

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
        defaultValue={10}
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
          value={10}
          sx={{
            fontFamily: theme.fontFamily.secondary,
            fontSize: 14,
            fontWeight: theme.fontWeight.medium,
            textTransform: "capitalize",
          }}
        >
          {translate("supplier")}
        </MenuItem>
        <MenuItem
          value={30}
          sx={{
            fontFamily: theme.fontFamily.secondary,
            fontSize: 14,
            fontWeight: theme.fontWeight.medium,
            textTransform: "capitalize",
          }}
        >
          {translate("products")}
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
        {isFocusInput && valueInput !== "" && !loading && (
          <IconButton sx={{ mr: "10px" }} onClick={() => setValueInput("")}>
            <IoMdClose color="#0C71B9" size={18} />
          </IconButton>
        )}
        {loading && (
          <CircularProgress
            className={classes.spinner}
            size={16}
            color="primary"
          />
        )}
        {isFocusInput && (
          <SearchResult
            debouncedValue={debouncedValue}
            data={debouncedValue !== "" ? data?.products : undefined}
            setIsFocusInput={setIsFocusInput}
          />
        )}
      </Box>
    </Box>
  );
};

export default Search;
