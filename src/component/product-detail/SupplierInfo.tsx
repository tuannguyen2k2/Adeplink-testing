import { LocationOnOutlined } from "@mui/icons-material";
import { Box, Button, Icon, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import ChatIcon from "@/assets/icons/chat.svg";
import { SupplierDto } from "@/interface/common";
import { convertImage } from "@/utils";
import NoImage from "@/assets/images/no-image.png";
import SupplierItemSkeleton from "../common/skeleton/SupplierItemSkeleton";
import { useRouter } from "next-nprogress-bar";
import { PRODUCT_PATH_URL } from "@/constant/pathUrl";
const SupplierInfo = ({ data }: { data?: SupplierDto }) => {
  const theme = useTheme();
  const router = useRouter()
  return (
    <>
      {data ? (
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
              src={convertImage(data?.image) || NoImage}
              alt="product"
              width={88}
              height={88}
              style={{ maxWidth: "88px", height: "100%" }}
              className="rounded-lg"
            />
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"space-between"}
            ml={"16px"}
            width={"100%"}
          >
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
                  onClick={() => router.push(`${PRODUCT_PATH_URL.PRODUCT_DETAIL}/${data.slug}`)}
                >
                  View details
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box width={"50%"}>
          <SupplierItemSkeleton />
        </Box>
      )}
    </>
  );
};

export default SupplierInfo;
