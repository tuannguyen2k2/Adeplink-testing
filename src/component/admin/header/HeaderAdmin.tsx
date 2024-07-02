import { MAX_WIDTH_APP } from "@/constant/css";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import { GrLanguage } from "react-icons/gr";
import { IoMdNotificationsOutline } from "react-icons/io";

import Avatar from "@/assets/images/avatar_user.png";
import Image from "next/image";
import CSearch from "../search";

const HeaderAdmin = () => {
  const theme = useTheme();

  return (
    <>
      <AppBar sx={{ backgroundColor: theme.blue[100], boxShadow: "none" }}>
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
            pl={"317px"}
            pr={"54px"}
          >
            {/* search */}
            <CSearch
              width="50%"
              border={`1px solid ${theme.palette.grey[100]}`}
            />

            <Box display={"flex"} alignItems={"center"} gap={1} height={"100%"}>
              <IconButton>
                <GrLanguage size={23} color={"#0C71BA"} />
              </IconButton>

              <IconButton sx={{ marginRight: "26px" }}>
                <Badge
                  sx={{
                    "& .MuiBadge-badge": {
                      bgcolor: theme.red[100],
                      color: "white",
                      fontSize: "10px",
                      p: 0,
                    },
                  }}
                >
                  <IoMdNotificationsOutline size={24} color={"#0C71BA"} />
                </Badge>
              </IconButton>

              <Box
                component={"button"}
                id="account-button"
                aria-haspopup="true"
                display={"flex"}
                gap={"9px"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Image
                  src={Avatar}
                  alt="avatar"
                  width={49}
                  height={49}
                  className=" w-12 h-12 object-cover"
                />
                <Box textAlign={"left"}>
                  <Typography
                    color={"#404040"}
                    fontSize={14}
                    fontWeight={theme.fontWeight.bold}
                    fontFamily={theme.fontFamily.secondary}
                  >
                    Anh Mai
                  </Typography>
                  <Typography
                    color={"#565656"}
                    fontSize={12}
                    fontWeight={theme.fontWeight.semiBold}
                    fontFamily={theme.fontFamily.secondary}
                  >
                    Admin
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </AppBar>
    </>
  );
};

export default HeaderAdmin;
