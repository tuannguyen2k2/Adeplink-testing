/* eslint-disable react/no-unescaped-entities */
"use client";

import {
  useDeleteAddress,
  useGetAddresses,
  useSetDefaultAddress,
} from "@/api/user/query";
import { CREATE_ADDRESS_URL } from "@/constant/pathUrl";
import { Box, Button, Divider, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import AddressItem from "./addressItem";
import AddressForm from "@/component/common/check-out/shipping/AddressForm";
import { Modal } from "antd";
import { AddressFormType, AddressType } from "@/interface/common";
import { useForm } from "react-hook-form";

const Address = () => {
  const theme = useTheme();

  const { getAddresses, data } = useGetAddresses();
  const [addressChecked, setAddressChecked] = useState<number>(-1);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [detailAddress, setDetailAddress] = useState<AddressType | undefined>(
    undefined
  );
  const shippingAddressForm = useForm<AddressFormType>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { setDefaultAddress } = useSetDefaultAddress();
  const { deleteAddress, isSuccess: deleteSuccess } = useDeleteAddress();
  useEffect(() => {
    getAddresses();
  }, []);

  useEffect(() => {
    if (deleteSuccess) {
      getAddresses();
    }
  }, [deleteSuccess]);

  const onCancel = () => {
    setOpenAddressModal(false);
  };
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #F0F6FF",
          borderRadius: "8px",
          display: "flex",
          gap: "16px",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            padding: "24px 16px",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Typography
              fontFamily={theme.fontFamily.secondary}
              color={theme.black[200]}
              fontSize={16}
              fontWeight={theme.fontWeight.semiBold}
            >
              Saved Addresses
            </Typography>
            <Button
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                },
                borderRadius: "8px",
                padding: "12px 16px",
                fontSize: "14px",
                fontFamily: theme.fontFamily.secondary,
                fontWeight: theme.fontWeight.medium,
              }}
              onClick={() => {
                setOpenAddressModal(true);
                setDetailAddress(undefined);
              }}
            >
              Add new address
            </Button>
          </Box>
          <Divider
            sx={{
              borderColor: theme.blue[600],
              marginTop: "8px",
              marginBottom: "24px",
            }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {data?.addresses?.length && data?.addresses?.length > 0 ? (
              <Box width={"100%"}>
                {data?.addresses?.map((address, index) => {
                  return (
                    <AddressItem
                      key={address.id}
                      address={address}
                      checked={
                        addressChecked !== -1
                          ? addressChecked == index
                          : address.is_default
                      }
                      handleSetDefaultAddress={() => {
                        setAddressChecked(index);
                        setDefaultAddress(address.id);
                      }}
                      handleDeleteAddress={() => {
                        deleteAddress(address.id);
                      }}
                      handleEditAddress={() => {
                        setOpenAddressModal(true);
                        setDetailAddress(address);
                      }}
                    />
                  );
                })}
              </Box>
            ) : (
              <Box
                fontWeight={theme.fontWeight.medium}
                fontSize={14}
                fontFamily={theme.fontFamily.secondary}
                textAlign={"center"}
                height={"300px"}
              >
                You don't have addresses yet.
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Modal
        open={openAddressModal}
        footer={false}
        closeIcon={null}
        style={{ left: -250 }}
      >
        <Box width={836}>
          <AddressForm
            openAddressModal={openAddressModal}
            title={
              detailAddress ? "Edit shipping address" : "New shipping address"
            }
            isSaveAddress
            onCancel={onCancel}
            detail={detailAddress}
            onSuccess={() => {
              getAddresses();
              onCancel();
            }}
            addressForm={shippingAddressForm}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Address;
