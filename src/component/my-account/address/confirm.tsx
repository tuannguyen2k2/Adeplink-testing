import { Box, Button, Modal, Typography, useTheme } from "@mui/material";

interface IConfirmDelete {
  open: boolean;
  onClose: () => void;
  handleDeleteSubmit: () => void;
}

const ConfirmDelete = ({
  open,
  onClose,
  handleDeleteSubmit,
}: IConfirmDelete) => {
  const theme = useTheme();

  return (
    <Modal open={open} onClose={onClose} style={{ zIndex: 3000 }}>
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
          alignItems: "center",
          borderRadius: "16px",
          maxWidth: "427px",
          padding: "20px",
          maxHeight: "100%",
          color: theme.black.main,
          gap: "16px",
          "&:focus-visible": {
            outline: "none",
          },
        }}
        overflow={"auto"}
      >
        <Typography
          fontFamily={theme.fontFamily.secondary}
          fontWeight={theme.fontWeight.semiBold}
          fontSize={16}
        >
          Deleting shipping address
        </Typography>
        <Typography
          fontFamily={theme.fontFamily.secondary}
          fontWeight={theme.fontWeight.regular}
          fontSize={14}
          color={theme.black[200]}
        >
          Are you sure you want to delete this shipping address?
        </Typography>
        <Box
          sx={{
            marginTop: "8px",
            fontSize: "14px",
            display: "flex",
            width: "100%",
            gap: "21px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            component={"button"}
            fontFamily={theme.fontFamily.secondary}
            fontSize={14}
            minWidth={99}
            minHeight={35}
            onClick={onClose}
          >
            No
          </Box>
          <Button
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "#ffffff",
              "&:hover": {
                backgroundColor: theme.palette.primary.main,
              },
              borderRadius: "8px",
              fontSize: "14px",
              minWidth: "99px",
              maxHeight: "35px",
              fontFamily: theme.fontFamily.secondary,
              fontWeight: theme.fontWeight.medium,
            }}
            onClick={handleDeleteSubmit}
          >
            Yes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmDelete;
