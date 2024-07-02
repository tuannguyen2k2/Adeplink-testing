"use client";

import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import AddressForm from "./form";

const UpdateAddress = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #F0F6FF",
          borderRadius: "16px",
          width: "100%",
          height: "100%",
          padding: "16px",
        }}
      >
        <Typography
          fontFamily={theme.fontFamily.secondary}
          color={theme.black[200]}
          fontSize={16}
          fontWeight={theme.fontWeight.semiBold}
        >
          Edit shipping address
        </Typography>

        <Divider
          sx={{
            borderColor: theme.blue[600],
            marginTop: "8px",
            marginBottom: "24px",
          }}
        />

        <AddressForm />

        <Grid container sx={{ paddingX: "80px" }} spacing={2}>
          <Grid item xs={12} sm={6}>
            <div
              className={`font-medium text-[${theme.palette.primary.main}] cursor-pointer flex justify-center`}
            >
              Cancel
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                },
                borderRadius: "8px",
                padding: "9px 30px",
                fontSize: "14px",
                // maxWidth: "315px",
                width: "100%",
                fontFamily: theme.fontFamily.secondary,
                fontWeight: theme.fontWeight.medium,
              }}
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UpdateAddress;
