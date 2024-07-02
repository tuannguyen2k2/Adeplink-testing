import { Box, Typography, useTheme } from "@mui/material";

const LabelForm = ({
  label,
  required,
}: {
  label: string;
  required?: boolean;
}) => {
  const theme = useTheme();

  return (
    <Box sx={{ height: "100%", paddingY: "14px" }}>
      <Typography
        color={theme.black.main}
        fontFamily={theme.fontFamily.secondary}
        fontWeight={theme.fontWeight.medium}
        fontSize={14}
        //   marginBottom={"8px"}
      >
        {label}

        {required && <span className=" text-[#DC2626]">*</span>}
      </Typography>
    </Box>
  );
};

export default LabelForm;
