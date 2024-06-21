"use client";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Icon,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import NoImage from "@/assets/images/no-image.png";
import { LocationOnOutlined } from "@mui/icons-material";
import ChatIcon from "@/assets/icons/chat.svg";
import AccordionComponent from "./AccordionComponent";
import { SupplierDetailDto } from "@/interface/common";
import moment from "moment";
import { convertImage } from "@/utils";
const SupplierInfo = ({ data }: { data: SupplierDetailDto }) => {
  const theme = useTheme();

  return (
    <Box
      width={"100%"}
      p={"16px"}
      border={`1px solid ${theme.blue[100]}`}
      boxShadow={theme.boxShadow[100]}
      borderRadius={"16px"}
    >
      {data ? (
        <Box width={"100%"}>
          <Box width={"100%"} display={"flex"}>
            <Box width={114} height={114}>
              <Image
                src={convertImage(data.company.image) || NoImage}
                alt="supplier avatar"
                className="h-full rounded-lg"
                width={114}
                height={114}
                style={{ height: "100%", maxWidth: "144px" }}
              />
            </Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              width={"100%"}
            >
              <Box
                display={"flex"}
                flexDirection={"column"}
                justifyContent={"space-between"}
                ml={"16px"}
                alignItems={"start"}
              >
                <Typography
                  fontFamily={theme.fontFamily.secondary}
                  fontSize={24}
                  fontWeight={theme.fontWeight.medium}
                >
                  {data?.company?.company_name}
                </Typography>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"space-between"}
                >
                  <Box>
                    <Typography
                      fontFamily={theme.fontFamily.secondary}
                      fontStyle={"italic"}
                      color={theme.black[400]}
                    >
                      {data?.company.category_name}
                    </Typography>
                    <Box display={"flex"} alignItems={"center"}>
                      <Icon
                        component={LocationOnOutlined}
                        sx={{ color: theme.palette.primary.main }}
                        width={24}
                        height={24}
                      />
                      <Typography
                        color={theme.black[200]}
                        fontWeight={theme.fontWeight.regular}
                        fontFamily={theme.fontFamily.secondary}
                        sx={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                          overflow: "hidden",
                          mt: "1px",
                          ml: "4px",
                        }}
                      >
                        {data?.company?.country}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Button
                sx={{
                  border: `1px solid ${theme.palette.primary.main}`,
                  borderRadius: 2,
                  width: "fit-content",
                  p: "12px 20px !important",
                  height: 42,
                  fontFamily: theme.fontFamily.secondary,
                  display: "flex",
                  alignItems: "center",
                  gap: "3px",
                }}
              >
                <Image src={ChatIcon} alt="" width={20} height={20} /> Chat
              </Button>
            </Box>
          </Box>
        </Box>
      ) : (
        <SupplierInfoSkeleton />
      )}
      {data?.company?.introduction ? (
        <AccordionComponent title="Description">
          <Typography fontSize={14} fontFamily={theme.fontFamily.secondary}>
            {data.company.introduction}
          </Typography>
        </AccordionComponent>
      ) : null}
      {data &&
        (data.company.year_established ||
          data.company.address ||
          data.company.category_name ||
          data.company.website ||
          data.company.created_at) && (
          <AccordionComponent title="Company Information">
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {data && data.company.year_established ? (
                <Box display={"flex"} gap={"4px"}>
                  <Typography
                    fontFamily={theme.fontFamily.secondary}
                    fontWeight={theme.fontWeight.semiBold}
                    fontSize={14}
                  >
                    Established on:
                  </Typography>
                  <Typography
                    fontFamily={theme.fontFamily.secondary}
                    fontSize={14}
                  >
                    {moment(data.company.year_established).format("DD/MM/YYYY")}
                  </Typography>
                </Box>
              ) : null}
              {data && data.company.address ? (
                <Box display={"flex"} gap={"4px"}>
                  <Typography
                    fontFamily={theme.fontFamily.secondary}
                    fontWeight={theme.fontWeight.semiBold}
                    fontSize={14}
                  >
                    Location:
                  </Typography>
                  <Typography
                    fontFamily={theme.fontFamily.secondary}
                    fontSize={14}
                  >
                    {data.company.address}
                  </Typography>
                </Box>
              ) : null}
              {data.company.category_name ? (
                <Box display={"flex"} gap={"4px"}>
                  <Typography
                    fontFamily={theme.fontFamily.secondary}
                    fontWeight={theme.fontWeight.semiBold}
                    fontSize={14}
                  >
                    Main products:
                  </Typography>
                  <Typography
                    fontFamily={theme.fontFamily.secondary}
                    fontSize={14}
                  >
                    {data.company.category_name}
                  </Typography>
                </Box>
              ) : null}
              {data.company.website && (
                <Box display={"flex"} gap={"4px"}>
                  <Typography
                    fontFamily={theme.fontFamily.secondary}
                    fontWeight={theme.fontWeight.semiBold}
                    fontSize={14}
                  >
                    Website:
                  </Typography>
                  <Typography
                    fontFamily={theme.fontFamily.secondary}
                    fontSize={14}
                  >
                    {data.company.website}
                  </Typography>
                </Box>
              )}
              {data.company.created_at ? (
                <Box display={"flex"} gap={"4px"}>
                  <Typography
                    fontFamily={theme.fontFamily.secondary}
                    fontWeight={theme.fontWeight.semiBold}
                    fontSize={14}
                  >
                    Joined AdeptLink since:
                  </Typography>
                  <Typography
                    fontFamily={theme.fontFamily.secondary}
                    fontSize={14}
                  >
                    {moment(data.company.created_at).format("YYYY")}
                  </Typography>
                </Box>
              ) : null}
            </Box>
          </AccordionComponent>
        )}
      {data && (data.company.phone || data.company.email) && (
        <AccordionComponent title="Contact">
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Box display={"flex"} gap={"4px"}>
              <Typography
                fontFamily={theme.fontFamily.secondary}
                fontWeight={theme.fontWeight.semiBold}
                fontSize={14}
              >
                Phone number:
              </Typography>
              <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
                {data.company.phone}
              </Typography>
            </Box>

            <Box display={"flex"} gap={"4px"}>
              <Typography
                fontFamily={theme.fontFamily.secondary}
                fontWeight={theme.fontWeight.semiBold}
                fontSize={14}
              >
                Email address:
              </Typography>
              <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
                {data.company.email}
              </Typography>
            </Box>
          </Box>
        </AccordionComponent>
      )}

      {/* {data?.company.phone || data?.company.email && (
        <AccordionComponent title="Contact">
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {data.company?.phone && (
              <Box display={"flex"} gap={"4px"}>
                <Typography fontFamily={theme.fontFamily.secondary} fontWeight={theme.fontWeight.semiBold} fontSize={14}>
                  Phone number:
                </Typography>
                <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
                  {data.company.phone}
                </Typography>
              </Box>
            )}
            {data.company?.email && (
              <Box display={"flex"} gap={"4px"}>
                <Typography fontFamily={theme.fontFamily.secondary} fontWeight={theme.fontWeight.semiBold} fontSize={14}>
                  Email address:
                </Typography>
                <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
                  {data.company.email}
                </Typography>
              </Box>
            )}
          </Box>
        </AccordionComponent>
      )} */}
    </Box>
  );
};

export default SupplierInfo;

const SupplierInfoSkeleton = () => {
  return (
    <Box width={"100%"}>
      <Box width={"100%"} display={"flex"}>
        <Skeleton
          variant="rectangular"
          width={114}
          height={114}
          sx={{ borderRadius: "8px" }}
        />

        <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            ml={"16px"}
          >
            <Skeleton width={400} height={45} />
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"space-between"}
              ml={"16px"}
            >
              <Box>
                <Skeleton width={200} height={40} />
                <Box display={"flex"} alignItems={"center"}>
                  <Skeleton width={300} height={40} />
                </Box>
              </Box>
            </Box>
          </Box>
          <Skeleton width={93} height={62} />
        </Box>
      </Box>
      <Skeleton width={"100%"} height={60} />
      <Skeleton width={"100%"} height={60} />
      <Skeleton width={"100%"} height={60} />
    </Box>
  );
};
