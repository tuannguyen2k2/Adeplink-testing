import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { FaAngleDown, FaAngleRight } from "react-icons/fa6";

interface ISidebarItem {
  label: string;

  url: string;

  subItems?: { label: string; path: string }[];
}

const SidebarItem = ({ label, subItems, url }: ISidebarItem) => {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();

  const getActive = (path: string) => {
    return pathname.includes(path);
  };

  const [_open, setOpen] = useState(false);

  const handleClick = () => {
    if (subItems) {
      setOpen(!_open);
    }
  };

  return (
    <ListItem
      disablePadding
      sx={{
        display: "block",
        marginBottom: "8px",
      }}
    >
      {getActive(url) ? (
        <ListItemButton
          sx={{
            minHeight: 48,
            height: "50px",
            display: "flex",
            gap: "9px",
            padding: "0px",
            borderRadius: "6px",
            "&:hover": {
              backgroundColor: "inherit",
            },
            "& . MuiListItemButton-root": {},
          }}
          onClick={handleClick}
        >
          <Box
            sx={{
              width: "4.5px",
              height: "100%",
              display: "flex",
              backgroundColor: theme.palette.primary.main,
              borderTopRightRadius: "4px",
              borderBottomRightRadius: "4px",
            }}
          ></Box>
          <Box
            sx={{
              backgroundColor: theme.palette.primary.main,
              borderRadius: "6px",
              color: "#ffffff",
              display: "flex",
              justifyContent: "space-between",
              flex: 1,
              padding: "12px 20px 12px 16px",
              alignItems: "center",
            }}
          >
            <ListItemText
              primary={label}
              sx={{
                "& .MuiTypography-root": {
                  fontFamily: theme.fontFamily.secondary,
                  fontWeight: theme.fontWeight.semiBold,
                  fontSize: "14px",
                },
              }}
            />

            {_open ? <FaAngleDown /> : <FaAngleRight />}
          </Box>
        </ListItemButton>
      ) : (
        <ListItemButton
          sx={{
            display: "flex",
            padding: "11px 20px 11px 30px",
            borderRadius: "6px",

            "& . MuiListItemButton-root": {},
          }}
          onClick={handleClick}
        >
          <ListItemText
            primary={label}
            sx={{
              //   opacity: open ? 1 : 0,

              "& .MuiTypography-root": {
                fontFamily: theme.fontFamily.secondary,
                fontWeight: theme.fontWeight.semiBold,
                fontSize: "14px",
              },
            }}
          />
          {_open ? <FaAngleDown /> : <FaAngleRight />}
        </ListItemButton>
      )}

      <Collapse in={_open} timeout="auto">
        <List component="div" disablePadding>
          {subItems &&
            subItems.map((item, index) => (
              <Link key={`${index}-${item.path}`} href={item.path}>
                <ListItemButton sx={{ pl: "54px", py: "11px" }}>
                  <ListItemText
                    primary={item.label}
                    sx={{
                      "& .MuiTypography-root": {
                        fontFamily: theme.fontFamily.secondary,
                        fontWeight: getActive(item.path)
                          ? theme.fontWeight.semiBold
                          : theme.fontWeight.regular,
                        fontSize: "14px",
                        color: getActive(item.path)
                          ? theme.palette.primary.main
                          : theme.black.main,
                      },
                    }}
                  />
                </ListItemButton>
              </Link>
            ))}
        </List>
      </Collapse>
    </ListItem>
  );
};

export default SidebarItem;
