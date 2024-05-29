"use client";
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
import { useRouter } from "next-nprogress-bar";
import { Dispatch, SetStateAction } from "react";
import { LuClock5 } from "react-icons/lu";
type ResultDataType = {
  name: string;
  id: string;
};

type SearchResultType = {
  debouncedValue: string;
  data?: ResultDataType[];
  selectedSearchOption: "supplier" | "product";
  setIsFocusInput: Dispatch<SetStateAction<boolean>>;
  recentlySearchResultParse?: { keyword: string; id: string }[];
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
                  text={value.keyword}
                  selectedSearchOption={selectedSearchOption}
                  id={value.id}
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
                key={value.id}
                selectedSearchOption={selectedSearchOption}
                text={value.name}
                id={value.id}
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
        {totalData && totalData > 5 ? (
          <Box
            component={"button"}
            width={"100%"}
            onClick={() => {
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
  text: string;
  id: string | null;
  isRecently?: boolean;
  selectedSearchOption: "supplier" | "product";
  setIsFocusInput?: Dispatch<SetStateAction<boolean>>;
  isSearchHeader?: boolean;
};

const SearchResultItem = ({
  text,
  id,
  isRecently,
  selectedSearchOption,
  setIsFocusInput,
  isSearchHeader,
}: SearchResultItemType) => {
  const theme = useTheme();
  const router = useRouter();
  const handleClickItem = () => {
    if (selectedSearchOption == "product") {
      if (!id) {
        router.push(
          `${PRODUCT_PATH_URL.PRODUCT_LIST}?${
            isSearchHeader
              ? `keyword=${text}`
              : `keyword_by_category=${text}&${getCateUrl()}`
          }`
        );
        setIsFocusInput && setIsFocusInput(false);
      } else {
        router.push(`${PRODUCT_PATH_URL.PRODUCT_DETAIL}/${id}`);
        setIsFocusInput && setIsFocusInput(false);
      }
    } else {
      if (!id) {
        router.push(`${SUPPLIER_PATH_URL.SUPPLIER_LIST}?keyword=${text}`);
        setIsFocusInput && setIsFocusInput(false);
      } else {
        router.push(`${SUPPLIER_PATH_URL.SUPPLIER_DETAIL}/${id}`);
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
            {text}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default SearchResult;
