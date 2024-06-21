import { Box, TextField, useTheme } from "@mui/material";
import { useTranslations } from "next-intl";
import { IoMdSearch } from "react-icons/io";

const CSearch = ({
  width,
  sx,
  border,
}: {
  width: string;
  sx?: object;
  border?: string;
}) => {
  const theme = useTheme();

  const translate = useTranslations();

  return (
    <Box
      bgcolor={"common.white"}
      display={"flex"}
      alignItems={"center"}
      width={width}
      borderRadius={"8px"}
      border={border}
      pl={"16px"}
    >
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

            "& .MuiInputBase-input": {
              padding: "12px 14px",
              height: "24px",
            },
            ...sx,
          }}
          placeholder={translate("Search")}
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

export default CSearch;
