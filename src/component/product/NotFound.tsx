import NotFoundImage from "@/assets/images/not_found.svg";
import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
const NotFound = () => {
  const theme = useTheme();
  return (
    <Box
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"start"}
      alignItems={"center"}
      gap={2}
    >
      <Image src={NotFoundImage} alt="not-found" />
      {/* <Box textAlign={"center"}>
        <Typography fontFamily={theme.fontFamily.secondary} mb={"10px"}>
          Sorry, we can’t find any products that match your criteria
        </Typography>
        <Typography fontFamily={theme.fontFamily.secondary}>Maybe try again with different criteria?</Typography>
      </Box> */}
      <Box textAlign={"center"}>
        <Typography fontFamily={theme.fontFamily.secondary}>
          Sorry, we can’t find any products that match your keywords
        </Typography>
        <Typography fontFamily={theme.fontFamily.secondary} mb={"10px"}>
          prompted keywords
        </Typography>
        <Typography fontFamily={theme.fontFamily.secondary}>
          Maybe try again with different or more general keywords?
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFound;
