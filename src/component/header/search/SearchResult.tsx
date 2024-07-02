"use client";
import {
  RECENTLY_SEARCH_PRODUCT_RESULT,
  RECENTLY_SEARCH_SUPPLIER_RESULT,
} from "@/constant/cookies";
import { PRODUCT_PATH_URL, SUPPLIER_PATH_URL } from "@/constant/pathUrl";
import { SearchCookiesType } from "@/interface/common";
import { getCateUrl } from "@/utils";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next-nprogress-bar";
import { Dispatch, SetStateAction } from "react";
import { LuClock5 } from "react-icons/lu";
type ResultDataType = {
  name: string;
  slug: string;
};

type SearchResultType = {
  debouncedValue: string;
  data?: ResultDataType[];
  selectedSearchOption: "supplier" | "product";
  setIsFocusInput: Dispatch<SetStateAction<boolean>>;
  recentlySearchResultParse?: { keyword: string; slug: string }[];
  isSearchHeader?: boolean;
  totalData?: number | null;
  css?: {
    paper?: {
      width?: string;
      top?: string;
      left?: string;
    };
  };
};

const SearchResult = ({
  debouncedValue,
  data,
  setIsFocusInput,
  selectedSearchOption,
  recentlySearchResultParse,
  css,
  isSearchHeader = false,
  totalData,
}: SearchResultType) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Paper
      elevation={2}
      sx={{
        display: !recentlySearchResultParse && !data ? "none" : "block",
        width: css?.paper?.width || "100%",
        bgcolor: "background.paper",
        position: "absolute",
        top: css?.paper?.top || "50px",
        left: css?.paper?.left || "0px",
        zIndex: "1200",
      }}
    >
      <List sx={{ pt: 0 }}>
        {debouncedValue === "" &&
          recentlySearchResultParse &&
          recentlySearchResultParse?.map(
            (value: SearchCookiesType, index: number) => {
              return (
                <SearchResultItem
                  key={index}
                  keyword={value.keyword}
                  selectedSearchOption={selectedSearchOption}
                  slug={value.slug}
                  isRecently
                  setIsFocusInput={setIsFocusInput}
                  isSearchHeader={isSearchHeader}
                />
              );
            }
          )}
        {debouncedValue !== "" &&
          data?.map((value: ResultDataType, index: number) => {
            return (
              <SearchResultItem
                key={value.slug}
                selectedSearchOption={selectedSearchOption}
                keyword={value.name}
                slug={value.slug}
              />
            );
          })}

        {data && data?.length < 1 && (
          <Typography
            fontStyle={"italic"}
            fontSize={14}
            color={"rgba(147, 147, 147, 0.5)"}
            textAlign={"center"}
            pt={"10px"}
          >
            No results found
          </Typography>
        )}
        {totalData && totalData > 5 && debouncedValue !== "" ? (
          <Box
            component={"button"}
            width={"100%"}
            onClick={() => {
              let RECENTLY_SEARCH_RESULT;
              if (selectedSearchOption === "product") {
                RECENTLY_SEARCH_RESULT = RECENTLY_SEARCH_PRODUCT_RESULT;
              } else {
                RECENTLY_SEARCH_RESULT = RECENTLY_SEARCH_SUPPLIER_RESULT;
              }
              const searchValue = {
                keyword: debouncedValue,
                slug: null,
              };
              if (recentlySearchResultParse) {
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
              router.push(
                `${PRODUCT_PATH_URL.PRODUCT_LIST}?${
                  isSearchHeader
                    ? `keyword=${debouncedValue}`
                    : `keyword_by_category=${debouncedValue}&${getCateUrl()}`
                }`
              );
              setIsFocusInput(false);
            }}
          >
            <Typography
              fontWeight={theme.fontWeight.medium}
              fontSize={14}
              color={theme.blue[500]}
              textAlign={"center"}
            >
              View all
            </Typography>
          </Box>
        ) : null}
      </List>
    </Paper>
  );
};

type SearchResultItemType = {
  keyword: string;
  slug: string | null;
  isRecently?: boolean;
  selectedSearchOption: "supplier" | "product";
  setIsFocusInput?: Dispatch<SetStateAction<boolean>>;
  isSearchHeader?: boolean;
};

const SearchResultItem = ({
  keyword,
  slug,
  isRecently,
  selectedSearchOption,
  setIsFocusInput,
  isSearchHeader,
}: SearchResultItemType) => {
  const theme = useTheme();
  const router = useRouter();
  const handleClickItem = () => {
    if (selectedSearchOption == "product") {
      if (!slug) {
        router.push(
          `${PRODUCT_PATH_URL.PRODUCT_LIST}?${
            isSearchHeader
              ? `keyword=${keyword}`
              : `keyword_by_category=${keyword}&${getCateUrl()}`
          }`
        );
        setIsFocusInput && setIsFocusInput(false);
      } else {
        const searchValue = {
          keyword: keyword,
          slug: slug,
        };
        const recentlySearchResult = Cookies.get(
          RECENTLY_SEARCH_PRODUCT_RESULT
        );
        if (recentlySearchResult) {
          const recentlySearchResultParse = JSON.parse(recentlySearchResult);
          if (recentlySearchResultParse.length === 5) {
            recentlySearchResultParse.pop();
          }
          Cookies.set(
            RECENTLY_SEARCH_PRODUCT_RESULT,
            JSON.stringify([searchValue, ...recentlySearchResultParse])
          );
        } else {
          Cookies.set(
            RECENTLY_SEARCH_PRODUCT_RESULT,
            JSON.stringify([searchValue])
          );
        }
        router.push(`${PRODUCT_PATH_URL.PRODUCT_DETAIL}/${slug}`);
        setIsFocusInput && setIsFocusInput(false);
      }
    } else if (selectedSearchOption == "supplier") {
      if (!slug) {
        router.push(`${SUPPLIER_PATH_URL.SUPPLIER_LIST}?keyword=${keyword}`);
        setIsFocusInput && setIsFocusInput(false);
      } else {
        const searchValue = {
          keyword: keyword,
          slug: slug,
        };
        const recentlySearchResult = Cookies.get(
          RECENTLY_SEARCH_SUPPLIER_RESULT
        );
        if (recentlySearchResult) {
          const recentlySearchResultParse = JSON.parse(recentlySearchResult);
          if (recentlySearchResultParse.length === 5) {
            recentlySearchResultParse.pop();
          }
          Cookies.set(
            RECENTLY_SEARCH_SUPPLIER_RESULT,
            JSON.stringify([searchValue, ...recentlySearchResultParse])
          );
        } else {
          Cookies.set(
            RECENTLY_SEARCH_SUPPLIER_RESULT,
            JSON.stringify([searchValue])
          );
        }
        router.push(`${SUPPLIER_PATH_URL.SUPPLIER_DETAIL}/${slug}`);
        setIsFocusInput && setIsFocusInput(false);
      }
    }
  };
  return (
    <ListItem disablePadding sx={{ my: "6px" }}>
      <ListItemButton
        sx={{
          p: "2px 20px",
          "&:hover": {
            bgcolor: theme.blue[700],
          },
        }}
        onClick={handleClickItem}
      >
        {isRecently && (
          <ListItemIcon sx={{ minWidth: "20px" }}>
            <LuClock5 color="#61646B" size={12} />
          </ListItemIcon>
        )}
        <ListItemText sx={{ m: 0 }}>
          <Typography
            sx={{
              fontSize: 14,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 1,
              overflow: "hidden",
            }}
          >
            {keyword}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default SearchResult;
