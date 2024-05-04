"use client";
import Banner from "@/component/home/Banner";
import Category from "@/component/home/Category";
import RecommendedProduct from "@/component/home/RecommendedProduct";
import Supplier from "@/component/home/Supplier";
import { MAX_WIDTH_APP } from "@/constant/css";
import { Box, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    "@media (max-width: 600px)": {
      padding: "20px!important",
    },
  },
});
export default function Home() {
  const classes = useStyles();
  return (
    <>
      <Box>
        <Container
          className={classes.container}
          sx={{
            mt: "184px",
            p: "0 88px!important",
            maxWidth: `${MAX_WIDTH_APP}!important`,
          }}
        >
          <Banner />
          <Supplier />
          <Category />
        </Container>
      </Box>
      <RecommendedProduct />
    </>
  );
}
