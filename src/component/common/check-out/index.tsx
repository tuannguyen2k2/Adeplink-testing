"use client";
import { MAX_WIDTH_APP } from "@/constant/css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import { IoIosArrowDown } from "react-icons/io";
import OrderSuccessfully from "./OrderSuccessfully";

const CheckOut = () => {
  const theme = useTheme();
  return (
    <Container
      sx={{
        mt: "184px",
        p: { xs: "20px!important", md: "0 88px!important" },
        maxWidth: `${MAX_WIDTH_APP}!important`,
      }}
    >
      {/* <Typography
        fontWeight={theme.fontWeight.bold}
        fontSize={24}
        fontFamily={theme.fontFamily.secondary}
      >
        Send Requests for Quotation
      </Typography>
      <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
        <Box width={"66%"}>
          <Accordion
            defaultExpanded
            sx={{
              mt: "0",
              fontFamily: theme.fontFamily.secondary,
              boxShadow: "none",
              border: `1px solid ${theme.blue[100]}`,
              borderRadius: "8px!important",
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
                height: "48px",
                "&.Mui-expanded": {
                  minHeight: "48px",
                  height: "48px!important",
                },
                borderRadius: "8px",
              }}
            >
              Supplier Name
            </AccordionSummary>
            <AccordionDetails>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                pl={"40px"}
                pr={"50px"}
              >
                <Typography
                  fontFamily={theme.fontFamily.secondary}
                  fontWeight={theme.fontWeight.semiBold}
                  fontSize={14}
                >
                  Item
                </Typography>
                <Box display={"flex"} gap={"100px"}>
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
            </AccordionDetails>
          </Accordion>
        </Box>
        <Box></Box>
      </Box> */}
      <OrderSuccessfully />
    </Container>
  );
};

export default CheckOut;
