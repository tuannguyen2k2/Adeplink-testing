"use client";

import { Box, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import Avatar from "@/assets/images/avatar244.png";
import ProfileForm from "./form";

const Profile = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #F0F6FF",
          borderRadius: "8px",
          display: "flex",
          gap: "16px",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            padding: "16px 28.5px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <Image
            src={Avatar}
            width={244}
            height={244}
            alt="avatar"
            className=" object-cover rounded-full"
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography
              fontFamily={theme.fontFamily.secondary}
              fontSize={14}
              fontWeight={theme.fontWeight.medium}
              color={theme.palette.primary.main}
              sx={{
                cursor: "pointer",
              }}
            >
              Upload image
            </Typography>

            <Typography
              color={theme.red[300]}
              fontFamily={theme.fontFamily.secondary}
              fontSize={14}
              fontWeight={theme.fontWeight.medium}
              mt={" 16px"}
              sx={{
                cursor: "pointer",
              }}
            >
              Delete
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", flex: 1 }}>
          <ProfileForm />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
