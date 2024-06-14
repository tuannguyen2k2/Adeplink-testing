import { BillingAddressFormType } from "@/interface/common";
import { Box, Divider, TextField, Typography, useTheme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Controller, useForm } from "react-hook-form";
import TextFieldComponent from "../../TextFieldComponent";

const BillingAddressForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BillingAddressFormType>();
  const theme = useTheme();
  return (
    <Box
      sx={{ border: `1px solid ${theme.blue[100]}`, p: "16px" }}
      borderRadius={"16px"}
    >
      <Box display={"flex"} justifyContent={"space-between"}>
        <Typography
          fontWeight={theme.fontWeight.semiBold}
          fontFamily={theme.fontFamily.secondary}
        >
          Billing address
        </Typography>
      </Box>
      <Divider sx={{ borderColor: theme.blue[100], m: "10px 0 30px" }} />
      <form style={{ width: "100%" }}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={"10px"}
          width={"100%"}
        >
          <TextFieldComponent
            label="Company Name"
            required
            rules={{ required: "Company required" }}
            control={control}
            placeholder="AIVision"
            error={!!errors.company}
            name="company"
            helperText={errors.company?.message}
          />
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            width={"100%"}
            gap={"20px"}
          >
            <TextFieldComponent
              label="First Name"
              required
              rules={{ required: "First Name required" }}
              control={control}
              placeholder="AIVision"
              error={!!errors.first_name}
              name="first_name"
              helperText={errors.first_name?.message}
            />
            <TextFieldComponent
              label="Last Name"
              required
              rules={{ required: "Last Name required" }}
              control={control}
              placeholder="AIVision"
              error={!!errors.last_name}
              name="Last_name"
              helperText={errors.last_name?.message}
            />
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            width={"100%"}
            gap={"20px"}
          >
            <TextFieldComponent
              label="Phone Number"
              required
              rules={{ required: "Phone Number required" }}
              control={control}
              placeholder="012392332"
              error={!!errors.phone}
              name="phone"
              helperText={errors.phone?.message}
            />
            <TextFieldComponent
              label="Email Address"
              control={control}
              placeholder="anh.mai@aivision.vn"
              error={!!errors.email}
              name="email"
              helperText={errors.email?.message}
            />
          </Box>
          <TextFieldComponent
            label="Address line 1"
            required
            rules={{ required: "Address line 1 required" }}
            control={control}
            placeholder="202 Le Lai, Pham Ngu Lao Ward, District 1, HCMC"
            error={!!errors.address_line1}
            name="address_line1"
            helperText={errors.address_line1?.message}
          />
          <TextFieldComponent
            label="Address line 2"
            required
            rules={{ required: "Address line 2 required" }}
            control={control}
            placeholder="202 Le Lai, Pham Ngu Lao Ward, District 1, HCMC"
            error={!!errors.address_line2}
            name="address_line2"
            helperText={errors.address_line2?.message}
          />
        </Box>
      </form>
    </Box>
  );
};

export default BillingAddressForm;
