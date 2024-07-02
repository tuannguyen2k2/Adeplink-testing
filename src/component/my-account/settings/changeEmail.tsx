import { useChangeEmail } from "@/api/user/query";
import { CInput } from "@/component/common/input";
import { checkEmail, freeEmailDomains } from "@/constant/regex";
import { Box, Button, Modal, Typography, useTheme } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface IChangeEmail {
  open: boolean;
  onClose: () => void;
  emailInput: string;
  setEmailInput: Dispatch<SetStateAction<string>>;
  handleClickButtonVerify: () => void;
}

const ChangeEmail = ({
  open,
  onClose,
  emailInput,
  setEmailInput,
  handleClickButtonVerify,
}: IChangeEmail) => {
  const theme = useTheme();

  const [helperText, setHelperText] = useState("");

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-25px 0px 50px -12px rgba(0, 0, 0, 0.5)",
          alignItems: "center",
          borderRadius: "16px",
          maxWidth: "588px",
          padding: "24px 32px 32px",
          maxHeight: "100%",
          color: theme.black.main,
          "&:focus-visible": {
            outline: "none",
          },
        }}
        overflow={"auto"}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Box component={"button"} onClick={onClose}>
            <IoMdClose size={24} color={theme.black.main} />
          </Box>
        </Box>
        <Box sx={{ display: "flex", marginTop: "24px" }}>
          <Typography
            fontFamily={theme.fontFamily.secondary}
            fontWeight={theme.fontWeight.semiBold}
            fontSize={25}
            color={theme.black.main}
          >
            Change your&nbsp;
          </Typography>
          <Typography
            fontFamily={theme.fontFamily.secondary}
            fontWeight={theme.fontWeight.semiBold}
            fontSize={25}
            color={theme.blue[500]}
          >
            email address
          </Typography>
        </Box>
        <Typography
          fontFamily={theme.fontFamily.secondary}
          fontWeight={theme.fontWeight.regular}
          fontSize={16}
          color={theme.black.main}
        >
          Enter your new email address to link with your account.
        </Typography>
        <Box sx={{ width: "100%", marginTop: "24px" }}>
          <CInput
            fullWidth
            label="New Email Address"
            placeholder="example@domain.com"
            value={emailInput}
            helperText={helperText}
            onChange={(e) => {
              setEmailInput(e.target.value);
              if (e.target.value == "") {
                setHelperText("");
                return;
              }
              if (!checkEmail.test(e.target.value)) {
                setHelperText("Please enter the correct format");
                return;
              }
              if (!freeEmailDomains.test(e.target.value)) {
                setHelperText("Professional email required");
                return;
              }
              setHelperText("");
            }}
          />
        </Box>

        <Box
          sx={{
            marginTop: "11px",
            fontSize: "14px",
            display: "flex",
            width: "100%",
            gap: "21px",
            justifyContent: "center",
            alignItems: "center",
            paddingX: "66px",
          }}
        >
          <Button
            sx={{
              backgroundColor:
                helperText != "" || emailInput == ""
                  ? "#DBE9FE"
                  : theme.palette.primary.main,
              color: "#ffffff",
              "&:hover": {
                backgroundColor:
                  helperText != "" || emailInput == ""
                    ? "#DBE9FE"
                    : theme.palette.primary.main,
              },
              pointerEvents:
                helperText != "" || emailInput == "" ? "none" : "auto",
              borderRadius: "8px",
              padding: "9px 30px",
              fontSize: "14px",
              width: "100%",
              fontFamily: theme.fontFamily.secondary,
              fontWeight: theme.fontWeight.medium,
            }}
            onClick={() => {
              handleClickButtonVerify();
              onClose();
            }}
          >
            Receive verification code
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChangeEmail;
