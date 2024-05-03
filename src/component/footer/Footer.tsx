"use client";
import { Box, Button, Link, Typography, useTheme } from "@mui/material";
import Logo from "@/assets/icons/logo.svg";
import CopyRight from "@/assets/icons/copyright.svg";
import Facebook from "@/assets/icons/facebook.svg";
import Instagram from "@/assets/icons/instagram.svg";
import Youtube from "@/assets/icons/youtube.svg";
import Image from "next/image";
import { useTranslations } from "next-intl";

const Footer = () => {
  const theme = useTheme();
  const translate = useTranslations();
  return (
    <footer style={{ marginTop: "100px" }}>
      <Box
        sx={(theme) => ({
          bgcolor: theme.blue[100],
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <Box
          maxWidth={1240}
          sx={{
            display: "flex",
            width: "100%",
            p: "30px 50px",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", width: "100%" }}>
            <Box display={"flex"} alignItems={"center"} flex={"55%"}>
              {/* <Image src={Logo} alt="logo" width={100} height={75} /> */}
              <Typography
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: "600",
                  fontSize: "24px",
                  fontFamily: theme.fontFamily.secondary,
                }}
              >
                Adeptlink
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "16px",
                    fontFamily: theme.fontFamily.secondary,
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                    textTransform: "capitalize",
                    pr: 2,
                    pb: 1,
                  }}
                >
                  {translate("about")} Adeptlink
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    mt: "14px",
                    fontSize: "14px",
                  }}
                >
                  <Link
                    sx={{ cursor: "pointer", textTransform: "capitalize" }}
                    underline="none"
                    color={"common.black"}
                    fontFamily={theme.fontFamily.secondary}
                  >
                    {translate("about")}
                  </Link>
                  <Link
                    sx={{ cursor: "pointer", textTransform: "capitalize" }}
                    underline="none"
                    color={"common.black"}
                    fontFamily={theme.fontFamily.secondary}
                  >
                    {translate("contact")}
                  </Link>
                  <Link
                    sx={{ cursor: "pointer", textTransform: "capitalize" }}
                    underline="none"
                    color={"common.black"}
                    fontFamily={theme.fontFamily.secondary}
                  >
                    {translate("privacyPolicy")}
                  </Link>
                  <Link
                    sx={{ cursor: "pointer" }}
                    underline="none"
                    color={"common.black"}
                    fontFamily={theme.fontFamily.secondary}
                  >
                    {translate("termOfService")}
                  </Link>
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "16px",
                    fontFamily: theme.fontFamily.secondary,
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                    pr: 2,
                    pb: 1,
                  }}
                >
                  {translate("newTo")}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    mt: "14px",
                    fontSize: "14px",
                  }}
                >
                  <Link
                    sx={{ cursor: "pointer", textTransform: "capitalize" }}
                    underline="none"
                    color={"common.black"}
                    fontFamily={theme.fontFamily.secondary}
                  >
                    {translate("blog")}
                  </Link>
                  <Link
                    sx={{ cursor: "pointer", textTransform: "capitalize" }}
                    underline="none"
                    color={"common.black"}
                    fontFamily={theme.fontFamily.secondary}
                  >
                    {translate("helpCenter")}
                  </Link>
                </Box>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  sx={{
                    fontWeight: "600",
                    fontSize: "16px",
                    width: "fit-content",
                    borderBottom: `2px solid ${theme.palette.primary.main}`,
                    pr: 2,
                    pb: 1,
                  }}
                >
                  {translate("ourSolutions")}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    mt: "14px",
                    fontSize: "14px",
                  }}
                >
                  <Link
                    sx={{ cursor: "pointer", textTransform: "capitalize" }}
                    underline="none"
                    color={"common.black"}
                    fontFamily={theme.fontFamily.secondary}
                  >
                    {translate("solution1")}
                  </Link>
                  <Link
                    sx={{ cursor: "pointer", textTransform: "capitalize" }}
                    underline="none"
                    color={"common.black"}
                    fontFamily={theme.fontFamily.secondary}
                  >
                    {translate("solution2")}
                  </Link>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          width={"100%"}
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Box
            sx={(theme) => ({
              height: "1px",
              width: "100%",
              bgcolor: theme.palette.grey[100],
              my: "6px",
            })}
          />
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            p={"20px 36px 20px 52px"}
            width={"100%"}
            maxWidth={1240}
          >
            <Box display={"flex"} gap={1}>
              <Image src={CopyRight} alt="copyright" width={20} height={20} />
              <Typography fontSize={14} color={"#434447"}>
                2024 Adeptlink. {translate("allRightsReserved")}
              </Typography>
            </Box>
            <Box display={"flex"}>
              <Box display={"flex"} gap={2} mr={"20px"}>
                <Image src={Facebook} alt="copyright" width={20} height={20} />
                <Image src={Instagram} alt="copyright" width={20} height={20} />
                <Image src={Youtube} alt="copyright" width={20} height={20} />
              </Box>
              {/* <Box display={"flex"} alignItems={"center"}>
                <Image src={Logo} alt="logo" width={30} height={30} />
                <Typography fontSize={14}>Adeptlink</Typography>
              </Box> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
