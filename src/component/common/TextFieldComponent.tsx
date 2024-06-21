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
import { HTMLInputTypeAttribute } from "react";
import {
  Control,
  Controller,
  FieldError,
  RegisterOptions
} from "react-hook-form";

type TextFieldComponentType = {
  name: string;
  label: string;
  required?: boolean;
  control: Control<any>;
  error?: FieldError;
  placeholder?: string;
  defaultValue?: any;
  size?: OverridableStringUnion<
    "small" | "medium",
    TextFieldPropsSizeOverrides
  >;
  type?: HTMLInputTypeAttribute;
  rules?: Omit<
    RegisterOptions<any>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
};

const TextFieldComponent = ({
  name,
  label,
  required,
  control,
  error,
  placeholder,
  size = "small",
  defaultValue,
  type,
  rules,
}: TextFieldComponentType) => {
  const theme = useTheme();
  return (
    <Box display={"flex"} alignItems={"center"} gap={"10px"} width={"100%"}>
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
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field }) => (
          <Box width={"100%"}>
            <TextField
              {...field}
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
              placeholder={placeholder}
              error={!!error}
            />
            <FormHelperText error={true}>{error?.message}</FormHelperText>
          </Box>
        )}
      />
    </Box>
  );
};

export default TextFieldComponent;
