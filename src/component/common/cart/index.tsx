"use client";
import { MAX_WIDTH_APP } from "@/constant/css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import CheckboxComponent from "../CheckboxComponent";
import Image from "next/image";
import QuantityComponent from "../QuantityComponent";
import { IoCloseOutline } from "react-icons/io5";
import { IoIosInformationCircleOutline } from "react-icons/io";
import CartItem from "./CartItem";
const Cart = () => {
  const theme = useTheme();
  return (
    <Container
      sx={{
        mt: "184px",
        p: { xs: "20px!important", md: "0 88px!important" },
        maxWidth: `${MAX_WIDTH_APP}!important`,
      }}
    >
      <Typography
        fontFamily={theme.fontFamily.secondary}
        fontWeight={theme.fontWeight.bold}
        fontSize={24}
        mb={"24px"}
      >
        Cart
      </Typography>
      <Box display={"flex"} width={"100%"}>
        <Box width={"66%"}>
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
              <Box display={"flex"} gap={"20px"} alignItems={"center"}>
                <CheckboxComponent
                  id=""
                  handleOnCheck={() => console.log("hêlo")}
                  checked
                />
                <Typography
                  fontFamily={theme.fontFamily.secondary}
                  fontWeight={theme.fontWeight.semiBold}
                >
                  Supplier name
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                px={"40px"}
              >
                <Typography
                  fontFamily={theme.fontFamily.secondary}
                  fontWeight={theme.fontWeight.semiBold}
                  fontSize={14}
                >
                  Item
                </Typography>
                <Box display={"flex"} gap={"60px"}>
                  <Typography
                    fontFamily={theme.fontFamily.secondary}
                    fontWeight={theme.fontWeight.semiBold}
                    fontSize={14}
                  >
                    Order Quantity
                  </Typography>
                  <Typography
                    fontFamily={theme.fontFamily.secondary}
                    fontSize={14}
                    fontWeight={theme.fontWeight.semiBold}
                  >
                    Subtotal
                  </Typography>
                </Box>
              </Box>
              {Array(2)
                .fill(null)
                .map((_, index) => {
                  return <CartItem key={index} />;
                })}
              <Divider sx={{ borderColor: theme.blue[100], mx: "40px" }} />
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box></Box>
      </Box>
    </Container>
  );
};

export default Cart;
