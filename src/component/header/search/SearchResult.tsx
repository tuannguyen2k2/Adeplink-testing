"use client";
import { RECENTLY_SEARCH_RESULT } from "@/constant/cookies";
import { ProductSearchDto, SearchCookiesType } from "@/interface/common";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { LuClock5 } from "react-icons/lu";
type SearchResultType = {
  debouncedValue: string;
  data?: ProductSearchDto[];
  setIsFocusInput: Dispatch<SetStateAction<boolean>>;
};

const SearchResult = ({
  debouncedValue,
  data,
  setIsFocusInput,
}: SearchResultType) => {
  const theme = useTheme();
  const recentlySearchResult = Cookies.get(RECENTLY_SEARCH_RESULT);
  const router = useRouter();
  const locale = Cookies.get("NEXT_LOCALE");
  const recentlySearchResultParse =
    recentlySearchResult && JSON.parse(recentlySearchResult);

  return (
    <Paper
      elevation={2}
      sx={{
        display: !recentlySearchResultParse && !data ? "none" : "block",
        width: "104%",
        bgcolor: "background.paper",
        position: "absolute",
        top: "58px",
        left: "-16px",
      }}
    >
      <List sx={{ pt: 0 }}>
        {debouncedValue === "" &&
          recentlySearchResultParse?.map(
            (value: SearchCookiesType, index: number) => {
              return (
                <SearchResultItem
                  key={index}
                  text={value.keyword}
                  id={value.id}
                  isRecently
                  setIsFocusInput={setIsFocusInput}
                />
              );
            }
          )}
        {debouncedValue !== "" &&
          data?.map((value: ProductSearchDto, index: number) => {
            return (
              <SearchResultItem
                key={value.id}
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
        {data && data?.length > 0 && (
          <Box
            component={"button"}
            width={"100%"}
            onClick={() => {
              router.push(`/${locale}/product?keyword=${debouncedValue}`);
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
        )}
      </List>
    </Paper>
  );
};

type SearchResultItemType = {
  text: string;
  id: string | null;
  isRecently?: boolean;
  setIsFocusInput?: Dispatch<SetStateAction<boolean>>;
};

const SearchResultItem = ({
  text,
  id,
  isRecently,
  setIsFocusInput,
}: SearchResultItemType) => {
  const theme = useTheme();
  const router = useRouter();
  const locale = Cookies.get("NEXT_LOCALE");
  const handleClickItem = () => {
    if (!id) {
      router.push(`/${locale}/product?keyword=${text}`);
      setIsFocusInput && setIsFocusInput(false);
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
          <Typography sx={{ fontSize: 14 }}>{text}</Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default SearchResult;
