import { useClickOutside } from "@/hook/useClickOutside";
import { Box, TextField, Typography, useTheme } from "@mui/material";
import { useRef, useState } from "react";
import { IoMdSearch } from "react-icons/io";

const RelevantCategoryFilter = () => {
  const theme = useTheme();
  const [isFocusInput, setIsFocusInput] = useState<boolean>(false);
  const searchBoxRef = useRef<HTMLElement | null>(null);
  const handleClickOutSide = () => {
    setIsFocusInput(false);
  };
  useClickOutside(searchBoxRef, handleClickOutSide);

  const handleFocusInput = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setIsFocusInput(true);
  };
  return (
    <Box
      width={"100%"}
      p={"16px"}
      border={`1px solid ${theme.blue[100]}`}
      borderRadius={"16px"}
    >
      <Typography
        fontFamily={theme.fontFamily.secondary}
        fontWeight={theme.fontWeight.bold}
        fontSize={24}
        mb={"16px"}
      >
        Agriculture Crops
      </Typography>
      <Box
        width={"40%"}
        borderRadius={"8px"}
        display={"flex"}
        ref={searchBoxRef}
        alignItems={"center"}
        mb={"16px"}
        px={"16px"}
        border={
          isFocusInput
            ? `1px solid ${theme.palette.primary.main}`
            : `1px solid ${theme.palette.grey[100]}`
        }
      >
        <IoMdSearch size={24} color={"#0C71B9"} />
        <TextField
          sx={{
            width: "100%",
            "& .MuiOutlinedInput-root": {
              fontFamily: theme.fontFamily.secondary,
            },
          }}
          placeholder={"Search in Agriculture Crops"}
          onFocus={(e) => handleFocusInput(e)}
          InputProps={{
            sx: {
              input: {
                "&::placeholder": {
                  color: theme.palette.grey[400],
                },
                padding: "12px 0 12px 10px",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default RelevantCategoryFilter;
