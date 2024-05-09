import { Box, Typography } from "@mui/material";
import { Modal } from "antd";

type SupplierSignUpModalType = {
  openSupplierSignUpModal: boolean;
};

const SupplierSignUpModal = ({
  openSupplierSignUpModal,
}: SupplierSignUpModalType) => {
  return (
    <Modal open={openSupplierSignUpModal} footer={false}>
      <Box py={"40px"} px={"44px"} width={"fit-content"}>
        <Typography
          fontSize={30}
          whiteSpace={"nowrap"}
          className="font-bold  text-center font-sans"
        >
          Welcome to{" "}
          <span className="text-[#0C71BA] whitespace-nowrap">
            Supplier Center
          </span>
        </Typography>
        <Box
          whiteSpace={"nowrap"}
          className="text-center font-medium font-sans text-[16px] mt-1"
        >
          Just fulfill the form below and get your own Dashboard.
        </Box>
      </Box>
    </Modal>
  );
};

export default SupplierSignUpModal;
