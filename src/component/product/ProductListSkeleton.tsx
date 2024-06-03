"use client";
import NoImage from "@/assets/images/no-image.png";
import {
    Box,
    Divider,
    Grid,
    Skeleton,
    useTheme
} from "@mui/material";
import Image from "next/image";

const ProductListSkeleton = () => {
  const theme = useTheme();

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
      width={"100%"}
    >
      <Grid container spacing={10} width={"100%"} marginLeft={0} mt={0}>
        {Array(15)
          .fill(null)
          .map((_, index) => (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              xl={4}
              key={index}
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingLeft: "0!important",
                paddingTop: {
                  xl: index > 2 ? "20px!important" : "0!important",
                  lg: index > 2 ? "20px!important" : "0!important",
                  md: index > 1 ? "20px!important" : "0!important",
                  sm: index > 0 ? "20px!important" : "0!important",
                },
              }}
            >
              <Box
                sx={{
                  width: 300,
                  height: 450,
                  p: "16px",
                  backgroundColor: "white",
                  borderRadius: "16px",
                  border: `1px solid ${theme.blue[100]}`,
                }}
              >
                <Box width={268} height={268} position={"relative"}>
                  <Image
                    src={NoImage}
                    alt=""
                    fill
                    objectFit="fill"
                    className="rounded-lg"
                  />
                </Box>
                <Skeleton width={130} />
                <Skeleton />
                <Skeleton sx={{ mb: 2 }} />
                <Divider sx={{ borderColor: theme.blue[600] }} />
                <Skeleton sx={{ mt: 1 }} />
                <Skeleton width={100} />
              </Box>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default ProductListSkeleton;
