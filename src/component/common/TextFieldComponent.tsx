"use client";
import {
  Box,
  FormHelperText,
  TextField,
  TextFieldPropsSizeOverrides,
  Typography,
  useTheme,
} from "@mui/material";
import { OverridableStringUnion } from "@mui/types";
import { ChangeEvent, FocusEventHandler, HTMLInputTypeAttribute } from "react";
import {
  FieldError,
  RegisterOptions,
  UseFormRegisterReturn,
} from "react-hook-form";

type TextFieldComponentType = {
  name: string;
  label?: string;
  required?: boolean;
  error?: FieldError;
  placeholder?: string;
  defaultValue?: any;
  size?: OverridableStringUnion<
    "small" | "medium",
    TextFieldPropsSizeOverrides
  >;
  type?: HTMLInputTypeAttribute;
  rules?: RegisterOptions<any, string>;
  register: (
    name: any,
    options?: RegisterOptions<any, any>
  ) => UseFormRegisterReturn<any>;
  clearErrors?: () => void;
  readOnly?: boolean;
  vertical?: boolean;
  onChange?: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  endAdornment?: JSX.Element;
  value?: unknown;
  onFocus?:
    | FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
  onBlur?:
    | FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined;
};

const TextFieldComponent = ({
  name,
  label,
  required,
  error,
  placeholder,
  size = "small",
  defaultValue,
  type,
  rules,
  register,
  clearErrors,
  readOnly,
  vertical,
  onChange,
  endAdornment,
  value,
  onFocus,
  onBlur,
}: TextFieldComponentType) => {
  const theme = useTheme();
  return (
    <Box
      display={"flex"}
      flexDirection={vertical ? "column" : "row"}
      alignItems={vertical ? "start" : "center"}
      gap={"8px"}
      width={"100%"}
    >
      {label && (
        <Typography
          fontFamily={theme.fontFamily.secondary}
          color={theme.black[200]}
          fontWeight={theme.fontWeight.medium}
          fontSize={14}
          whiteSpace={"nowrap"}
          minWidth={128}
        >
          {label}
          {required && (
            <Typography component={"span"} color={theme.red[300]} ml={"4px"}>
              *
            </Typography>
          )}
        </Typography>
      )}

      <Box width={"100%"}>
        <TextField
          {...register(name, rules)}
          size={size}
          type={type}
          sx={{
            border: `1px solid ${theme.blue[600]}`,
            width: "100%",
            borderRadius: "8px",
            input: {
              fontFamily: theme.fontFamily.secondary,
              fontSize: 14,
            },
          }}
          value={value}
          placeholder={placeholder}
          error={!!error}
          onChange={(
            event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => {
            clearErrors && clearErrors();
            onChange && onChange(event);
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          InputProps={{
            readOnly: readOnly,
            endAdornment: endAdornment,
          }}
        />
        <FormHelperText
          error={true}
          sx={{
            fontFamily: theme.fontFamily.secondary,
            color: `${theme.red[300]}!important`,
            fontSize: 13,
          }}
        >
          {error?.message}
        </FormHelperText>
      </Box>
    </Box>
  );
};

export default TextFieldComponent;
