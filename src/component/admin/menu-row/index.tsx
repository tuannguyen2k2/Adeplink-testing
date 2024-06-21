import { Box, MenuItem } from "@mui/material";
import { HiDotsVertical } from "react-icons/hi";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { useState } from "react";

const MenuRow = () => {
  const [open, setOpen] = useState(false);
  return (
    <Box sx={{ display: "flex", alignItems: "center", height: "100%" }}>
      <div onClick={() => setOpen(!open)}>
        <HiDotsVertical />
      </div>
      {/* <Dropdown open={open}>
        <Menu>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Language settings</MenuItem>
          <MenuItem>Log out</MenuItem>
        </Menu>
      </Dropdown> */}
    </Box>
  );
};

export default MenuRow;
