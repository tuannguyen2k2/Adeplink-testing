"use client";
import { CheckCircleOutline, HighlightOff } from "@mui/icons-material";
import { Box, Icon, Typography, useTheme } from "@mui/material";

export const ValidatePasswordForm = ({
  validated,
}: {
  validated: {
    upperValidated: boolean;
    numberValidated: boolean;
    specialValidated: boolean;
    lengthValidated: boolean;
  };
}) => {
  const theme = useTheme();
  return (
    <Box
      color={"common.black"}
      display={"flex"}
      flexDirection={"column"}
      gap={1}
      bgcolor={"white"}
    >
      <Typography
        whiteSpace={"nowrap"}
        fontFamily={theme.fontFamily.secondary}
        fontSize={12}
      >
        The password must be:
      </Typography>
      <Box display={"flex"} gap={1} alignItems={"center"}>
        {validated.lengthValidated ? (
          <Icon
            component={CheckCircleOutline}
            fontSize="inherit"
            color="success"
          />
        ) : (
          <Icon component={HighlightOff} fontSize="inherit" color="error" />
        )}
        <Typography
          whiteSpace={"nowrap"}
          fontFamily={theme.fontFamily.secondary}
          fontSize={12}
          className="ml-1"
        >
          Between 8 and 20 characters long
        </Typography>
      </Box>
      <Box display={"flex"} gap={1} alignItems={"center"}>
        {validated.upperValidated ? (
          <Icon
            component={CheckCircleOutline}
            fontSize="inherit"
            color="success"
          />
        ) : (
          <Icon component={HighlightOff} fontSize="inherit" color="error" />
        )}
        <Typography
          whiteSpace={"nowrap"}
          fontFamily={theme.fontFamily.secondary}
          fontSize={12}
          className="ml-1"
        >
          Contains at least 1 upper case character
        </Typography>
      </Box>
      <Box display={"flex"} gap={1} alignItems={"center"}>
        {validated.numberValidated ? (
          <Icon
            component={CheckCircleOutline}
            fontSize="inherit"
            color="success"
          />
        ) : (
          <Icon component={HighlightOff} fontSize="inherit" color="error" />
        )}
        <Typography
          whiteSpace={"nowrap"}
          fontFamily={theme.fontFamily.secondary}
          fontSize={12}
          className="ml-1"
        >
          Contains at least 1 numberic character
        </Typography>
      </Box>
      <Box display={"flex"} gap={1} alignItems={"center"}>
        {validated.specialValidated ? (
          <Icon
            component={CheckCircleOutline}
            fontSize="inherit"
            color="success"
          />
        ) : (
          <Icon component={HighlightOff} fontSize="inherit" color="error" />
        )}
        <Typography
          fontFamily={theme.fontFamily.secondary}
          fontSize={12}
          className="ml-1"
        >
          {
            'Contains at least 1 special character: ~`!@#$%^&*()-_+={}[]|;:"<>,./?'
          }
        </Typography>
      </Box>
    </Box>
  );
};
