import React, { SetStateAction } from "react";
import { Button, Icon, Menu, MenuItem, useTheme } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { SortOption } from "@/constant/enum";

type SortComponentProps = {
  sortOrder: string;
  setSortOrder: React.Dispatch<SetStateAction<string>>;
};

const SortComponent = ({ sortOrder, setSortOrder }: SortComponentProps) => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: 2,
          width: 122,
          height: 42,
          marginBottom: 2,
          display: "flex",
          justifyContent: "space-between",
          px: 2,
        }}
      >
        {sortOrder} <Icon component={KeyboardArrowDown} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {Object.values(SortOption).map((item: string, id: number) => (
          <MenuItem
            key={id}
            sx={{ width: 122, "&:hover": { backgroundColor: theme.blue[100], color: theme.palette.primary.main, fontWeight: theme.fontWeight.semiBold } }}
            onClick={() => {
              setSortOrder(item);
              setAnchorEl(null);
            }}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SortComponent;
