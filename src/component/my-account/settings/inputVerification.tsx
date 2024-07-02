import { forwardRef } from "react";

import {
  IFormInputComponentProps,
  IFormInputComponentRef,
} from "@/interface/common";
import { SxProps, TextField, Theme, useTheme } from "@mui/material";

interface IInputVerficationRef extends IFormInputComponentRef {}
interface IInputVerficationProps extends IFormInputComponentProps {
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
export const InputVerfication = forwardRef<
  IInputVerficationRef,
  IInputVerficationProps
>(
  (
    {
      id,
      name,
      value,
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
            border: error ? `1px solid ${theme.red[300]}` : "none",
            borderRadius: "8px",
            height: "72px",
            width: "72px",
            backgroundColor: "#E5E7EB",
            color: error ? theme.red[300] : theme.black.main,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          "& .MuiInputBase-input": {
            padding: "10px",
            height: "100%",
            fontSize: "40px",
            textAlign: "center",
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
    );
  }
);

InputVerfication.defaultProps = {
  type: "text",
};
