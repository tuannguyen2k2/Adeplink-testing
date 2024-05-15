"use client";
import { useSignup } from "@/api/auth/query";
import { useGetAllCategoryRoot } from "@/api/category/query";
import { useSignUpBecomeSupplier } from "@/api/user/query";
import { InputComponent } from "@/component/common/InputComponent";
import { countryData } from "@/constant";
import { CategoryDto } from "@/interface/common";
import { SignUpSupplierForm } from "@/model/form/AuthForm";
import { setUser } from "@/store/slice/accountSlice";
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
  const [selectedCountry, setSelectedCountry] = useState<ICountry | null>();
  const [selectedState, setSelectedState] = useState<IState | null>();
  const [selectedCity, setSelectedCity] = useState<ICity | null>();
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
      country: getValues().country.name,
      state: getValues().state.name,
      city: getValues().city.name,
      number_of_employees: getValues().numberOfEmployees
        ? parseInt(getValues().numberOfEmployees, 10)
        : null,
      year_established: getValues().yearEstablished
        ? parseInt(getValues().yearEstablished, 10)
        : null,
    });
    setPhase(3);
  };

  const handleCloseModal = () => {
    setSelectedCountry(null);
    setSelectedCategory(null);
    setOpenSupplierSignUpModal(false);
    setPhase(1);
  };
  useEffect(() => {
    getAllCategoryRoot();
  }, []);

  useEffect(() => {
    setSelectedState(null);
  }, [selectedCountry]);

  useEffect(() => {
    setSelectedCity(null);
  }, [selectedState]);
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
                      />
                    )}
                    PopperComponent={(props) => (
                      <Popper {...props} sx={{ zIndex: "2001!important" }} />
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
                      options={Country.getAllCountries()}
                      getOptionLabel={(country) => country.name}
                      value={selectedCountry}
                      size="small"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          placeholder="Agriculture"
                        />
                      )}
                      PopperComponent={(props) => (
                        <Popper {...props} sx={{ zIndex: "2001!important" }} />
                      )}
                      popupIcon={
                        <MdOutlineKeyboardArrowDown size={18} color="black" />
                      }
                      {...register("country", {
                        required: "Country required",
                      })}
                      onChange={(e, value: ICountry | null) => {
                        setValue("country", value as ICountry);
                        setSelectedCountry(value);
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
                      options={State.getStatesOfCountry(
                        selectedCountry?.isoCode
                      )}
                      getOptionLabel={(state) => state.name}
                      value={selectedState}
                      size="small"
                      disabled={!selectedCountry}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          placeholder="Anh Tran"
                        />
                      )}
                      PopperComponent={(props) => (
                        <Popper {...props} sx={{ zIndex: "2001!important" }} />
                      )}
                      popupIcon={
                        <MdOutlineKeyboardArrowDown size={18} color="black" />
                      }
                      {...register("state", {
                        required: "State required",
                      })}
                      onChange={(e, value: IState | null) => {
                        setValue("state", value as IState);
                        setSelectedState(value);
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
                      options={
                        selectedCountry && selectedState
                          ? City.getCitiesOfState(
                              selectedCountry?.isoCode,
                              selectedState?.isoCode
                            )
                          : []
                      }
                      getOptionLabel={(city) => city.name}
                      value={selectedCity}
                      disabled={!selectedState}
                      size="small"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label=""
                          placeholder="Adept Link"
                        />
                      )}
                      PopperComponent={(props) => (
                        <Popper {...props} sx={{ zIndex: "2001!important" }} />
                      )}
                      popupIcon={
                        <MdOutlineKeyboardArrowDown size={18} color="black" />
                      }
                      {...register("city", {
                        required: "City required",
                      })}
                      onChange={(e, value: ICity | null) => {
                        setValue("city", value as ICity);
                        setSelectedCity(value);
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
                  <InputComponent
                    notRequire
                    title="In which year your company was established?"
                    className="font-semibold mb-2 "
                    error={formState.errors.yearEstablished?.message}
                  >
                    <input
                      size={14}
                      placeholder="100"
                      type="number"
                      className="focus:outline-none w-full"
                      {...register("yearEstablished", {
                        pattern: {
                          value: new RegExp(/^[0-9]+$/),
                          message: "Year Established invalid",
                        },
                      })}
                    />
                  </InputComponent>
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
