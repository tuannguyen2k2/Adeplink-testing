/* eslint-disable react/display-name */
import { ReactNode, forwardRef, useMemo, useState } from "react";
import {
  Autocomplete,
  Box,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  IFormInputComponentProps,
  IFormInputComponentRef,
  IOption,
} from "@/interface/common";
import { IoIosArrowDown } from "react-icons/io";

interface ICAutocompleteRef extends IFormInputComponentRef {}
interface ICAutocompleteProps extends IFormInputComponentProps {
  placeholder?: string;
  type?: string;
  multiple?: boolean;
  options?: IOption[];
  renderOption?: (props: any, option: IOption) => ReactNode;
  disableClearable?: boolean;
  fullWidth?: boolean;
  label?: string;
  required?: boolean;
}

export const CAutocomplete = forwardRef<ICAutocompleteRef, ICAutocompleteProps>(
  (
    {
      id,
      name,
      label,
      placeholder,
      options,
      value,
      onChange,
      multiple,
      renderOption,
      error,
      helperText,
      disableClearable,
      fullWidth,
      required,
      // getOptionLabel,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();
    const [inputValue, setInputValue] = useState("");

    const onValueChange = (
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

    const getOptionLabel = (option: IOption) => {
      return option.label;
    };

    return (
      <Box
        sx={{
          marginBottom: error ? "8px" : "21px",
        }}
      >
        {!!label && (
          <Typography
            color={theme.black.main}
            fontFamily={theme.fontFamily.secondary}
            fontWeight={theme.fontWeight.medium}
            fontSize={14}
            marginBottom={"8px"}
          >
            {label}

            {required && <span className=" text-[#DC2626]">*</span>}
          </Typography>
        )}
        <Autocomplete
          fullWidth={fullWidth}
          id={id}
          disableClearable={disableClearable}
          multiple={multiple}
          className={"c-autocomplete"}
          value={value}
          onChange={onValueChange}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          options={options || []}
          renderInput={(params) => (
            <TextField
              {...params}
              name={name}
              placeholder={placeholder}
              error={error}
              helperText={helperText}
              inputRef={ref}
            />
          )}
          renderOption={renderOption}
          getOptionLabel={getOptionLabel}
          sx={{
            "& .MuiInputBase-root": {
              padding: "5px 8px",
            },
            border: `1px solid ${theme.blue[600]}`,
            borderRadius: "8px",

            "& .MuiAutocomplete-input": {
              fontSize: "14px",
            },
          }}
          {...props}
          popupIcon={<IoIosArrowDown color={theme.black.main} size={20} />}
        />
      </Box>
    );
  }
);

CAutocomplete.defaultProps = {
  options: [],
  disableClearable: true,
};
