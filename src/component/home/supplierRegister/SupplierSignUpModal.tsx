"use client";
import { useSignup } from "@/api/auth/query";
import { useGetAllCategoryRoot } from "@/api/category/query";
import { useSignUpBecomeSupplier } from "@/api/user/query";
import { InputComponent } from "@/component/common/InputComponent";
import { countryData } from "@/constant";
import { CategoryDto, CityType, CountryType, StateType } from "@/interface/common";
import { SignUpSupplierForm } from "@/model/form/AuthForm";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import {
  Autocomplete,
  Box,
  Button,
  Popper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Modal } from "antd";
import {
  City,
  Country,
  ICity,
  ICountry,
  IState,
  State,
} from "country-state-city";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useGetDistrictsVN, useGetProvincesVN } from "@/api/country/query";

type SupplierSignUpModalType = {
  openSupplierSignUpModal: boolean;
  setOpenSupplierSignUpModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const SupplierSignUpModal = ({
  openSupplierSignUpModal,
  setOpenSupplierSignUpModal,
}: SupplierSignUpModalType) => {
  const theme = useTheme();
  const [phase, setPhase] = useState(1);
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryDto | null>();
  const [selectedYear, setSelectedYear] = useState<Dayjs | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<CountryType | null>();
  const [selectedState, setSelectedState] = useState<StateType | null>();
  const [selectedCity, setSelectedCity] = useState<CityType | null>();
  const { getAllCategoryRoot, data } = useGetAllCategoryRoot();
  const dispatch = useDispatch();
  const {
    signUpBecomeSupplier,
    isSuccess: isSignUpSuccess,
    error: signUpError,
  } = useSignUpBecomeSupplier();
  const {
    register,
    handleSubmit,
    formState,
    setValue,
    watch,
    getValues,
    reset,
  } = useForm<SignUpSupplierForm>();
  const onNext: SubmitHandler<SignUpSupplierForm> = async (data) => {
    setPhase(2);
  };

  const onSubmit: SubmitHandler<SignUpSupplierForm> = async (data) => {
    signUpBecomeSupplier({
      category_id: getValues().category.id,
      country: getValues().country,
      state: getValues().state,
      city: getValues().city,
      number_of_employees: getValues().numberOfEmployees
        ? parseInt(getValues().numberOfEmployees, 10)
        : null,
      year_established: selectedYear ? +selectedYear.format("YYYY") : null,
    });
    setPhase(3);
  };
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

  const handleCloseModal = () => {
    setSelectedCountry(null);
    setSelectedCategory(null);
    setOpenSupplierSignUpModal(false);
    setPhase(1);
  };
  useEffect(() => {
    getAllCategoryRoot();
  }, []);

  const shouldDisableYear = (date: Dayjs) => {
    const currentYear = dayjs().year();
    return date.year() > currentYear;
  };
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
  return (
    <Modal
      open={openSupplierSignUpModal}
      footer={false}
      onCancel={handleCloseModal}
    >
      <Box py={"40px"} px={"44px"} width={"fit-content"}>
        {phase == 1 && (
          <Box px={"40px"} mb={"20px"}>
            <Typography
              fontSize={30}
              whiteSpace={"nowrap"}
              fontFamily={theme.fontFamily.secondary}
              textAlign={"center"}
              fontWeight={theme.fontWeight.bold}
            >
              Welcome to{" "}
              <span className="text-[#0C71BA] whitespace-nowrap">
                Supplier Center
              </span>
            </Typography>
            <Typography
              whiteSpace={"nowrap"}
              className="text-center font-medium font-sans text-[16px] mt-1"
            >
              Just fulfill the form below and get your own Dashboard.
            </Typography>
          </Box>
        )}
        {phase == 2 && (
          <Box
            px={"40px"}
            mb={"20px"}
            display={"flex"}
            justifyContent={"center"}
          >
            <Typography
              fontSize={30}
              whiteSpace={"nowrap"}
              className="font-semibold  text-center font-sans"
            >
              <span className="text-[#0C71BA] whitespace-nowrap">Almost</span>{" "}
              there!
            </Typography>
          </Box>
        )}
        {phase == 3 && (
          <Box px={"40px"} mb={"20px"}>
            <Typography
              fontSize={30}
              whiteSpace={"nowrap"}
              className="font-semibold  text-center font-sans"
              color={theme.palette.primary.main}
            >
              Completed!
            </Typography>
            <Typography
              whiteSpace={"nowrap"}
              className="text-center font-medium font-sans text-[16px] mt-1"
            >
              Check your email or system notification to
            </Typography>
            <Typography className="text-center font-medium font-sans text-[16px] mt-1">
              receive the results of the review.
            </Typography>
          </Box>
        )}

        <form>
          {phase == 1 && (
            <div>
              <div style={{ marginBottom: "24px" }}>
                <h4 className="mb-1">
                  <span className="text-red-500 mr-1">*</span>
                  <span className="font-semibold font-sans">
                    What is the main category for your business?
                  </span>
                </h4>
                <div>
                  <Autocomplete
                    className=" border-[1px] border-solid border-gray-400 rounded-lg"
                    options={data || []}
                    getOptionLabel={(category) => category.name}
                    value={selectedCategory}
                    size="small"
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label=""
                        placeholder="Agriculture"
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
                      <MdOutlineKeyboardArrowDown size={18} color="black" />
                    }
                    {...register("category", {
                      required: "Category required",
                    })}
                    onChange={(e, value: CategoryDto | null) => {
                      setValue("category", value as CategoryDto);
                      setSelectedCategory(value);
                    }}
                  />
                  {formState.errors.category?.message && (
                    <div className="text-red-500 w-full font-medium text-[13px]">
                      {formState.errors.category.message}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h4 style={{ marginBottom: "16px" }}>
                  <span className="font-semibold font-sans">
                    Where is the location of your business establishment?
                  </span>
                </h4>
                <div style={{ marginBottom: "16px" }}>
                  <h4 className="mb-1">
                    <span className="text-red-500 mr-1">*</span>
                    <span className="font-medium font-sans">
                      Country/Region
                    </span>
                  </h4>
                  <div>
                    <Autocomplete
                      className=" border-[1px] border-solid border-gray-400 rounded-lg"
                      options={countryData}
                      getOptionLabel={(country) => country.name}
                      value={selectedCountry}
                      size="small"
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
                        <MdOutlineKeyboardArrowDown size={18} color="black" />
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
                    {formState.errors.country?.message && (
                      <div className="text-red-500 w-full font-medium text-[13px]">
                        {formState.errors.country.message}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <h4 className="mb-1">
                    <span className="text-red-500 mr-1">*</span>
                    <span className="font-medium font-sans">State</span>
                  </h4>
                  <div>
                    <Autocomplete
                      className=" border-[1px] border-solid border-gray-400 rounded-lg"
                      options={getOptionsState() || []}
                      getOptionLabel={(state) => state.province_name}
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
                        <MdOutlineKeyboardArrowDown size={18} color="black" />
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
                    {formState.errors.state?.message && (
                      <div className="text-red-500 w-full font-medium text-[13px]">
                        {formState.errors.state.message}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <h4 className="mb-1">
                    <span className="text-red-500 mr-1">*</span>
                    <span className="font-medium font-sans">City</span>
                  </h4>
                  <div>
                    <Autocomplete
                      className=" border-[1px] border-solid border-gray-400 rounded-lg"
                      options={getOptionsCity() || []}
                      getOptionLabel={(city) => city.district_name}
                      onInputChange={(event, newInputValue, reason) => {
                        if (reason === "clear") {
                          setSelectedCity(null);
                          setValue("city", "");
                        }
                      }}
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
                        <MdOutlineKeyboardArrowDown size={18} color="black" />
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
                    {formState.errors.city?.message && (
                      <div className="text-red-500 w-full font-medium text-[13px]">
                        {formState.errors.city.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {phase == 2 && (
            <div>
              <div style={{ marginBottom: "24px" }}>
                <div>
                  <InputComponent
                    notRequire
                    title="What is the number of employees of your company?"
                    className="font-semibold mb-2 "
                    error={formState.errors.numberOfEmployees?.message}
                  >
                    <input
                      size={14}
                      type="number"
                      placeholder="100"
                      className="focus:outline-none w-full"
                      {...register("numberOfEmployees", {
                        pattern: {
                          value: new RegExp(/^[0-9]+$/),
                          message: "Number of employees invalid",
                        },
                      })}
                    />
                  </InputComponent>
                  <h4 className="mb-1 font-sans font-semibold">
                    <span style={{ whiteSpace: "nowrap" }}>
                      In which year your company was established?
                    </span>
                  </h4>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      views={["year"]}
                      value={selectedYear}
                      onChange={(date: Dayjs | null) => {
                        setSelectedYear(date);
                      }}
                      format="YYYY"
                      shouldDisableYear={shouldDisableYear}
                      sx={{
                        border: `1px solid ${theme.palette.grey[600]}`,
                        width: "100%",
                        borderRadius: "8px",
                        input: {
                          height: "0.4rem",
                          fontSize: 14,
                          fontFamily: theme.fontFamily.secondary,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>
            </div>
          )}
          {phase !== 3 && (
            <div className="flex justify-end font-medium ">
              {phase == 2 && (
                <Box
                  component={"button"}
                  onClick={() => setPhase(1)}
                  sx={{
                    p: "4px 14px",
                    color: theme.blue[500],
                    fontFamily: theme.fontFamily.secondary,
                  }}
                >
                  Back
                </Box>
              )}
              <Button
                type="submit"
                onClick={handleSubmit(phase == 1 ? onNext : onSubmit)}
                sx={{
                  p: "4px 14px!important",
                  borderRadius: "6px",
                  bgcolor: `${theme.blue[500]}!important`,
                  color: "common.white",
                  fontFamily: theme.fontFamily.secondary,
                }}
              >
                {phase == 1 ? "Next" : "Submit"}
              </Button>
            </div>
          )}
        </form>
      </Box>
    </Modal>
  );
};

export default SupplierSignUpModal;
