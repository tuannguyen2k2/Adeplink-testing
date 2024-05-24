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
import { ReactNode } from "react";

type AccordionComponentType = {
  title: string;
  children: ReactNode;
};

const AccordionComponent = ({ title, children }: AccordionComponentType) => {
  const theme = useTheme();
  return (
    <Accordion
      defaultExpanded
      sx={{
        mt: "16px",
        fontFamily: theme.fontFamily.secondary,
        boxShadow: "none",
        "&.MuiAccordion-root::before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<IoIosArrowDown color="#0C71B9" />}
        aria-controls="panel-content"
        id="panel"
        sx={{
          color: theme.palette.primary.main,
          fontWeight: theme.fontWeight.semiBold,
          bgcolor: theme.blue[100],
          height: "45px",
          "&.Mui-expanded": {
            minHeight: "45px",
            height: "45px",
          },
          borderRadius: "8px",
        }}
      >
        {title}
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionComponent;
