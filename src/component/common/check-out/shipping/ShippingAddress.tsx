"use client";
import { userSelector } from "@/store/selector";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import CheckboxComponent from "../../CheckboxComponent";
import { ChangeEvent, useEffect, useState } from "react";
import AddressForm from "./AddressForm";
import ListAddressModal from "./ListAddressModal";
import { useGetAddresses } from "@/api/user/query";
import { AddressType } from "@/interface/common";

export const ShippingAddress = () => {
  const theme = useTheme();
  const [checkSame, setCheckSame] = useState(false);
  const [openListAddressModal, setOpenListAddressModal] = useState(false);
  const [addressDefault, setAddressDefault] = useState<AddressType>();
  const { getAddresses, data } = useGetAddresses();

  useEffect(() => {
    getAddresses();
  }, []);

  useEffect(() => {
    const address = data?.addresses.find((address) => address.is_default);
    address && setAddressDefault(address);
  }, [data]);

  return (
    <Box>
      {addressDefault ? (
        <Box
          sx={{ border: `1px solid ${theme.blue[100]}`, p: "16px" }}
          borderRadius={"16px"}
        >
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography
              fontWeight={theme.fontWeight.semiBold}
              fontFamily={theme.fontFamily.secondary}
            >
              Shipping address
            </Typography>
            <Box
              component={"button"}
              color={theme.palette.primary.main}
              onClick={() => setOpenListAddressModal(true)}
            >
              Change
            </Box>
            <ListAddressModal
              openListAddressModal={openListAddressModal}
              setOpenListAddressModal={setOpenListAddressModal}
              getAddresses={getAddresses}
              data={data}
            />
          </Box>
          <Divider sx={{ borderColor: theme.blue[100], m: "10px 0 30px" }} />
          <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
            <Typography
              fontWeight={theme.fontWeight.medium}
              fontFamily={theme.fontFamily.secondary}
            >
              {`${addressDefault?.first_name} ${addressDefault?.last_name} `}
            </Typography>
            <Typography fontFamily={theme.fontFamily.secondary}>
              {addressDefault?.phone}
            </Typography>
            <Typography fontFamily={theme.fontFamily.secondary}>
              {addressDefault?.address_line1}
            </Typography>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{ border: `1px solid ${theme.blue[100]}`, p: "16px" }}
          borderRadius={"16px"}
          width={"100%"}
        >
          <AddressForm title="Shipping Address" hasNoAddress />
        </Box>
      )}
      <Box display={"flex"} gap={"10px"} alignItems={"center"} my={"20px"}>
        <CheckboxComponent
          id={"Check same"}
          checked={checkSame}
          handleOnCheck={(e: ChangeEvent<HTMLInputElement>) =>
            setCheckSame(!checkSame)
          }
        />
        <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
          My billing and delivery information are the same.
        </Typography>
      </Box>
      {!checkSame && (
        <Box
          sx={{ border: `1px solid ${theme.blue[100]}`, p: "16px" }}
          borderRadius={"16px"}
          width={"100%"}
        >
          <AddressForm title="Billing Address"/>
        </Box>
      )}
    </Box>
  );
};

export default ShippingAddress;
