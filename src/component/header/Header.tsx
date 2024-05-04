"use client";
import { MAX_WIDTH_APP } from "@/constant/css";
import {
  AppBar,
  Box,
  Hidden,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import CategoryPopover from "./CategoryPopover";
import Personal from "./Personal";
import Search from "./Search";


const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const router = useRouter();
  const translate = useTranslations();
  return (
    <AppBar
      sx={{
        height: "104px",
        display: "flex",
        flexDirection: "column",
        bgcolor: "transparent",
        alignItems: "center",
        boxShadow: `0px 6px 4px ${theme.blue[300]}`,
      }}
      elevation={0}
    >
      <Box
        width={"100%"}
        bgcolor={theme.blue[100]}
        py={"10px"}
        display={"flex"}
        justifyContent={"center"}
      >
        <Box
          // className={classes.box1}
          display={"flex"}
          maxWidth={MAX_WIDTH_APP}
          width={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
          pl={isMobile ? "24px" : "56px"}
          pr={"24px"}
        >
          <Box
            component={"button"}
            sx={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
          >
            <Typography
              color={theme.palette.primary.main}
              fontSize={32}
              fontWeight={theme.fontWeight.semiBold}
              fontFamily={theme.fontFamily.secondary}
            >
              Adeptlink
            </Typography>
          </Box>
          <Hidden mdDown>
            <Search />
          </Hidden>
          <Personal />
        </Box>
      </Box>
      <Box
        width={"100%"}
        height={"100%"}
        bgcolor={"common.white"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={"-1px"}
      >
        <Box
          height={"100%"}
          width={"100%"}
          maxWidth={MAX_WIDTH_APP}
          bgcolor={"white"}
          p={isMobile ? 0 : "0 88px"}
          justifyContent={isMobile ? "center" : "start"}
          mx={"36px"}
          display={"flex"}
          gap={"6%"}
        >
          <CategoryPopover />
          <Box
            component={"button"}
            fontWeight={theme.fontWeight.bold}
            fontFamily={theme.fontFamily.secondary}
            fontSize={12}
            color={theme.black[100]}
            textTransform={"uppercase"}
            pt={"8px"}
            pb={"7px"}
            sx={{
              "&:hover": {
                color: theme.blue[500],
              },
            }}
          >
            {translate("suppliers")}
          </Box>
          <Box
            component={"button"}
            fontWeight={theme.fontWeight.bold}
            fontFamily={theme.fontFamily.secondary}
            fontSize={12}
            color={theme.black[100]}
            pt={"8px"}
            pb={"7px"}
            textTransform={"uppercase"}
            sx={{
              "&:hover": {
                color: theme.blue[500],
              },
            }}
          >
            {translate("solutions")}
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
};

export default Header;
