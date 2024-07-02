import { AddressType } from "@/interface/common";
import { Box, Radio, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { CgTrashEmpty } from "react-icons/cg";
import ConfirmDelete from "./confirm";

const AddressItem = ({
  checked,
  address,
  handleSetDefaultAddress,
  handleDeleteAddress,
  handleEditAddress
}: {
  checked?: boolean;
  address: AddressType;
  handleSetDefaultAddress: () => void;
  handleDeleteAddress: () => void;
  handleEditAddress: () => void;
}) => {
  const theme = useTheme();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      borderRadius={"8px"}
      border={checked ? `1px solid ${theme.palette.primary.main}` : 0}
      p={"10px"}
      mb={"16px"}
    >
      <Box display={"flex"} alignItems={"center"}>
        <Radio
          size="small"
          checked={checked}
          onClick={handleSetDefaultAddress}
        />
        <Box display={"flex"} flexDirection={"column"} gap={"8px"}>
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
            bgcolor={checked ? theme.blue[100] : "transparent"}
            width={"fit-content"}
            p={"1px 4px"}
            borderRadius={"4px"}
          >
            {checked
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
          onClick={handleEditAddress}
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
        handleDeleteSubmit={handleDeleteAddress}
      />
    </Box>
  );
};

export default AddressItem;
