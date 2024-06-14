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
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { cartSelector, supplierContactSelector } from "@/store/selector";
import { SupplierCartType } from "@/interface/common";
import SupplierAccordion from "../SupplierAccordion";
import Cookies from "js-cookie";
import { SUPPLIER_CONTACT } from "@/constant/cookies";
import { useRouter } from "next-nprogress-bar";
import { CHECKOUT_PATH_URL } from "@/constant/pathUrl";

const SendRequest = () => {
  const theme = useTheme();
  const router = useRouter();
  const [supplierTickedInCart, setSupplierTickedInCart] = useState<
    SupplierCartType[]
  >([]);
  const [totalItems, setTotalItems] = useState(0);
  const cart = useSelector(cartSelector);

  useEffect(() => {
    if (cart) {
      const supplierTicked = [];
      for (let item of cart.items) {
        for (let product of item.product) {
          if (product.is_tick) {
            supplierTicked.push(item);
            break;
          }
          if (!product.is_tick && product.variant)
            for (let variant of product.variant) {
              if (variant.is_tick) {
                supplierTicked.push(item);
                break;
              }
            }
          break;
        }
      }
      const supplierContactIds = Cookies.get(SUPPLIER_CONTACT);
      if (supplierContactIds) {
        const supplierContactIdsParse: string[] =
          JSON.parse(supplierContactIds);
        setSupplierTickedInCart(
          supplierTicked.filter((item) =>
            supplierContactIdsParse.includes(item.id)
          )
        );
      }
    }
  }, [cart]);

  useEffect(() => {
    let total_items = 0;
    supplierTickedInCart.forEach((supplier) => {
      supplier.product.forEach((product) => {
        if (!product.variant && product.is_tick) {
          total_items += 1;
        } else if (product.variant) {
          product.variant.forEach((variant) => {
            if (variant.is_tick) {
              total_items += 1;
            }
          });
        }
      });
    });
    setTotalItems(total_items);
  }, [supplierTickedInCart]);

  return (
    <Container
      sx={{
        mt: "184px",
        p: { xs: "20px!important", md: "0 88px!important" },
        maxWidth: `${MAX_WIDTH_APP}!important`,
      }}
    >
      <Typography
        fontWeight={theme.fontWeight.bold}
        fontSize={24}
        fontFamily={theme.fontFamily.secondary}
        mb={"24px"}
      >
        Send Requests for Quotation
      </Typography>
      <Box display={"flex"} width={"100%"} justifyContent={"space-between"}>
        <Box width={"66%"}>
          {supplierTickedInCart?.map((data) => {
            let totalItem = 0;
            data.product.forEach((product) => {
              if (!product.variant && product.is_tick) {
                totalItem += 1;
              } else if (product.variant) {
                product.variant.forEach((variant) => {
                  if (variant.is_tick) {
                    totalItem += 1;
                  }
                });
              }
            });
            return (
              <SupplierAccordion key={data.id} data={data} totalItem={totalItem} />
            );
          })}
        </Box>
        <Box
          width={"32%"}
          p={"16px"}
          borderRadius={"8px"}
          border={`1px solid ${theme.blue[100]}`}
          boxShadow={`0px 4px 20px 2px rgba(0, 0, 0, 0.1)`}
          height={"fit-content"}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography
              fontFamily={theme.fontFamily.secondary}
              color={theme.black[200]}
              fontWeight={theme.fontWeight.semiBold}
              fontSize={20}
            >
              Order summary
            </Typography>
            <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
              Total: {totalItems} items
            </Typography>
          </Box>
          <Divider
            sx={{ borderColor: theme.blue[600], mt: "10px", mb: "20px" }}
          />
          <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
            Please complete your quote requests to proceed to the checkout page.
          </Typography>
          <Box
            fontFamily={theme.fontFamily.secondary}
            fontSize={14}
            textAlign={"center"}
            my={"20px"}
          >
            or
            <Typography
              component={"strong"}
              fontFamily={theme.fontFamily.secondary}
              fontSize={14}
              color={theme.palette.primary.main}
              fontWeight={theme.fontWeight.medium}
              onClick={() => router.push(CHECKOUT_PATH_URL)}
              sx={{ cursor: "pointer" }}
            >
              &nbsp;Skip to Checkout&nbsp;
            </Typography>
            now
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default SendRequest;
