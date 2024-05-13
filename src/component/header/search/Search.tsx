"use client";
import { useClickOutside } from "@/hook/useClickOutside";
import useDevices from "@/hook/useDevices";
import { Box, MenuItem, Select, TextField, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { IoIosArrowDown, IoIosArrowUp, IoMdSearch } from "react-icons/io";
import SearchResult from "./SearchResult";
import Cookies from "js-cookie";
import { RECENTLY_SEARCH_RESULT } from "@/constant/cookies";

const Search = () => {
  const theme = useTheme();
  const translate = useTranslations();
  const { isTablet } = useDevices();
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [isFocusInput, setIsFocusInput] = useState<boolean>(false);
  const [valueInput, setValueInput] = useState<string>("");
  const searchBoxRef = useRef<HTMLElement | null>(null);
  const handleFocusInput = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsFocusInput(true);
  };
  const handleClickOutSide = () => {
    setIsFocusInput(false);
  };
  useClickOutside(searchBoxRef, handleClickOutSide);
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (valueInput === "") {
      }
      e.preventDefault();
      const recentlySearchResult = Cookies.get(RECENTLY_SEARCH_RESULT);
      console.log(recentlySearchResult);
      if (recentlySearchResult) {
        const recentlySearchResultParse = JSON.parse(recentlySearchResult);
        if (recentlySearchResultParse.length === 5) {
          recentlySearchResultParse.pop();
        }
        Cookies.set(
          RECENTLY_SEARCH_RESULT,
          JSON.stringify([valueInput, ...recentlySearchResultParse])
        );
      } else {
        Cookies.set(RECENTLY_SEARCH_RESULT, JSON.stringify([valueInput]));
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
        {isFocusInput && <SearchResult />}
      </Box>
    </Box>
  );
};

export default Search;
