/* eslint-disable react/no-unescaped-entities */
import { useDeleteAddress, useSetDefaultAddress } from "@/api/user/query";
import {
  AddressFormType,
  AddressType,
  ListAddressesType,
} from "@/interface/common";
import { Box, Divider, Radio, Typography, useTheme } from "@mui/material";
import { UseMutateFunction } from "@tanstack/react-query";
import { Modal } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CgTrashEmpty } from "react-icons/cg";
import AddressForm from "./AddressForm";
import { useForm } from "react-hook-form";
import ConfirmDelete from "@/component/my-account/address/confirm";

type ListAddressModalType = {
  openListAddressModal: boolean;
  getAddresses: UseMutateFunction<ListAddressesType, Error, void, unknown>;
  setOpenListAddressModal: Dispatch<SetStateAction<boolean>>;
  data?: ListAddressesType;
};
const ListAddressModal = ({
  openListAddressModal,
  setOpenListAddressModal,
  getAddresses,
  data,
}: ListAddressModalType) => {
  const theme = useTheme();
  const [addressChecked, setAddressChecked] = useState<number>(-1);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [detailAddress, setDetailAddress] = useState<AddressType | undefined>(
    undefined
  );
  const { deleteAddress, isSuccess: deleteSuccess } = useDeleteAddress();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { setDefaultAddress } = useSetDefaultAddress();
  const shippingAddressForm = useForm<AddressFormType>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  useEffect(() => {
    data &&
      data.addresses.forEach((address, index) => {
        if (address?.is_default) {
          setAddressChecked(index);
        }
      });
  }, [data]);

  useEffect(() => {
    if (deleteSuccess) {
      getAddresses();
    }
  }, [deleteSuccess]);

  const onCancel = () => {
    setOpenAddressModal(false);
    setOpenListAddressModal(true);
  };
  const handleSetDefaultAddress = () => {
    data?.addresses.map((address, index) => {
      if (index === addressChecked) {
        setDefaultAddress(address.id);
      }
    });
    getAddresses();
    setOpenListAddressModal(false);
  };
  return (
    <>
      <Modal
        open={openListAddressModal}
        onCancel={() => setOpenListAddressModal(false)}
        footer={false}
        closeIcon={null}
        style={{ left: -250 }}
      >
        <Box width={836}>
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
              fontFamily={theme.fontFamily.secondary}
              fontWeight={theme.fontWeight.medium}
              onClick={handleSetDefaultAddress}
            >
              Save
            </Box>
          </Box>
          <Divider sx={{ borderColor: theme.blue[100], my: "10px" }} />
          <Box
            component={"button"}
            color={theme.palette.primary.main}
            fontFamily={theme.fontFamily.secondary}
            fontWeight={theme.fontWeight.medium}
            mb={"10px"}
            onClick={() => {
              setOpenAddressModal(true);
              setOpenListAddressModal(false);
              setDetailAddress(undefined);
            }}
          >
            Add new address
          </Box>
          {data?.addresses?.length && data?.addresses?.length > 0 ? (
            <Box width={"100%"}>
              {data?.addresses?.map((address, index) => {
                return (
                  <Box
                    key={index}
                    display={"flex"}
                    justifyContent={"space-between"}
                    borderRadius={"8px"}
                    border={
                      addressChecked == index
                        ? `1px solid ${theme.palette.primary.main}`
                        : 0
                    }
                    p={"10px"}
                    mb={"16px"}
                  >
                    <Box display={"flex"} alignItems={"center"}>
                      <Radio
                        size="small"
                        checked={addressChecked == index}
                        onClick={() => setAddressChecked(index)}
                      />
                      <Box
                        display={"flex"}
                        flexDirection={"column"}
                        gap={"8px"}
                      >
                        <Typography
                          fontFamily={theme.fontFamily.secondary}
                          fontSize={14}
                          fontWeight={theme.fontWeight.medium}
                        >
                          {`${address.first_name} ${address.last_name}`}
                        </Typography>
                        <Typography
                          fontFamily={theme.fontFamily.secondary}
                          fontSize={14}
                          fontWeight={theme.fontWeight.medium}
                        >
                          {address.phone}
                        </Typography>
                        <Typography
                          fontFamily={theme.fontFamily.secondary}
                          fontSize={14}
                          fontWeight={theme.fontWeight.medium}
                        >
                          {address.address_line1}
                        </Typography>

                        <Typography
                          fontFamily={theme.fontFamily.secondary}
                          fontSize={12}
                          fontWeight={theme.fontWeight.medium}
                          color={theme.palette.primary.main}
                          bgcolor={
                            addressChecked == index
                              ? theme.blue[100]
                              : "transparent"
                          }
                          width={"fit-content"}
                          p={"1px 4px"}
                          borderRadius={"4px"}
                        >
                          {addressChecked == index
                            ? "Default shipping address"
                            : "Make this your default shipping address"}
                        </Typography>
                      </Box>
                    </Box>
                    <Box display={"flex"} gap={"10px"}>
                      <Box
                        component={"button"}
                        fontFamily={theme.fontFamily.secondary}
                        fontSize={14}
                        fontWeight={theme.fontWeight.medium}
                        color={theme.palette.primary.main}
                        height={"fit-content"}
                        onClick={() => {
                          setOpenAddressModal(true);
                          console.log(address);
                          setDetailAddress(address);
                          setOpenListAddressModal(false);
                        }}
                      >
                        Edit
                      </Box>
                      <Box
                        component={"button"}
                        fontFamily={theme.fontFamily.secondary}
                        fontSize={14}
                        fontWeight={theme.fontWeight.medium}
                        height={"fit-content"}
                        onClick={() => setOpenDeleteModal(true)}
                      >
                        <CgTrashEmpty size={18} />
                      </Box>
                    </Box>
                    <ConfirmDelete
                      open={openDeleteModal}
                      onClose={() => setOpenDeleteModal(false)}
                      handleDeleteSubmit={() => deleteAddress(address.id)}
                    />
                  </Box>
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
      </Modal>
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
    </>
  );
};

export default ListAddressModal;
