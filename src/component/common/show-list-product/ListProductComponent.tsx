import React from "react";
import Link from "next/link";
import { KeyboardArrowRight } from "@mui/icons-material";
import { Box, Divider, Grid, Icon, Skeleton, Typography, useTheme } from "@mui/material";
import ProductItemComponent from "./ProductItemComponent";
import { ProductDto } from "@/interface/common";
import { MdArrowForwardIos } from "react-icons/md";
import { useRouter } from "next-nprogress-bar";
import ProductItemSkeleton from "../skeleton/ProductItemSkeleton";

type ListProductComponentProps = {
  title?: string;
  url: string;
  data?: ProductDto[];
};

const ListProductComponent = ({ title, url, data }: ListProductComponentProps) => {
  const theme = useTheme();
  const router = useRouter();
  return (
    <React.Fragment>
      {title && (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{
              fontWeight: theme.fontWeight.bold,
              fontSize: 20,
              fontFamily: theme.fontFamily.secondary,
              mb: 2,
            }}
          >
            {title}
          </Typography>
          <Box
            component={"button"}
            onClick={() => router.push(url)}
            display={"flex"}
            alignItems={"center"}
            gap={1}
            sx={{
              "&:hover": {
                color: theme.palette.primary.main,
                svg: {
                  fill: theme.palette.primary.main,
                },
              },
            }}
            color={theme.black[200]}
            fontSize={14}
            fontFamily={theme.fontFamily.secondary}
            fontWeight={theme.fontWeight.medium}
          >
            Explore more
            <MdArrowForwardIos size={14} color="#0C0C0C" />
          </Box>
        </Box>
      )}
      <Grid container width={"100%"} spacing={2}>
        {data
          ? data?.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} key={item.id} sx={{ display: "flex", justifyContent: "center" }}>
                <ProductItemComponent product={item} />
              </Grid>
            ))
          : Array.from(Array(10)).map((_, id) => (
              <Grid item xs={12} sm={6} md={4} lg={12 / 5} xl={12 / 5} key={id} sx={{ display: "flex", justifyContent: "center" }}>
                <ProductItemSkeleton />
              </Grid>
            ))}
      </Grid>
    </React.Fragment>
  );
};

export default ListProductComponent;
