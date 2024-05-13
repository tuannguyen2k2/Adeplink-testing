"use client";
import { RECENTLY_SEARCH_RESULT } from "@/constant/cookies";
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
import React, { useState } from "react";
import { LuClock5 } from "react-icons/lu";
type SearchResultType = {};

const SearchResult = () => {
  const theme = useTheme();
  const recentlySearchResult = Cookies.get(RECENTLY_SEARCH_RESULT);

  const recentlySearchResultParse =
    recentlySearchResult && JSON.parse(recentlySearchResult);
  return (
    <Paper
      elevation={2}
      sx={{
        width: "104%",
        bgcolor: "background.paper",
        position: "absolute",
        top: "58px",
        left: "-16px",
      }}
    >
      <List sx={{ pt: 0 }}>
        {recentlySearchResultParse?.map((value: string, index: number) => {
          return (
            <ListItem disablePadding key={index} sx={{ my: "6px" }}>
              <ListItemButton
                sx={{
                  p: "2px 20px",
                  "&:hover": {
                    bgcolor: theme.blue[700],
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: "20px" }}>
                  <LuClock5 color="#61646B" size={12} />
                </ListItemIcon>
                <ListItemText sx={{ m: 0 }}>
                  <Typography sx={{ fontSize: 14 }}>{value}</Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}

        <Box component={"button"} width={"100%"}>
          <Typography
            fontWeight={theme.fontWeight.medium}
            fontSize={14}
            color={theme.blue[500]}
            textAlign={"center"}
          >
            View all
          </Typography>
        </Box>
      </List>
    </Paper>
  );
};

export default SearchResult;
