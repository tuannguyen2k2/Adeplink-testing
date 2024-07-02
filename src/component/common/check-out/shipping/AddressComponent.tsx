"use client";
import { Box, Divider, Typography, useTheme } from "@mui/material";

type AddressComponentType = {
  data: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    address_line1?: string;
  };
  changeButton?: React.ReactNode;
  title: string;
  checkSameBillingAddress?: boolean;
};

const AddressComponent = ({
  data,
  changeButton,
  title,
  checkSameBillingAddress,
}: AddressComponentType) => {
  const theme = useTheme();
  return (
    <Box
      sx={{ border: `1px solid ${theme.blue[100]}`, p: "16px" }}
      borderRadius={"16px"}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography
          fontWeight={theme.fontWeight.semiBold}
          fontFamily={theme.fontFamily.secondary}
        >
          {title}
        </Typography>
        {changeButton}
      </Box>
      <Divider sx={{ borderColor: theme.blue[100], m: "10px 0 30px" }} />
      {!checkSameBillingAddress ? (
        <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
          <Typography
            fontWeight={theme.fontWeight.medium}
            fontFamily={theme.fontFamily.secondary}
          >
            {`${data?.first_name} ${data?.last_name} `}
          </Typography>
          <Typography fontFamily={theme.fontFamily.secondary}>
            {data?.phone}
          </Typography>
          <Typography fontFamily={theme.fontFamily.secondary}>
            {data?.address_line1}
          </Typography>
        </Box>
      ) : (
        <Typography
          fontWeight={theme.fontWeight.medium}
          fontFamily={theme.fontFamily.secondary}
          fontSize={14}
        >
          Same as shipping address
        </Typography>
      )}
    </Box>
  );
};

export default AddressComponent;
