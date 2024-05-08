"use client";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignupForm } from "@/model/form/AuthForm";
import Image from "next/image";
import AppLogo from "@/assets/icons/logo.svg";
import { Autocomplete, Icon, TextField } from "@mui/material";
import {
  VisibilityOff,
  Visibility,
  CheckCircleOutline,
  HighlightOff,
} from "@mui/icons-material";
import { countryData, phoneNumberData } from "@/constant";
import { Modal, Select, Tooltip } from "antd";
import { useSendOTP, useSignup, useVerifyOTP } from "@/api/auth/query";
import InputOTP from "@/component/InputOTP";
import { useCountdown } from "@/hook/useCountdown";
import {
  checkEmail,
  checkLength,
  checkNumber,
  CheckSpecial,
  checkUpper,
} from "@/constant/regex";
import { selectedTabType } from "./page";
import GoogleIcon from "@/assets/icons/google-icon.png";
import { sentOtpDto } from "@/interface/user";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { InputComponent } from "@/component/common/InputComponent";
import { ValidatePasswordForm } from "@/component/common/ValidatePasswordForm";
import Link from "next/link";
import SuccessModal from "@/component/auth/SuccessModal";

const SignupFormPage = () => {
  const { Option } = Select;
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
  const [isChecked, setIsChecked] = useState(false);
  const { register, handleSubmit, formState, setValue, watch, getValues } =
    useForm<SignupForm>();
  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
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
    handleRunCountDown();
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
  };

  return (
    <React.Fragment>
      <div className="bg-white h-full w-4/5 mx-auto">
        <div className="flex justify-center mt-[100px] mr-7">
          <Image src={AppLogo} alt={""} />
          <span className="text-[#0B7ECA] text-[48px] font-bold">
            Adeptlink
          </span>
        </div>

        <h3 className="font-bold text-2xl text-center">
          <span className="text-[#0C71BA]">Create</span>&nbsp;a new account
        </h3>
        <h4 className="text-center">
          Create your account to explore B2B Marketplace and more.
          <br />
          Already have an account?&nbsp;
          <span
            className="text-[#0C71BA] underline hover:cursor-pointer font-medium"
            title="Sign up"
            onClick={() => router.push("/en/auth/login")}
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
            <div className="col-span-12 h-12 mb-2">
              <Autocomplete
                className="col-span-12 border-[1px] border-solid border-gray-400 rounded-lg"
                options={countryData}
                size="small"
                renderInput={(params) => <TextField {...params} label="" />}
                popupIcon={
                  <MdOutlineKeyboardArrowDown size={18} color="black" />
                }
                {...register("country", {
                  required: "Country required",
                })}
                onChange={(e, value) => setValue("country", value as string)}
              />
              {formState.errors.country?.message && (
                <div className="text-red-500 w-full font-medium text-[13px]">
                  {formState.errors.country.message}
                </div>
              )}
            </div>
            <InputComponent
              title="Full name"
              className="col-span-12 sm:col-span-6 sm:mr-3 mb-2"
              error={formState.errors.fullname?.message}
            >
              <input
                placeholder="An Nguyen"
                className="focus:outline-none w-full"
                {...register("fullname", {
                  required: "Full name required",
                })}
              />
            </InputComponent>
            <InputComponent
              title="Company Name"
              className="col-span-12 sm:col-span-6 sm:ml-3 mb-2"
              error={formState.errors.companyName?.message}
            >
              <input
                placeholder="Adept Link"
                className="focus:outline-none  w-full"
                {...register("companyName", {
                  required: "Company name required",
                })}
              />
            </InputComponent>
            <InputComponent
              title="Business email address"
              className="col-span-12 sm:col-span-6 sm:mr-3 mb-2"
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
                  required: "Business email required",
                  pattern: { value: checkEmail, message: "Email invalid" },
                })}
                onChange={handleEmailChange}
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
              className="col-span-12 sm:col-span-6 sm:ml-3 mb-2"
              error={formState.errors.phoneNumber?.message}
            >
              <input
                size={14}
                placeholder="Phone number"
                className="focus:outline-none w-full"
                {...register("phoneNumber", {
                  required: "Phone number required",
                  pattern: {
                    value: new RegExp(/^[0-9]{10}$/),
                    message: "Phone number invalid",
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
              className="col-span-12 sm:col-span-6 relative sm:mr-3 mb-2"
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
                  })}
                  onChange={(e) => {
                    setValue("password", e.target.value);
                    handleValidatePassword(e.target.value);
                  }}
                  onFocus={() => setShowValidatePassword(true)}
                  onBlur={() => setShowValidatePassword(false)}
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
              className="col-span-12 sm:col-span-6 relative sm:ml-3 mb-2"
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
                    "Confirm password do not match",
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
              onChange={() => setIsChecked(!isChecked)}
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
            className={`w-full text-white mt-5 px-3 py-2 rounded-lg ${
              isChecked ? "bg-[#0C71BA]" : "bg-[#DBE9FE] cursor-not-allowed"
            }`}
            type="submit"
            disabled={!isChecked}
          >
            Sign up
          </button>
        </form>
        <div className="mt-6 border-t-2 relative flex justify-center">
          <span className="absolute -top-[14px] bg-white px-4 opacity-60">
            or continue with
          </span>
        </div>
        <div
          className="text-center bg-gray-100 mt-5 flex px-3 py-2 rounded-lg hover:bg-gray-200 hover:cursor-pointer"
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
          <h4 className="text-center text-xl font-semibold font-sans">
            Email <span className="text-blue-400">verification</span>
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
                  ? "text-blue-500 font-medium"
                  : "text-red-400 font-medium"
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
              className={`w-full text-white px-3 py-2 rounded ${
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
      <SuccessModal
        showSuccessModal={showSuccessModal}
        title={
          <div>
            <h3 className="font-bold text-2xl text-center font-sans">
              Registered <span className="text-[#0C71BA]">successfully</span>!
            </h3>
            <div className="text-center font-medium font-sans text-[16px] mt-1">
              Thank you and Welcome to{" "}
              <span className="text-[#0C71BA]">AdeptLink!</span>
              <br /> You will be redirect to Homepage in
            </div>
          </div>
        }
      />
    </React.Fragment>
  );
};

export default SignupFormPage;
