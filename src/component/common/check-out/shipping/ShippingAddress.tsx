"use client";
import { userSelector } from "@/store/selector";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import CheckboxComponent from "../../CheckboxComponent";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import AddressForm from "./AddressForm";
import ListAddressModal from "./ListAddressModal";
import { useGetAddresses } from "@/api/user/query";
import { AddressFormType, AddressType } from "@/interface/common";
import { UseFormReturn } from "react-hook-form";
import AddressComponent from "./AddressComponent";

export const ShippingAddress = ({
  shippingAddressForm,
  billingAddressForm,
  addressDefault,
  setAddressDefault,
  checkSameAddressBilling,
  setCheckSameAddressBilling,
}: {
  shippingAddressForm: UseFormReturn<AddressFormType, any, undefined>;
  billingAddressForm: UseFormReturn<AddressFormType, any, undefined>;
  addressDefault: AddressType | undefined;
  setAddressDefault: Dispatch<SetStateAction<AddressType | undefined>>;
  checkSameAddressBilling: boolean;
  setCheckSameAddressBilling: Dispatch<SetStateAction<boolean>>;
}) => {
  const theme = useTheme();
  const [openListAddressModal, setOpenListAddressModal] = useState(false);
  const { getAddresses, data } = useGetAddresses();

  useEffect(() => {
    getAddresses();
  }, []);

  useEffect(() => {
    const address = data?.addresses.find((address) => address.is_default);
    setAddressDefault(address);
  }, [data]);

  return (
    <Box>
      {addressDefault ? (
        <AddressComponent
          data={addressDefault}
          title="Shipping Address"
          changeButton={
            <Box>
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
          }
        />
      ) : (
        <Box
          sx={{ border: `1px solid ${theme.blue[100]}`, p: "16px" }}
          borderRadius={"16px"}
          width={"100%"}
        >
          <AddressForm
            title="Shipping Address"
            hasNoAddress
            addressForm={shippingAddressForm}
          />
        </Box>
      )}
      <Box display={"flex"} gap={"10px"} alignItems={"center"} my={"20px"}>
        <CheckboxComponent
          id={"Check same"}
          checked={checkSameAddressBilling}
          handleOnCheck={(e: ChangeEvent<HTMLInputElement>) =>
            setCheckSameAddressBilling(!checkSameAddressBilling)
          }
        />
        <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
          My billing and delivery information are the same.
        </Typography>
      </Box>
      {!checkSameAddressBilling && (
        <Box
          sx={{ border: `1px solid ${theme.blue[100]}`, p: "16px" }}
          borderRadius={"16px"}
          width={"100%"}
        >
          <AddressForm
            title="Billing Address"
            addressForm={billingAddressForm}
          />
        </Box>
      )}
    </Box>
  );
};

export default ShippingAddress;
