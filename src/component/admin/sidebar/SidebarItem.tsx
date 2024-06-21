import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { GoDot } from "react-icons/go";

interface ISidebarItem {
  open: boolean;
  label: string;
  ICon: React.ComponentType<{ color?: string }>;
  url: string;
  active?: boolean;
  children?: { label: string; path: string }[];
}

const SidebarItem = ({ open, label, ICon, active, children }: ISidebarItem) => {
  const theme = useTheme();

  const [_open, setOpen] = useState(false);

  const color = useMemo(() => {
    if (open) {
      return active ? "#ffffff" : "#3F4958";
    } else {
      return active ? "#0B7ECA" : "#3F4958";
    }
  }, [open, active]);

  const handelClick = () => {
    if (children) {
      setOpen(!_open);
    }
  };

  return (
    <>
      <ListItem
        disablePadding
        sx={{
          display: "block",
          // paddingLeft: open ? "13px" : "",
          marginBottom: "8px",
          // borderLeft: active ? "4px solid #0B7ECA " : "",
        }}
      >
        <Box
          sx={{
            paddingLeft: open ? "13px" : "",

            borderLeft: active ? "4px solid #0B7ECA " : "",
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              display: "flex",
              backgroundColor: open && active ? "#0B7ECA" : "",
              padding: open ? "14px 13px" : "",
              borderRadius: "6px",
              color: open && active ? "#ffffff" : "#3F4958",
              "&:hover": {
                backgroundColor: open && active ? "#0B7ECA" : "",
              },
              "& . MuiListItemButton-root": {},
            }}
            onClick={handelClick}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                marginRight: open ? "16px" : "0",
                justifyContent: "center",
                display: "flex",
                fontSize: "24px",
              }}
            >
              {ICon && <ICon color={color} />}
            </ListItemIcon>
            {open && (
              <>
                <ListItemText
                  primary={label}
                  sx={{
                    opacity: open ? 1 : 0,

                    "& .MuiTypography-root": {
                      fontFamily: theme.fontFamily.secondary,
                      fontWeight: theme.fontWeight.semiBold,
                      fontSize: "14px",
                    },
                  }}
                />
                {children && (
                  <> {_open ? <FaAngleDown /> : <FaAngleRight />} </>
                )}
              </>
            )}
          </ListItemButton>
        </Box>

        {open && (
          <Collapse in={_open} timeout="auto">
            <List component="div" disablePadding>
              {children &&
                children.map((item, index) => (
                  <ListItemButton sx={{ pl: "30px" }} key={index}>
                    <ListItemIcon sx={{ minWidth: "24px" }}>
                      <GoDot />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      sx={{
                        "& .MuiTypography-root": {
                          fontFamily: theme.fontFamily.secondary,
                          fontWeight: theme.fontWeight.semiBold,
                          fontSize: "14px",
                        },
                      }}
                    />
                  </ListItemButton>
                ))}
            </List>
          </Collapse>
        )}
      </ListItem>
    </>
  );
};

export default SidebarItem;
