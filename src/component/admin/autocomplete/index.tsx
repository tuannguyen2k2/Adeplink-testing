import { IOption } from "@/interface/common";
import {
  Autocomplete,
  FormControl,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";

interface ICAutocompleteAdmin {
  label?: string;
  onChange: (value?: any) => void;
  multiple?: boolean;
  options: IOption[];
}

const CAutocompleteAdmin = ({
  label,
  onChange,
  multiple,
  options,
}: ICAutocompleteAdmin) => {
  const theme = useTheme();

  const handleAutocompleteChange = (
    event: React.SyntheticEvent,
    value: IOption | IOption[] | null
  ) => {
    if (!onChange) return;
    if (value === null) {
      onChange(null);
    } else if (multiple && Array.isArray(value)) {
      onChange(value.map((e) => e.value));
    } else if (!multiple && !Array.isArray(value)) {
      onChange(value.value);
    }
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
      <Autocomplete
        options={options}
        renderInput={(params) => (
          <TextField {...params} placeholder={"--Choose--"} />
        )}
        multiple={multiple}
        onChange={handleAutocompleteChange}
        sx={{
          "& .MuiInputBase-root": {
            padding: "7px 8px",
          },
          border: `1px solid ${theme.blue[600]}`,
          borderRadius: "8px",

          "& .MuiAutocomplete-input": {
            fontSize: "14px",
          },
        }}
        popupIcon={
          <IoIosArrowDown color={theme.palette.primary.main} size={20} />
        }
        //   {...props}
      />
    </FormControl>
  );
};

export default CAutocompleteAdmin;
