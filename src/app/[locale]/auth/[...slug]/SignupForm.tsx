"use client";
import { useSendOTP, useSignup, useVerifyOTP } from "@/api/auth/query";
import GoogleIcon from "@/assets/icons/google-icon.png";
import AppLogo from "@/assets/icons/logo.svg";
import InputOTP from "@/component/InputOTP";
import SuccessModal from "@/component/auth/SuccessModal";
import { InputComponent } from "@/component/common/InputComponent";
import { ValidatePasswordForm } from "@/component/common/ValidatePasswordForm";
import { countryData } from "@/constant";
import {
  CheckSpecial,
  checkEmail,
  checkLength,
  checkNumber,
  checkSpecialChar,
  checkUpper,
} from "@/constant/regex";
import { useCountdown } from "@/hook/useCountdown";
import { SignUpBuyerForm } from "@/model/form/AuthForm";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Autocomplete, Icon, TextField } from "@mui/material";
import { Modal, Select, Tooltip } from "antd";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next-nprogress-bar";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Country, State, City } from "country-state-city";
import { ICountry, IState, ICity } from "country-state-city";
import { AUTH_PATH_URL, HOME_PATH_URL } from "@/constant/pathUrl";
import { useGetProvincesVN } from "@/api/country/query";
const SignupFormPage = () => {
  const [showPassword, setShowPassword] = useState<{
    password: boolean;
    confirm: boolean;
  }>({ password: false, confirm: false });
  const router = useRouter();
  const [otp, setOtp] = useState<string>();
  const [showValidatePassword, setShowValidatePassword] = useState(false);
  const [validated, setValidated] = useState({
    upperValidated: false,
    numberValidated: false,
    specialValidated: false,
    lengthValidated: false,
  });
  const [showValidateEmail, setShowValidateEmail] = useState<boolean>(false);
  const [isEmailExisted, setIsEmailExisted] = useState(false);
  const [isValidateOtp, setIsValidateOtp] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isOtpError, setIsOtpError] = useState(false);
  const {
    signup,
    isSuccess: isSignUpSuccess,
    error: registerError,
  } = useSignup();
  const { resendOtp } = useSendOTP();
  const {
    verifyOtp,
    isSuccess: isVerifySuccess,
    error: verifyOTPError,
  } = useVerifyOTP();
  const { remaining, handleRunCountDown } = useCountdown(60);
  const [isResend, setIsResend] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState,
    setValue,
    watch,
    getValues,
    setError,
    clearErrors,
    unregister,
  } = useForm<SignUpBuyerForm>({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const onSubmit: SubmitHandler<SignUpBuyerForm> = async (data) => {
    signup({
      email: getValues().email,
      password: getValues().password,
      name: getValues().fullname,
      company_name: getValues().companyName,
      phone: getValues().phoneNumber,
      country: getValues().country,
      is_supplier: false,
    });
  };

  useEffect(() => {
    if (isVerifySuccess) {
      setShowValidateEmail(false);
      setShowSuccessModal(true);
    } else if (verifyOTPError) {
      setIsOtpError(true);
    }
  }, [isVerifySuccess, verifyOTPError]);

  useEffect(() => {
    if (registerError) {
      if ((registerError as any)?.response?.data?.code == "4011") {
        setIsEmailExisted(true);
      }
    } else if (isSignUpSuccess) {
      setShowValidateEmail(true);
      handleRunCountDown();
    }
  }, [registerError, isSignUpSuccess]);

  const handleSubmitOTP = async () => {
    try {
      verifyOtp({ email: getValues().email, otp: otp as string });
    } catch {
      setIsOtpError(true);
    }
  };
  const handleResendCode = () => {
    resendOtp(getValues().email);
    setIsResend(true);
    handleRunCountDown();
    setIsOtpError(false);
  };
  const handleBlurEmail = () => {
    const email = getValues("email");
    if (!checkEmail.test(email) && email !== "") {
      setError("email", { message: "Professional email invalid" });
    } else if (email == "") {
      setError("email", { message: "Professional email required" });
    }
  };

  const handleCheckSpecialCharAndMinCharacter = (
    fieldName: "companyName" | "fullname"
  ) => {
    const value = getValues(fieldName);
    if (checkSpecialChar.test(value)) {
      setError(fieldName, {
        message: `${
          fieldName == "companyName" ? "Company name" : "Full name"
        } ${"cannot contain the following special characters"}`,
      });
    } else {
      setError(fieldName, {});
    }
  };

  const handleChangePassword = () => {
    if (watch("confirm") !== watch("password")) {
      setError("confirm", { message: "The two passwords do not match" });
    } else {
      setError("confirm", {});
    }
  };

  const handleValidatePassword = (value: string) => {
    setValidated({
      ...validated,
      upperValidated: checkUpper.test(value),
      numberValidated: checkNumber.test(value),
      specialValidated: CheckSpecial.test(value),
      lengthValidated: checkLength.test(value),
    });
  };
  const handleEmailChange = () => {
    setIsEmailExisted(false);
    const email = getValues("email");
    if (checkEmail.test(email)) {
      setError("email", {});
    }
  };

  // console.log(getValues().companyName);
  // console.log(getValues().confirm);
  // console.log(getValues().country);
  // console.log(getValues().email);
  // console.log(getValues().fullname);
  // console.log(getValues().password);
  // console.log(getValues().phoneNumber);
  return (
    <React.Fragment>
      <div className="bg-white h-full w-4/5 mx-auto">
        <div
          className="flex justify-center mt-[100px] mr-7 cursor-pointer"
          onClick={() => router.push(HOME_PATH_URL)}
        >
          <Image src={AppLogo} alt={""} />
          <span className="text-[#0B7ECA] text-[48px] font-bold">
            Adeptlink
          </span>
        </div>

        <h3 className="font-bold text-2xl text-center">
          <span className="text-[#0C71BA]">Create</span>&nbsp;a new account
        </h3>
        <h4 className="text-center mb-6">
          Create your account to explore B2B Marketplace and more.
          <br />
          Already have an account?&nbsp;
          <span
            className="text-[#0C71BA] underline hover:cursor-pointer font-medium"
            onClick={() => router.push(AUTH_PATH_URL.LOGIN)}
          >
            Login
          </span>
        </h4>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12">
            <h4 className="mb-1">
              <span className="text-red-500 mr-1">*</span>
              <span className="font-medium">Country/Region</span>
            </h4>
            <div className="col-span-12 h-12 mb-4">
              <Autocomplete
                className="col-span-12 border-[1px] border-solid border-gray-400 rounded-lg"
                options={countryData}
                getOptionLabel={(country) => country.name}
                size="small"
                renderInput={(params) => <TextField {...params} label="" />}
                onInputChange={(event, newInputValue, reason) => {
                  if (newInputValue) {
                    clearErrors("country");
                    unregister("country", { keepIsValid: true });
                    setValue("country", newInputValue);
                    setSelectedCountry(newInputValue);
                  }
                  if (reason === "clear") {
                    setSelectedCountry("");
                    setError("country", { message: "Country required" });
                  }
                }}
                popupIcon={
                  <MdOutlineKeyboardArrowDown size={18} color="black" />
                }

                onChange={(e, value) => {
                  if (value) {
                    setValue("country", value?.name);
                    setSelectedCountry(value.name);
                  }
                }}

                {...register("country", {
                  shouldUnregister: true,
                })}

              />
              {formState.errors.country?.message && (
                <div className="text-red-500 w-full font-medium text-[13px]">
                  {formState.errors.country.message}
                </div>
              )}
            </div>
            <InputComponent
              title="Full name"
              className="col-span-12 sm:col-span-6 sm:mr-3 mb-4"
              error={formState.errors.fullname?.message}
            >
              <input
                placeholder="An Nguyen"
                className="focus:outline-none w-full"
                {...register("fullname", {
                  required: "Full name required",
                  minLength: {
                    value: 3,
                    message: "Full name must be at least 3 characters long",
                  },
                  onChange: () =>
                    handleCheckSpecialCharAndMinCharacter("fullname"),
                })}
              />
            </InputComponent>
            <InputComponent
              title="Company Name"
              className="col-span-12 sm:col-span-6 sm:ml-3 mb-4"
              error={formState.errors.companyName?.message}
            >
              <input
                placeholder="Adept Link"
                className="focus:outline-none  w-full"
                {...register("companyName", {
                  required: "Company name required",
                  onChange: () =>
                    handleCheckSpecialCharAndMinCharacter("companyName"),
                })}
              />
            </InputComponent>
            <InputComponent
              title="Business email address"
              className="col-span-12 sm:col-span-6 sm:mr-3 mb-4"
              error={
                isEmailExisted
                  ? "Email already exists"
                  : formState.errors.email?.message
              }
            >
              <input
                type="email"
                placeholder="example@domain.com"
                className="focus:outline-none w-full"
                {...register("email", {
                  required: "Professional email required",
                  pattern: { value: checkEmail, message: "Email invalid" },
                  onChange: () => {
                    handleEmailChange();
                  },
                  onBlur: () => handleBlurEmail(),
                })}
              />
            </InputComponent>

            {/* <h4>
                <span className="text-red-500">*</span>
                Phone number
              </h4> */}
            {/* <div className="flex items-center"> */}
            {/* <Select
                  defaultValue="+84"
                  options={phoneNumberData}
                  className="w-20 h-11 border-2 border-gray-300 rounded-lg"
                  onSelect={(event, value) =>
                    console.log("locale", value.value)
                  }
                  // onChange={(event, value) => setValue("locale", value.value)}
                /> */}
            <InputComponent
              title="Phone number"
              className="col-span-12 sm:col-span-6 sm:ml-3 mb-4"
              error={formState.errors.phoneNumber?.message}
            >
              <input
                size={14}
                placeholder="Phone number"
                className="focus:outline-none w-full"
                {...register("phoneNumber", {
                  required: "Phone number required",
                  pattern: {
                    value: new RegExp(/^[0-9]+$/),
                    message: "Invalid phone number format",
                  },
                })}
              />
            </InputComponent>
            {/* <Input
                  {...register("phoneNumber", {
                    required: "Phone required",
                    // pattern: {value: new RegExp(/^[0-9]{9}$/), message: "Phone number invalid"}
                  })}
                  placeholder="123456789"
                  className="w-48 h-11 border-2 border-gray-300 rounded-md"
                /> */}
            {/* </div> */}
            <InputComponent
              title="Password"
              className="col-span-12 sm:col-span-6 relative sm:mr-3 mb-4"
              error={formState.errors.password?.message}
            >
              <Tooltip
                title={<ValidatePasswordForm validated={validated} />}
                placement="top"
                open={showValidatePassword}
                color="#FFF"
              >
                <input
                  type={showPassword.password ? "text" : "password"}
                  placeholder="********"
                  className="focus:outline-none w-full"
                  {...register("password", {
                    required: "Password required",
                    onChange: (e) => {
                      setValue("password", e.target.value);
                      handleValidatePassword(e.target.value);
                      handleChangePassword();
                    },
                    onBlur: () => setShowValidatePassword(false),
                  })}
                  onFocus={() => setShowValidatePassword(true)}
                />
              </Tooltip>
              <Icon
                titleAccess={
                  showPassword.password ? "Hide password" : "Show password"
                }
                fontSize="small"
                component={showPassword.password ? Visibility : VisibilityOff}
                className="absolute right-3 top-[40px] hover:cursor-pointer"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    password: !showPassword.password,
                  })
                }
              />
            </InputComponent>
            <InputComponent
              title="Confirm password"
              className="col-span-12 sm:col-span-6 relative sm:ml-3 mb-4"
              error={formState.errors.confirm?.message}
            >
              <input
                type={showPassword.confirm ? "text" : "password"}
                placeholder="********"
                className="focus:outline-none w-full"
                {...register("confirm", {
                  required: "Confirm password required",
                  validate: (value) =>
                    value === watch("password") ||
                    "The two passwords do not match",
                  onChange: () => handleChangePassword(),
                })}
              />
              <Icon
                titleAccess={
                  showPassword.confirm ? "Hide password" : "Show password"
                }
                fontSize="small"
                component={showPassword.confirm ? Visibility : VisibilityOff}
                className="absolute right-3 top-[40px]"
                onClick={() =>
                  setShowPassword({
                    ...showPassword,
                    confirm: !showPassword.confirm,
                  })
                }
              />
            </InputComponent>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              className="w-[18px] h-[18px] cursor-pointer"
              onChange={() => {
                setIsChecked(!isChecked);
              }}
              {...register("isCheck", {
                shouldUnregister: true,
                onChange: () => {
                  setIsChecked(!isChecked);
                  console.log(formState.isValid);
                },
              })}
            />
            &nbsp; I agree to your&nbsp;
            <span className="text-[#0C71BA] cursor-pointer">
              Terms of Service
            </span>
            &nbsp;and&nbsp;
            <span className="text-[#0C71BA] cursor-pointer">
              Privacy Policy
            </span>
          </div>

          <button
            className={`w-full text-white mt-6 px-3 py-2 rounded-lg ${
              isChecked &&
              formState.isValid &&
              selectedCountry &&
              selectedCountry != "" &&
              validated.lengthValidated &&
              validated.numberValidated &&
              validated.specialValidated &&
              validated.upperValidated
                ? "bg-[#0C71BA]"
                : "bg-[#DBE9FE] cursor-not-allowed"
            }`}
            type="submit"
            disabled={
              !selectedCountry ||
              !isChecked ||
              selectedCountry == "" ||
              !formState.isValid ||
              !validated.lengthValidated ||
              !validated.numberValidated ||
              !validated.specialValidated ||
              !validated.upperValidated
            }
          >
            Sign up
          </button>
        </form>
        <div className="mt-6 relative flex items-center w-full">
          <div className="w-full bg-[#E5E7EB] h-[1px]"></div>
          <span className=" bg-white px-4 opacity-60 whitespace-nowrap">
            or continue with
          </span>
          <div className="w-full bg-[#E5E7EB] h-[1px]"></div>
        </div>
        <div
          className="text-center bg-gray-100 mt-6 flex px-3 py-2 rounded-lg hover:bg-gray-200 hover:cursor-pointer"
          title="Login with Google"
        >
          <Image src={GoogleIcon} alt={""} width={30} />
          <div className="text-center font-medium text-lg w-full">Google</div>
        </div>
      </div>

      {showValidateEmail && (
        <Modal
          open={showValidateEmail}
          onCancel={() => {
            setShowValidateEmail(false);
            setIsOtpError(false);
          }}
          footer={false}
        >
          <h4 className="text-center text-xl font-semibold font-sans mt-6">
            Email <span className="text-[#0C71BA]">verification</span>
          </h4>
          <div className="text-center mb-2  font-sans">
            A six-digit verification code has been sent to your email address:{" "}
            <span className="font-medium ">{getValues().email}</span>
          </div>

          <div className="h-5 text-red-400 text-center font-sans">
            {isOtpError && showValidateEmail && <span>OTP incorrect</span>}
          </div>

          <div className="mt-1 w-4/5 mx-auto">
            <InputOTP
              length={6}
              isResend={isResend}
              setIsResend={setIsResend}
              onComplete={(value: any) => {
                setIsValidateOtp(true);
                setOtp(value);
              }}
            />
          </div>

          <div className="text-center mt-3 font-sans">
            <div>Didn’t receive the code?</div>
            <button
              disabled={remaining > 0}
              onClick={handleResendCode}
              className={
                remaining === 0
                  ? "text-[#0C71BA] font-medium"
                  : "text-[#DC2626] font-medium"
              }
            >
              Resend Code&nbsp;
            </button>
            {remaining > 0 && (
              <span className="font-medium">0:{remaining}</span>
            )}
          </div>

          <div className="w-4/5 mx-auto mt-5">
            <button
              className={`w-full text-white px-3 font-sans py-2 rounded-lg ${
                isValidateOtp
                  ? "bg-[#4285F4]"
                  : "bg-blue-300 cursor-not-allowed"
              }`}
              type="submit"
              disabled={!isValidateOtp}
              onClick={() => handleSubmitOTP()}
            >
              Verify & Proceed
            </button>
          </div>
        </Modal>
      )}
      {showSuccessModal && (
        <SuccessModal
          showSuccessModal={showSuccessModal}
          title={
            <div>
              <h3 className="font-bold text-2xl text-center font-sans mt-6">
                Registered <span className="text-[#0C71BA]">successfully</span>!
              </h3>
              <div
                className="text-center font-medium font-sans text-[16px] mt-1"
                style={{ whiteSpace: "nowrap" }}
              >
                Thank you and Welcome to{" "}
                <strong className="text-[#0C71BA]">AdeptLink!</strong>
                <br /> You will be redirect to Homepage in
              </div>
            </div>
          }
        />
      )}
    </React.Fragment>
  );
};

export default SignupFormPage;
