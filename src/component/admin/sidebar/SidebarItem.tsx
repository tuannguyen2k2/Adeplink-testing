"use client";

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
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import React, { useMemo, useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";
import { GoDot } from "react-icons/go";

interface ISidebarItem {
  open: boolean;
  label: string;
  ICon: React.ComponentType<{ color?: string }>;
  url: string;

  subItems?: { label: string; path: string }[];
}

const SidebarItem = ({ open, label, ICon, subItems, url }: ISidebarItem) => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const getActive = (path: string) => {
    return pathname.includes(path);
  };

  const [_open, setOpen] = useState(false);

  const color = useMemo(() => {
    if (open) {
      return getActive(url) ? "#ffffff" : theme.black[100];
    } else {
      return getActive(url) ? theme.palette.primary.main : theme.black[100];
    }
  }, [open, url]);

  const handleClick = () => {
    if (subItems) {
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

            borderLeft: getActive(url) ? "4px solid #0B7ECA " : "",
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
              display: "flex",
              backgroundColor:
                open && getActive(url) ? theme.palette.primary.main : "",
              padding: open ? "14px 13px" : "",
              borderRadius: "6px",
              color: open && getActive(url) ? "#ffffff" : theme.black[100],
              "&:hover": {
                backgroundColor:
                  open && getActive(url) ? theme.palette.primary.main : "",
              },
              "& . MuiListItemButton-root": {},
            }}
            onClick={handleClick}
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
                {subItems && (
                  <> {_open ? <FaAngleDown /> : <FaAngleRight />} </>
                )}
              </>
            )}
          </ListItemButton>
        </Box>

        {open && (
          <Collapse in={_open} timeout="auto">
            <List component="div" disablePadding>
              {subItems &&
                subItems.map((item, index) => (
                  <Link key={`${index}-${item.path}`} href={item.path}>
                    <ListItemButton sx={{ pl: "30px" }}>
                      <ListItemIcon sx={{ minWidth: "24px" }}>
                        <GoDot
                          color={
                            getActive(item.path)
                              ? theme.palette.primary.main
                              : theme.black[100]
                          }
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        sx={{
                          "& .MuiTypography-root": {
                            fontFamily: theme.fontFamily.secondary,
                            fontWeight: theme.fontWeight.semiBold,
                            fontSize: "14px",
                            color: getActive(item.path)
                              ? theme.palette.primary.main
                              : theme.black[100],
                          },
                        }}
                      />
                    </ListItemButton>
                  </Link>
                ))}
            </List>
          </Collapse>
        )}
      </ListItem>
    </>
  );
};

export default SidebarItem;
