"use client";
import {
  Box,
  Hidden,
  IconButton,
  Modal,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { IoIosClose, IoMdClose, IoMdSearch } from "react-icons/io";
import Search from "../Search";

const SearchMobile = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  return (
    <Hidden mdUp>
      <IconButton onClick={handleOpen}>
        <IoMdSearch size={24} color={"#0C71B9"} />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            bgcolor: theme.blue[100],
            p: "30px 10px",
          }}
        >
          <Box display={"flex"}>
            <Search />
            <Box
              component={"button"}
              onClick={handleClose}
              ml={"1%"}
              p={"15px"}
              bgcolor={"common.white"}
              width={"fit-content"}
              height={"fit-content"}
              borderRadius={"50%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
            >
              <IoMdClose size={26} color={"#0C71B9"} />
            </Box>
          </Box>
        </Box>
      </Modal>
    </Hidden>
  );
};

export default SearchMobile;
