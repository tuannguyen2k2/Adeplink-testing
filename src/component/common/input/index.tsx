import { forwardRef } from "react";

import {
  IFormInputComponentProps,
  IFormInputComponentRef,
} from "@/interface/common";
import {
  Box,
  SxProps,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";

interface ICInputRef extends IFormInputComponentRef {}
interface ICInputProps extends IFormInputComponentProps {
  label?: string;
  key?: string | number;
  placeholder?: string;
  type?: string;
  startAdornment?: any;
  endAdornment?: any;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  sx?: SxProps<Theme>;
  fullWidth?: boolean;
  required?: boolean;
}

// eslint-disable-next-line react/display-name
export const CInput = forwardRef<ICInputRef, ICInputProps>(
  (
    {
      id,
      name,
      value,
      label,
      disabled,
      onChange,
      placeholder,
      type,
      error,
      helperText,
      startAdornment,
      endAdornment,
      fullWidth,
      required,
      sx,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

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
        <TextField
          fullWidth={fullWidth}
          inputRef={ref}
          id={id}
          name={name}
          value={value}
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          sx={{
            "& .MuiOutlinedInput-root": {
              border: error
                ? `1px solid ${theme.red[300]}`
                : `1px solid ${theme.blue[600]}`,
              borderRadius: "8px",
              height: "45px",
              boxShadow: error
                ? " 2px 2px 4px 2px rgba(239, 68, 68, 0.1)"
                : "none",
            },
            "& .MuiInputBase-input": {
              padding: "14px 12px",
              height: "100%",
            },
            "& .MuiFormHelperText-root": {
              color: theme.red[300],
              fontFamily: theme.fontFamily.secondary,
              fontWeight: theme.fontWeight.medium,
              fontSize: "13px",
              marginLeft: "0px",
            },
            ...sx,
          }}
          error={error}
          helperText={helperText}
          InputProps={{
            startAdornment,
            endAdornment,
          }}
          {...props}
        />
      </Box>
    );
  }
);

CInput.defaultProps = {
  type: "text",
};
