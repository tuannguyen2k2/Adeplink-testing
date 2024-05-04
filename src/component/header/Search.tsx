"use client";
import { useClickOutside } from "@/hook/useClickOutside";
import { Box, MenuItem, Select, TextField, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const useStyles = makeStyles({
  box1: {
    "@media (max-width: 900px)": {
      width: "100%",
    },
  },
});
const Search = () => {
  const theme = useTheme();
  const classes = useStyles();
  const translate = useTranslations();
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [isFocusInput, setIsFocusInput] = useState<boolean>(false);
  const searchBoxRef = useRef<HTMLElement | null>(null);
  useClickOutside(searchBoxRef, () => setIsFocusInput(false));
  return (
    <Box
      className={classes.box1}
      ref={searchBoxRef}
      bgcolor={"common.white"}
      display={"flex"}
      alignItems={"center"}
      width={"40%"}
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
          value={20}
          sx={{
            fontFamily: theme.fontFamily.secondary,
            fontSize: 14,
            fontWeight: theme.fontWeight.medium,
            textTransform: "capitalize",
          }}
        >
          {translate("category")}
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
      <Box display={"flex"} alignItems={"center"} width={"100%"}>
        <IoMdSearch size={24} color={"#0C71B9"} />
        <TextField
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              fontFamily: theme.fontFamily.secondary,
            },
          }}
          placeholder={translate("placeHolderSearch")}
          onFocus={() => setIsFocusInput(true)}
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
      </Box>
    </Box>
  );
};

export default Search;
