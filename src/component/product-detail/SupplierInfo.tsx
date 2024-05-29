import { LocationOnOutlined } from "@mui/icons-material";
import { Box, Button, Icon, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import ChatIcon from "@/assets/icons/chat.svg";
import { SupplierDto } from "@/interface/common";

const supplierData = {
  id: 1,
  name: "Long name of supplier supplier supplier supplier... supplier... supplier... supplier...",
  image:
    "https://vietnamnomad.com/wp-content/uploads/2020/04/Best-places-to-visit-in-Vietnam-in-2021-Ha-Long-Bay-1024x640.jpg",
  category: "Category",
  location: "Location",
};

const SupplierInfo = ({ data }: { data?: SupplierDto }) => {
  const theme = useTheme();
  return (
    <Box
      width={"50%"}
      height={"100%"}
      minHeight={"120px"}
      display={"flex"}
      // flexDirection={"column"}
      bgcolor={theme.blue[100]}
      p={"16px"}
      mb={3}
      borderRadius={"10px"}
      border={`1px solid ${theme.blue[100]}`}
    >
      <Box width={88} height={88}>
        <Image
          src={
            data?.image ||
            "https://vietnamnomad.com/wp-content/uploads/2020/04/Best-places-to-visit-in-Vietnam-in-2021-Ha-Long-Bay-1024x640.jpg"
          }
          alt="product"
          width={88}
          height={88}
          style={{ width: "100%", height: "100%" }}
          className="rounded-lg"
        />
      </Box>

      <Box display={"flex"} flexDirection={"column"} justifyContent={"space-between"} ml={"16px"}  width={"100%"}>
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
          {data?.company_name}
        </Typography>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          width={"100%"}
          bgcolor={theme.blue[100]}
          borderRadius={"10px"}
          border={`1px solid ${theme.blue[100]}`}
        >
          <Box>
            <Typography
              color={theme.black[400]}
              fontStyle={"italic"}
              fontSize={14}
              fontWeight={theme.fontWeight.regular}
              fontFamily={theme.fontFamily.secondary}
              sx={{
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
              }}
            >
              {data?.main_category}
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
              <Icon
                component={LocationOnOutlined}
                sx={{ color: theme.palette.primary.main }}
                width={24}
                height={24}
              />
              {data?.country}
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"flex-end"}>
            <Button
              sx={{
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: 2,
                marginRight: 1,
                width: 93,
                height: 42,
              }}
            >
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SupplierInfo;
