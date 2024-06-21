import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

interface ICSelect {
  label?: string;
  options: { title: string; value: number }[];
}

const CSelect = ({ label, options }: ICSelect) => {
  const theme = useTheme();

  const [value, setValue] = useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

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
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        onChange={handleChange}
        sx={{
          border: "1px solid #E6EFFB",
          borderRadius: "8px",

          "& .MuiSelect-icon": {
            color: "#0B7ECA",
            fontSize: "20px",
          },
          "& .MuiSelect-select": {
            padding: "14px 12px",
          },
          "&:active, :focus-within": {
            borderColor: "#80bdff",
            boxShadow: "0 2px 2px 3px rgba(11, 126, 202, 0.1)",
          },
          "& .MuiInputBase-root": {
            "&:focus-within": {
              boxShadow: "0 2px 2px 3px rgba(11, 126, 202, 0.1)",
            },
          },
        }}
        IconComponent={IoIosArrowDown}
        renderValue={(selected) => {
          if (selected.length === 0) {
            return <> --Choose--</>;
          }

          return selected;
        }}
      >
        {/* <MenuItem disabled value="">
          --Choose--
        </MenuItem> */}
        {options.map((item, index) => (
          <MenuItem value={item.value} key={index}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CSelect;
