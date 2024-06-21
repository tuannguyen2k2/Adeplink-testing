import {
  AddressDto,
  AddressFormType,
  AddressType,
  CityType,
  CountryType,
  StateType,
} from "@/interface/common";
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormHelperText,
  Popper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
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
import { ChangeEvent, useEffect, useState } from "react";
import { useEditAddress, useSaveAddress } from "@/api/user/query";
import CheckboxComponent from "../../CheckboxComponent";
import { countryData } from "@/constant";
import { useGetDistrictsVN, useGetProvincesVN } from "@/api/country/query";

const AddressForm = ({
  title,
  isSaveAddress,
  onCancel,
  detail,
  onSuccess,
  hasNoAddress,
}: {
  title: string;
  isSaveAddress?: boolean;
  onCancel?: () => void;
  onSuccess?: () => void;
  detail?: AddressType;
  hasNoAddress?: boolean;
}) => {
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    resetField,
    register,
    formState: { errors, isValid },
  } = useForm<AddressFormType>();
  const theme = useTheme();
  const { saveAddress, isSuccess: saveSuccess } = useSaveAddress();
  const { editAddress, isSuccess: editSuccess } = useEditAddress();
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>();
  const [selectedState, setSelectedState] = useState<StateType | null>();
  const [selectedCity, setSelectedCity] = useState<CityType | null>();
  const [isSaveAddressForLater, setIsSaveAddressForLater] = useState(false);
  useEffect(() => {
    if (detail) {
      setValue("company", detail.company);
      setValue("address_line1", detail.address_line1);
      detail?.address_line2
        ? setValue("address_line2", detail?.address_line2)
        : setValue("address_line2", "");
      detail?.email ? setValue("email", detail?.email) : setValue("email", "");
      setValue("first_name", detail.first_name);
      setValue("last_name", detail.last_name);
      setValue("phone", detail.phone);
      setValue("zipcode", detail.zipcode);

      const country = countryData.find(
        (country) => country.name == detail.country
      );
      if (country) {
        setValue("country", country.name);
        setSelectedCountry(country);
      }
      let state: StateType | undefined;
      State.getStatesOfCountry(country?.isoCode).forEach((s) => {
        if (s.name == detail.state) {
          state = {
            province_id: s.isoCode,
            province_name: s.name,
            province_type: s.name,
            province_iso_code: s.isoCode,
          };
        }
      });
      if (state) {
        setValue("state", state.province_name);
        setSelectedState(state);
      }
      let city: CityType | undefined;
      country &&
        state &&
        state.province_iso_code &&
        City.getCitiesOfState(
          country?.isoCode,
          state?.province_iso_code
        ).forEach((c) => {
          if (c.name == detail.city) {
            city = { district_id: c.name, district_name: c.name };
          }
        });
      if (city) {
        setSelectedCity(city);
        setValue("city", city.district_name);
      }
    } else {
      setValue("company", "");
      setValue("address_line1", "");
      setValue("address_line2", "");
      setValue("email", "");
      setValue("first_name", "");
      setValue("last_name", "");
      setValue("phone", "");
      setValue("zipcode", "");
      setValue("country", "");
      setSelectedCountry(null);
      setValue("state", "");
      setSelectedState(null);
      setValue("city", "");
      setSelectedCity(null);
    }
  }, [detail]);
  const { getProvincesVN, data: provincesDataVN } = useGetProvincesVN();
  const { getDistrictsVN, data: districtsDataVN } = useGetDistrictsVN();
  useEffect(() => {
    getProvincesVN();
  }, []);

  useEffect(() => {
    if (selectedState) {
      getDistrictsVN(selectedState.province_id);
    }
  }, [selectedState]);

  const getOptionsState = () => {
    if (selectedCountry?.name === "Viet Nam") {
      return provincesDataVN;
    } else if (selectedCountry?.name === "Canada") {
      return State.getStatesOfCountry(selectedCountry?.isoCode).map(
        (state) => ({
          province_id: state.isoCode,
          province_name: state.name,
          province_type: state.name,
          province_iso_code: state.isoCode,
        })
      );
    }
  };
  const getOptionsCity = () => {
    if (selectedCountry?.name === "Viet Nam") {
      return districtsDataVN;
    } else if (
      selectedCountry?.name === "Canada" &&
      selectedState?.province_iso_code
    ) {
      return City.getCitiesOfState(
        selectedCountry?.isoCode,
        selectedState?.province_iso_code
      ).map((city) => ({
        district_id: city.name,
        district_name: city.name,
      }));
    }
  };

  const onSubmit: SubmitHandler<AddressFormType> = async (data) => {
    if (isSaveAddress || isSaveAddressForLater) {
      const data = {
        company: getValues().company,
        email: getValues().email,
        address_line1: getValues().address_line1,
        address_line2: getValues().address_line2,
        first_name: getValues().first_name,
        last_name: getValues().last_name,
        country: getValues().country,
        state: getValues().state,
        city: getValues().city,
        phone: getValues().phone,
        zipcode: getValues().zipcode,
      };
      if (detail) {
        editAddress({ id: detail.id, data });
      } else {
        saveAddress(data);
      }
    }
  };
  console.log(isValid);

  useEffect(() => {
    (saveSuccess || editSuccess) && onSuccess && onSuccess();
  }, [saveSuccess, editSuccess]);
  return (
    <Box width={"100%"}>
      <Box display={"flex"} justifyContent={"space-between"} width={"100%"}>
        <Typography
          fontWeight={theme.fontWeight.semiBold}
          fontFamily={theme.fontFamily.secondary}
        >
          {title}
        </Typography>
      </Box>
      <Divider sx={{ borderColor: theme.blue[100], m: "10px 0 30px" }} />
      <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
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
            error={errors.company}
            name="company"
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
              error={errors.first_name}
              name="first_name"
            />
            <TextFieldComponent
              label="Last Name"
              required
              rules={{ required: "Last Name required" }}
              control={control}
              placeholder="AIVision"
              error={errors.last_name}
              name="last_name"
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
              error={errors.phone}
              name="phone"
            />
            <TextFieldComponent
              label="Email Address"
              control={control}
              placeholder="anh.mai@aivision.vn"
              error={errors.email}
              name="email"
            />
          </Box>
          <TextFieldComponent
            label="Address line 1"
            required
            rules={{ required: "Address line 1 required" }}
            control={control}
            placeholder="202 Le Lai, Pham Ngu Lao Ward, District 1, HCMC"
            error={errors.address_line1}
            name="address_line1"
          />
          <TextFieldComponent
            label="Address line 2"
            control={control}
            placeholder="202 Le Lai, Pham Ngu Lao Ward, District 1, HCMC"
            error={errors.address_line2}
            name="address_line2"
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
              rules={{ required: "Country required" }}
              render={({ field }) => (
                <Box width={"100%"}>
                  <Autocomplete
                    sx={{
                      border: `1px solid ${theme.blue[600]}`,
                      borderRadius: "8px",
                    }}
                    options={countryData}
                    getOptionLabel={(country) => country.name}
                    value={selectedCountry}
                    size="small"
                    fullWidth
                    onInputChange={(event, newInputValue, reason) => {
                      if (reason === "clear") {
                        setSelectedCountry(null);
                        setSelectedState(null);
                        setSelectedCity(null);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder="Viet Nam"
                        sx={{
                          input: {
                            fontFamily: theme.fontFamily.secondary,
                            fontSize: 16,
                          },
                        }}
                      />
                    )}
                    PopperComponent={(props) => (
                      <Popper
                        {...props}
                        sx={{
                          zIndex: "2001!important",
                          "& .MuiAutocomplete-option": {
                            fontFamily: theme.fontFamily.secondary,
                          },
                        }}
                      />
                    )}
                    popupIcon={
                      <MdOutlineKeyboardArrowDown size={18} color="#0B7ECA" />
                    }
                    {...register("country", {
                      required: "Country required",
                    })}
                    onChange={(e, value) => {
                      if (value) {
                        setValue("country", value.name);
                        setSelectedCountry(value);
                        setValue("state", "");
                        setSelectedState(null);
                      }
                    }}
                  />
                  {errors.country && (
                    <FormHelperText error={true}>
                      {errors.country?.message}
                    </FormHelperText>
                  )}
                </Box>
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
              rules={{ required: "State required" }}
              render={({ field }) => (
                <Box width={"100%"}>
                  <Autocomplete
                    sx={{
                      border: `1px solid ${theme.blue[600]}`,
                      borderRadius: "8px",
                    }}
                    options={getOptionsState() || []}
                    getOptionLabel={(state) => state.province_name}
                    fullWidth
                    value={selectedState}
                    size="small"
                    disabled={!selectedCountry}
                    onInputChange={(event, newInputValue, reason) => {
                      if (reason === "clear") {
                        setValue("state", "");
                        setSelectedState(null);
                        setValue("city", "");
                        setSelectedCity(null);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder="Ho Chi Minh"
                        sx={{
                          input: {
                            fontFamily: theme.fontFamily.secondary,
                            fontSize: 16,
                          },
                        }}
                        onChange={(
                          e: React.ChangeEvent<
                            HTMLInputElement | HTMLTextAreaElement
                          >
                        ) => setValue("state", e.target.value)}
                        inputProps={{
                          ...params.inputProps,
                          value: getValues().state ? getValues().state : "",
                        }}
                      />
                    )}
                    PopperComponent={(props) => (
                      <Popper
                        {...props}
                        sx={{
                          zIndex: "2001!important",
                          "& .MuiAutocomplete-option": {
                            fontFamily: theme.fontFamily.secondary,
                          },
                        }}
                      />
                    )}
                    popupIcon={
                      <MdOutlineKeyboardArrowDown size={18} color="#0B7ECA" />
                    }
                    {...register("state", {
                      required: "State required",
                    })}
                    onChange={(e, value) => {
                      if (value) {
                        setValue("state", value.province_name);
                        setSelectedState(value);
                        setValue("city", "");
                        setSelectedCity(null);
                      }
                    }}
                  />
                  {errors.state && (
                    <FormHelperText error={true}>
                      {errors.state?.message}
                    </FormHelperText>
                  )}
                </Box>
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
              rules={{ required: "City required" }}
              render={({ field }) => (
                <Box width={"100%"}>
                  <Autocomplete
                    sx={{
                      border: `1px solid ${theme.blue[600]}`,
                      borderRadius: "8px",
                    }}
                    options={getOptionsCity() || []}
                    getOptionLabel={(city) => city.district_name}
                    onInputChange={(event, newInputValue, reason) => {
                      if (reason === "clear") {
                        setSelectedCity(null);
                        setValue("city", "");
                      }
                    }}
                    fullWidth
                    value={selectedCity}
                    disabled={!selectedState}
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder="Thu Duc"
                        sx={{
                          input: {
                            fontFamily: theme.fontFamily.secondary,
                            fontSize: 16,
                          },
                        }}
                        inputProps={{
                          ...params.inputProps,
                          value: getValues().city ? getValues().city : "",
                        }}
                      />
                    )}
                    PopperComponent={(props) => (
                      <Popper
                        {...props}
                        sx={{
                          zIndex: "2001!important",
                          "& .MuiAutocomplete-option": {
                            fontFamily: theme.fontFamily.secondary,
                          },
                        }}
                      />
                    )}
                    popupIcon={
                      <MdOutlineKeyboardArrowDown size={18} color="#0B7ECA" />
                    }
                    {...register("city", {
                      required: "City required",
                    })}
                    onChange={(e, value) => {
                      if (value) {
                        setValue("city", value?.district_name);
                        setSelectedCity(value);
                      }
                    }}
                  />
                  {errors.city && (
                    <FormHelperText error={true}>
                      {errors.city?.message}
                    </FormHelperText>
                  )}
                </Box>
              )}
            />
          </Box>
          <TextFieldComponent
            label="ZIP/Postal code"
            control={control}
            placeholder="700000"
            required
            rules={{ required: "Zip/Postal code required" }}
            error={errors.zipcode}
            name="zipcode"
          />
        </Box>
        {hasNoAddress && (
          <Box display={"flex"} gap={"10px"} alignItems={"start"} mt={"24px"}>
            <CheckboxComponent
              id={"Check save last use"}
              checked={isSaveAddressForLater}
              handleOnCheck={(e: ChangeEvent<HTMLInputElement>) =>
                setIsSaveAddressForLater(!isSaveAddressForLater)
              }
            />
            <Typography fontFamily={theme.fontFamily.secondary} fontSize={14}>
              Save for later use
            </Typography>
          </Box>
        )}
        {isSaveAddress && (
          <Box
            display={"flex"}
            width={"100%"}
            px={"60px"}
            mt={"20px"}
            gap={"20px"}
          >
            <Button
              sx={{
                width: "50%",
                bgcolor: `transparent!important`,
                color: theme.palette.primary.main,
              }}
              disableRipple
              size="large"
              onClick={() => {
                onCancel && onCancel();
                reset();
              }}
            >
              Cancel
            </Button>
            <Button
              sx={{
                width: "50%",
                bgcolor: `${theme.palette.primary.main}!important`,
                color: "white",
                borderRadius: "8px",
              }}
              size="large"
              type="submit"
            >
              Save
            </Button>
          </Box>
        )}
      </form>
    </Box>
  );
};

export default AddressForm;
