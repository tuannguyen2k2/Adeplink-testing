"use client";
import { Box, Button, TextField, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ChangeEvent } from "react";

const useStyles = makeStyles({
  root: {
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& .MuiInputBase-input": {
      padding: 0,
    },
  },
});

type QuantityComponentType = {
  quantity?: number;
  handleIncreaseQuantity: () => void;
  handleDecreaseQuantity: () => void;
  handleOnChangeQuantityInput: (e: ChangeEvent<HTMLInputElement>) => void;
};

const QuantityComponent = ({
  quantity,
  handleIncreaseQuantity,
  handleDecreaseQuantity,
  handleOnChangeQuantityInput,
}: QuantityComponentType) => {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      border={`1px solid ${theme.palette.grey[100]}`}
      borderRadius={"8px"}
      height={"100%"}
      width={"100%"}
    >
      <Button
        sx={{
          minWidth: "42px",
          height: "100%",
          color: theme.black[200],
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          "&: hover": {
            bgcolor: "transparent",
          },
          p: "8px!important",
        }}
        onClick={handleDecreaseQuantity}
      >
        -
      </Button>
      <TextField
        type="number"
        className={classes.root}
        value={quantity}
        onChange={handleOnChangeQuantityInput}
        sx={{
          width: "70px",
          "& .MuiInputBase-input": {
            fontFamily: `${theme.fontFamily.secondary}!important`,
            textAlign: "center",
          },
        }}
      />
      <Button
        sx={{
          minWidth: "42px",
          height: "100%",
          color: theme.black[200],
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          "&: hover": {
            bgcolor: "transparent",
          },
          p: "8px!important",
        }}
        onClick={handleIncreaseQuantity}
      >
        +
      </Button>
    </Box>
  );
};

export default QuantityComponent;
