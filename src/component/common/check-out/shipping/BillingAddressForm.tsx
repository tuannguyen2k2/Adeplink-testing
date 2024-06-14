import { BillingAddressFormType } from "@/interface/common";
import {
  Autocomplete,
  Box,
  Divider,
  Popper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Controller, useForm } from "react-hook-form";
import TextFieldComponent from "../../TextFieldComponent";
import {
  City,
  Country,
  ICity,
  ICountry,
  IState,
  State,
} from "country-state-city";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";

const BillingAddressForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BillingAddressFormType>();
  const theme = useTheme();
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>();
  const [selectedState, setSelectedState] = useState<IState | null>();
  const [selectedCity, setSelectedCity] = useState<ICity | null>();
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
        <Box
          display={"flex"}
          gap={"20px"}
          width={"100%"}
          mt={"10px"}
          justifyContent={"space-between"}
        >
          <Box
            display={"flex"}
            gap={"10px"}
            width={"100%"}
            alignItems={"center"}
          >
            <Typography
              fontFamily={theme.fontFamily.secondary}
              color={theme.black[200]}
              fontWeight={theme.fontWeight.medium}
              fontSize={14}
              whiteSpace={"nowrap"}
              minWidth={128}
            >
              Country
              <Typography component={"span"} color={theme.red[300]} ml={"4px"}>
                *
              </Typography>
            </Typography>
            <Controller
              name={"country"}
              control={control}
              render={({ field }) => (
                <Autocomplete
                  sx={{
                    border: `1px solid ${theme.blue[600]}`,
                    borderRadius: "8px",
                  }}
                  options={Country.getAllCountries()}
                  getOptionLabel={(country) => country.name}
                  value={selectedCountry}
                  size="small"
                  fullWidth
                  renderInput={(params) => (
                    <TextField {...params} label="" placeholder="Viet Nam" />
                  )}
                  PopperComponent={(props) => (
                    <Popper {...props} sx={{ zIndex: "2001!important" }} />
                  )}
                  popupIcon={
                    <MdOutlineKeyboardArrowDown size={18} color="#0B7ECA" />
                  }
                  onChange={(e, value: ICountry | null) => {
                    setValue("country", value as ICountry);
                    setSelectedCountry(value);
                  }}
                />
              )}
            />
          </Box>
          <Box
            display={"flex"}
            gap={"10px"}
            width={"100%"}
            alignItems={"center"}
          >
            <Typography
              fontFamily={theme.fontFamily.secondary}
              color={theme.black[200]}
              fontWeight={theme.fontWeight.medium}
              fontSize={14}
              whiteSpace={"nowrap"}
              minWidth={128}
            >
              State/Province
              <Typography component={"span"} color={theme.red[300]} ml={"4px"}>
                *
              </Typography>
            </Typography>
            <Controller
              name={"state"}
              control={control}
              render={({ field }) => (
                <Autocomplete
                  sx={{
                    border: `1px solid ${theme.blue[600]}`,
                    borderRadius: "8px",
                  }}
                  options={State.getStatesOfCountry(selectedCountry?.isoCode)}
                  getOptionLabel={(state) => state.name}
                  fullWidth
                  value={selectedState}
                  size="small"
                  disabled={!selectedCountry}
                  renderInput={(params) => (
                    <TextField {...params} label="" placeholder="Anh Tran" />
                  )}
                  PopperComponent={(props) => (
                    <Popper {...props} sx={{ zIndex: "2001!important" }} />
                  )}
                  popupIcon={
                    <MdOutlineKeyboardArrowDown size={18} color="#0B7ECA" />
                  }
                  onChange={(e, value: IState | null) => {
                    setValue("state", value as IState);
                    setSelectedState(value);
                  }}
                />
              )}
            />
          </Box>
        </Box>
        <Box
          display={"flex"}
          gap={"20px"}
          width={"100%"}
          mt={"10px"}
          justifyContent={"space-between"}
        >
          <Box
            display={"flex"}
            gap={"10px"}
            width={"100%"}
            alignItems={"center"}
          >
            <Typography
              fontFamily={theme.fontFamily.secondary}
              color={theme.black[200]}
              fontWeight={theme.fontWeight.medium}
              fontSize={14}
              whiteSpace={"nowrap"}
              minWidth={128}
            >
              City/Town
              <Typography component={"span"} color={theme.red[300]} ml={"4px"}>
                *
              </Typography>
            </Typography>
            <Controller
              name={"city"}
              control={control}
              render={({ field }) => (
                <Autocomplete
                  sx={{
                    border: `1px solid ${theme.blue[600]}`,
                    borderRadius: "8px",
                  }}
                  options={
                    selectedCountry && selectedState
                      ? City.getCitiesOfState(
                          selectedCountry?.isoCode,
                          selectedState?.isoCode
                        )
                      : []
                  }
                  getOptionLabel={(city) => city.name}
                  fullWidth
                  value={selectedCity}
                  disabled={!selectedState}
                  size="small"
                  renderInput={(params) => (
                    <TextField {...params} label="" placeholder="Adept Link" />
                  )}
                  PopperComponent={(props) => (
                    <Popper {...props} sx={{ zIndex: "2001!important" }} />
                  )}
                  popupIcon={
                    <MdOutlineKeyboardArrowDown size={18} color="#0B7ECA" />
                  }
                  onChange={(e, value: ICity | null) => {
                    setValue("city", value as ICity);
                    setSelectedCity(value);
                  }}
                />
              )}
            />
          </Box>
          <TextFieldComponent
            label="ZIP/Postal code"
            control={control}
            placeholder="700000"
            required
            rules={{ required: "Zip/Postal code required" }}
            error={!!errors.zipcode}
            name="zipcode"
            helperText={errors.zipcode?.message}
          />
        </Box>
      </form>
    </Box>
  );
};

export default BillingAddressForm;
