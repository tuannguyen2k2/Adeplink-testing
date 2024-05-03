"use client";
import { AppBar, Box, Typography, useTheme } from "@mui/material";
import Personal from "./Personal";
import { MAX_WIDTH_APP } from "@/constant/css";
import Search from "./Search";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import CategoryPopover from "./CategoryPopover";
const Header = () => {
  const theme = useTheme();
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
          display={"flex"}
          maxWidth={MAX_WIDTH_APP}
          width={"100%"}
          alignItems={"center"}
          justifyContent={"space-between"}
          pl={"56px"}
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
          <Search />
          <Personal />
        </Box>
      </Box>
      <Box
        width={"100%"}
        height={"100%"}
        bgcolor={"common.white"}
        pt={"8px"}
        pb={"7px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Box
          height={"100%"}
          width={"100%"}
          maxWidth={MAX_WIDTH_APP}
          bgcolor={"white"}
          px={"88px"}
          mx={"36px"}
          display={"flex"}
          gap={"64px"}
        >
          <CategoryPopover />
          <Box
            component={"button"}
            fontWeight={theme.fontWeight.bold}
            fontFamily={theme.fontFamily.secondary}
            fontSize={12}
            color={theme.black[100]}
            textTransform={"uppercase"}
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
