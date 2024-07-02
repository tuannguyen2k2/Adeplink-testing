"use client";
import { useGetCart } from "@/api/cart/query";
import { SUPPLIER_CONTACT } from "@/constant/cookies";
import { MARGIN_BOTTOM_ON_FOOTER, MAX_WIDTH_APP } from "@/constant/css";
import { SupplierCartType } from "@/interface/common";
import { Box, Container, Typography, useTheme } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useState } from "react";
import SupplierAccordion from "../SupplierAccordion";
import OrderSummary from "./OrderSummary";

const SendRequest = () => {
  const theme = useTheme();
  const router = useRouter();
  const [supplierSent, setSupplierSent] = useState<string[]>([]);
  const [supplierTickedInCart, setSupplierTickedInCart] = useState<
    SupplierCartType[]
  >([]);
  const [totalItems, setTotalItems] = useState(0);
  const { getCart, data: cart } = useGetCart();
  const [isAllSendRequest, setIsAllSendRequest] = useState(false);
  useEffect(() => {
    getCart();
  }, []);

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
        }
      }
      const supplierContactIds = Cookies.get(SUPPLIER_CONTACT);
      if (supplierContactIds) {
        const supplierContactIdsParse: string[] =
          JSON.parse(supplierContactIds);
        console.log(supplierContactIdsParse);
        setSupplierTickedInCart(
          supplierTicked.filter((item) =>
            supplierContactIdsParse.includes(item.id)
          )
        );
        if (supplierContactIdsParse.length == supplierTicked.length) {
          setIsAllSendRequest(true);
        }
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
        mb: MARGIN_BOTTOM_ON_FOOTER,
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
              <SupplierAccordion
                key={data.id}
                data={data}
                totalItem={totalItem}
                setSupplierSent={setSupplierSent}
                supplierSent={supplierSent}
              />
            );
          })}
        </Box>
        <OrderSummary
          totalItems={totalItems}
          hasCheckOut={!isAllSendRequest}
          isAllSupplierSent={supplierSent.length == supplierTickedInCart.length}
        />
      </Box>
    </Container>
  );
};

export default SendRequest;
