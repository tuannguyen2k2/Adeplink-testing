import { Box, Typography, useTheme } from "@mui/material";

type PriceType = {
  price: {
    total_range_price: number;
    min_price: number;
    max_price: number;
  };
};
export const Price = ({ price }: PriceType) => {
  const theme = useTheme();
  if (price.total_range_price == 0) {
    return (
      <Typography
        fontSize={14}
        color={theme.blue[500]}
        fontWeight={theme.fontWeight.regular}
        fontFamily={theme.fontFamily.secondary}
      >
        Contact for best prices
      </Typography>
    );
  } else if (price.total_range_price == 1) {
    return (
      <Box display={"flex"} gap={0.5}>
        <Typography
          fontSize={14}
          color={theme.blue[500]}
          fontWeight={theme.fontWeight.regular}
          fontFamily={theme.fontFamily.secondary}
        >
          Starting at
        </Typography>
        <Typography
          fontSize={14}
          color={theme.blue[500]}
          fontWeight={theme.fontWeight.medium}
          fontFamily={theme.fontFamily.secondary}
        >
          {price.min_price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
      </Box>
    );
  } else if (price.total_range_price >= 2) {
    return (
      <Box display={"flex"} gap={0.5}>
        <Typography
          fontSize={14}
          color={theme.blue[500]}
          fontWeight={theme.fontWeight.regular}
          fontFamily={theme.fontFamily.secondary}
        >
          From
        </Typography>
        <Typography
          fontSize={14}
          color={theme.blue[500]}
          fontWeight={theme.fontWeight.medium}
          fontFamily={theme.fontFamily.secondary}
        >
          {price.min_price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
        <Typography
          fontSize={14}
          color={theme.blue[500]}
          fontWeight={theme.fontWeight.regular}
          fontFamily={theme.fontFamily.secondary}
        >
          to
        </Typography>
        <Typography
          fontSize={14}
          color={theme.blue[500]}
          fontWeight={theme.fontWeight.medium}
          fontFamily={theme.fontFamily.secondary}
        >
          {price.max_price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Typography>
      </Box>
    );
  }
};
