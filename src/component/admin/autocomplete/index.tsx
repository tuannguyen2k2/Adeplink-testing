import {
  Autocomplete,
  FormControl,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";

interface ICAutocomplete {
  label?: string;
}

const CAutocomplete = ({ label }: ICAutocomplete) => {
  const theme = useTheme();
  return (
    <FormControl fullWidth>
      <Typography
        fontWeight={theme.fontWeight.medium}
        fontFamily={theme.fontFamily.secondary}
        fontSize={14}
        sx={{ marginBottom: "8px" }}
      >
        {label}
      </Typography>
      <Autocomplete
        options={[]}
        renderInput={(params) => (
          <TextField {...params} placeholder={"--Choose--"} />
        )}
        sx={{
          "& .MuiInputBase-root": {
            padding: "7px 8px",
          },
          border: "1px solid #E6EFFB",
          borderRadius: "8px",

          "& .MuiAutocomplete-input": {
            fontSize: "14px",
          },
        }}
        popupIcon={<IoIosArrowDown color="#0B7ECA" size={20} />}
        //   {...props}
      />
    </FormControl>
  );
};

export default CAutocomplete;
