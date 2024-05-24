"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Icon,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import SupplierAvatar from "@/assets/images/login-background.png";
import { LocationOnOutlined } from "@mui/icons-material";
import ChatIcon from "@/assets/icons/chat.svg";
import { IoIosArrowDown } from "react-icons/io";
import AccordionComponent from "./AccordionComponent";
const SupplierInfo = () => {
  const theme = useTheme();
  return (
    <Box
      width={"100%"}
      p={"16px"}
      border={`1px solid ${theme.blue[100]}`}
      boxShadow={"0 2px 2px rgba(0, 0, 0, 0.1)"}
      borderRadius={"16px"}
    >
      <Box width={"100%"} display={"flex"} height={114}>
        <Box width={"100%"} display={"flex"}>
          <Box width={114} height={114}>
            <Image
              src={SupplierAvatar}
              alt="supplier avatar"
              className="h-full rounded-lg"
            />
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            ml={"16px"}
          >
            <Typography
              fontFamily={theme.fontFamily.secondary}
              fontSize={24}
              fontWeight={theme.fontWeight.medium}
            >
              Long name of supplier supplier supplier supplier... supplier...
              supplier
            </Typography>
            <Box>
              <Typography
                fontFamily={theme.fontFamily.secondary}
                fontStyle={"italic"}
                color={theme.black[400]}
              >
                Main category of business
              </Typography>
              <Box display={"flex"} alignItems={"center"}>
                <Icon
                  component={LocationOnOutlined}
                  sx={{ color: theme.palette.primary.main }}
                  width={24}
                  height={24}
                />
                <Typography
                  color={theme.black[200]}
                  fontWeight={theme.fontWeight.regular}
                  fontFamily={theme.fontFamily.secondary}
                  sx={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 1,
                    overflow: "hidden",
                    mt: "1px",
                    ml: "4px",
                  }}
                >
                  Viet Nam
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Button
          sx={{
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: 2,
            width: "fit-content",
            p: "12px 20px !important",
            height: 42,
            fontFamily: theme.fontFamily.secondary,
            display: "flex",
            alignItems: "center",
            gap: "3px",
          }}
        >
          <Image src={ChatIcon} alt="" width={20} height={20} /> Chat
        </Button>
      </Box>
      <AccordionComponent title="Description">
        <Typography fontSize={14} fontFamily={theme.fontFamily.secondary}>
          lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </AccordionComponent>
      <AccordionComponent title="Company Information">
        <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Box display={"flex"} gap={"4px"}>
            <Typography
              fontFamily={theme.fontFamily.secondary}
              fontWeight={theme.fontWeight.semiBold}
              fontSize={14}
            >
              Established on:
            </Typography>
            <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
              01/04/2013
            </Typography>
          </Box>
          <Box display={"flex"} gap={"4px"}>
            <Typography
              fontFamily={theme.fontFamily.secondary}
              fontWeight={theme.fontWeight.semiBold}
              fontSize={14}
            >
              Location:
            </Typography>
            <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
              City, State, CountryCity, State, CountryCity, State, Country
            </Typography>
          </Box>
          <Box display={"flex"} gap={"4px"}>
            <Typography
              fontFamily={theme.fontFamily.secondary}
              fontWeight={theme.fontWeight.semiBold}
              fontSize={14}
            >
              Main products:
            </Typography>
            <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
              Jute products with Customization
            </Typography>
          </Box>
          <Box display={"flex"} gap={"4px"}>
            <Typography
              fontFamily={theme.fontFamily.secondary}
              fontWeight={theme.fontWeight.semiBold}
              fontSize={14}
            >
              Website:
            </Typography>
            <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
              businessdomain.com
            </Typography>
          </Box>
          <Box display={"flex"} gap={"4px"}>
            <Typography
              fontFamily={theme.fontFamily.secondary}
              fontWeight={theme.fontWeight.semiBold}
              fontSize={14}
            >
              Joined AdeptLink since:
            </Typography>
            <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
              2024
            </Typography>
          </Box>
        </Box>
      </AccordionComponent>
     
        <AccordionComponent title="Contact">
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Box display={"flex"} gap={"4px"}>
              <Typography
                fontFamily={theme.fontFamily.secondary}
                fontWeight={theme.fontWeight.semiBold}
                fontSize={14}
              >
                Phone number:
              </Typography>
              <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
                0348 745 783
              </Typography>
            </Box>
            <Box display={"flex"} gap={"4px"}>
              <Typography
                fontFamily={theme.fontFamily.secondary}
                fontWeight={theme.fontWeight.semiBold}
                fontSize={14}
              >
                Email address:
              </Typography>
              <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
                abc@business.com
              </Typography>
            </Box>
          </Box>
        </AccordionComponent>
    </Box>
  );
};

export default SupplierInfo;