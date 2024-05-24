import { LocationOnOutlined } from "@mui/icons-material";
import { Box, Button, Grid, Icon, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import ChatIcon from "@/assets/icons/chat.svg";

const supplierData = {
  id: 1,
  name: "Long name of supplier supplier supplier supplier... supplier... supplier... supplier...",
  image: "https://vietnamnomad.com/wp-content/uploads/2020/04/Best-places-to-visit-in-Vietnam-in-2021-Ha-Long-Bay-1024x640.jpg",
  category: "Category",
  location: "Location",
};

const SupplierInfo = () => {
  const theme = useTheme();
  return (
    <>
      <Grid
        container
        component={Box}
        width={"50%"}
        height={"100%"}
        display={"flex"}
        // flexDirection={"column"}
        bgcolor={theme.blue[100]}
        p={"16px"}
        mb={3}
        borderRadius={"10px"}
        border={`1px solid ${theme.blue[100]}`}
      >
        <Grid item xs={2} display={"flex"} justifyContent={"left"} alignItems={"center"}>
          <Box width={88} height={88} position={"absolute"}>
            <Image src={supplierData.image} alt="product" fill objectFit="fill" className="rounded-lg" />
          </Box>
        </Grid>

        <Grid item xs={10}>
          <Typography
            color={theme.black[200]}
            fontWeight={theme.fontWeight.medium}
            fontFamily={theme.fontFamily.secondary}
            fontSize={16}
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
            }}
          >
            {supplierData.name}
          </Typography>
          <Grid
            container
            component={Box}
            display={"flex"}
            bgcolor={theme.blue[100]}
            borderRadius={"10px"}
            border={`1px solid ${theme.blue[100]}`}
          >
            <Grid item xs={6}>
              <Typography
                color={theme.black[400]}
                fontStyle={"italic"}
                fontSize={14}
                fontWeight={theme.fontWeight.regular}
                fontFamily={theme.fontFamily.secondary}
              >
                {supplierData.category}
              </Typography>
              <Typography
                color={theme.black[200]}
                fontWeight={theme.fontWeight.regular}
                fontFamily={theme.fontFamily.secondary}
                fontSize={14}
                sx={{
                  display: "flex",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                }}
              >
                <Icon component={LocationOnOutlined} sx={{ color: theme.palette.primary.main }} width={24} height={24} />
                {supplierData.location}
              </Typography>
            </Grid>
            <Grid item xs={6} display={'flex'} justifyContent={'flex-end'}>
              <Button sx={{ border: `1px solid ${theme.palette.primary.main}`, borderRadius: 2, marginRight: 1, width: 93, height: 42 }}>
                <Image src={ChatIcon} alt="" width={20} height={20} /> Chat
              </Button>
              <Button
                sx={{
                  bgcolor: `${theme.palette.primary.main} !important`,
                  color: "white",
                  fontWeight: theme.fontWeight.regular,
                  fontSize: 14,
                  borderRadius: 2,
                  width: 118,
                  height: 42,
                }}
              >
                View details
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SupplierInfo;
