"use client";
import {
  Box,
  TextField,
  TextFieldPropsSizeOverrides,
  Typography,
  useTheme,
} from "@mui/material";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import {
  Control,
  Controller,
  FieldErrors,
  RegisterOptions,
  ValidationRule,
} from "react-hook-form";
import { OverridableStringUnion } from "@mui/types";

type TextFieldComponentType = {
  name: string;
  label: string;
  required?: boolean;
  control: Control<any>;
  helperText?: ReactNode;
  error?: boolean;
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
  helperText,
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
            error={error}
            helperText={helperText}
          />
        )}
      />
    </Box>
  );
};

export default TextFieldComponent;
