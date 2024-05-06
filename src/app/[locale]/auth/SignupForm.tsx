"use client";
import React, { useState } from "react";
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

type InputComponentProps = {
  title: string;
  children: any;
  className: string;
  error: string | undefined;
};

const InputComponent = ({
  title,
  children,
  className,
  error,
}: InputComponentProps) => (
  <div className={`my-1 h-[5rem] ${className} `}>
    <h4 className="mb-1">
      <span className="text-red-500 mr-1">*</span>
      <span className="font-medium">{title}</span>
    </h4>
    <div className="border-[1px] border-solid border-gray-400 rounded-lg w-full px-3 py-2">
      {children}
    </div>
    {error && <div className="text-red-500">{error}</div>}
  </div>
);

const SignupFormPage = ({ setSelectedTab }: selectedTabType) => {
  const { Option } = Select;
  const [showPassword, setShowPassword] = useState<{
    password: boolean;
    confirm: boolean;
  }>({ password: false, confirm: false });
  const [otp, setOtp] = useState<string>();
  const [showValidatePassword, setShowValidatePassword] = useState(false);
  const [validated, setValidated] = useState({
    upperValidated: false,
    numberValidated: false,
    specialValidated: false,
    lengthValidated: false,
  });
  const [showValidateEmail, setShowValidateEmail] = useState<boolean>(false);
  const [isEnableResendOtp, setIsEnableResendOtp] = useState(false);
  const [isValidateOtp, setIsValidateOtp] = useState(false);
  const [isOtpError, setIsOtpError] = useState(false);
  const { signup, isSuccess } = useSignup();
  const { sendOtp } = useSendOTP();
  const { verifyOtp, isSuccess: isVerifySuccess } = useVerifyOTP();
  const countdown = useCountdown(60, () => setIsEnableResendOtp(true));
  const { register, handleSubmit, formState, setValue, watch, getValues } =
    useForm<SignupForm>();
  const onSubmit: SubmitHandler<SignupForm> = async (data) => {
    setShowValidateEmail(true);
    sendOtp(data.email);
  };

  const handleSubmitOTP = async () => {
    try {
      verifyOtp({ email: getValues().email, otp: otp as string });
      if (isVerifySuccess) {
        signup({
          email: getValues().email,
          password: getValues().password,
          full_name: getValues().fullname,
          company_name: getValues().companyName,
          phone: `${getValues().locale || "+84"}${getValues().phoneNumber}`,
          country: getValues().country,
        });
        setSelectedTab("successfully");
      } else {
        setIsOtpError(true);
      }
    } catch {
      setIsOtpError(true);
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

  const ValidatePasswordForm = () => {
    return (
      <div className="text-black">
        <div>The password must be:</div>
        <div className={`${validated.lengthValidated && "text-green-500"}`}>
          {validated.lengthValidated ? (
            <Icon component={CheckCircleOutline} fontSize="inherit" />
          ) : (
            <Icon component={HighlightOff} fontSize="inherit" color="error" />
          )}
          <span className="ml-1">Between 8 and 20 characters long</span>
        </div>
        <div className={`${validated.upperValidated && "text-green-500"}`}>
          {validated.upperValidated ? (
            <Icon component={CheckCircleOutline} fontSize="inherit" />
          ) : (
            <Icon component={HighlightOff} fontSize="inherit" color="error" />
          )}
          <span className="ml-1">Contains at least 1 upper case character</span>
        </div>
        <div className={`${validated.numberValidated && "text-green-500"}`}>
          {validated.numberValidated ? (
            <Icon component={CheckCircleOutline} fontSize="inherit" />
          ) : (
            <Icon component={HighlightOff} fontSize="inherit" color="error" />
          )}
          <span className="ml-1">Contains at least 1 numberic character</span>
        </div>
        <div className={`${validated.specialValidated && "text-green-500"}`}>
          {validated.specialValidated ? (
            <Icon component={CheckCircleOutline} fontSize="inherit" />
          ) : (
            <Icon component={HighlightOff} fontSize="inherit" color="error" />
          )}
          <span className="ml-1">Contains at least 1 special character</span>
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div className="bg-white h-full w-4/5 mx-auto">
        <div className="flex justify-center mt-[20px] mr-7">
          <Image src={AppLogo} alt={""} />
          <span className="text-[#0B7ECA] text-[48px] font-bold">
            Adeptlink
          </span>
        </div>

        <h3 className="font-bold text-2xl text-center">
          <span className="text-blue-400">Create</span>&nbsp;a new account
        </h3>
        <h4 className="text-center">
          Create your account to explore B2B Marketplace and more.
          <br />
          Already have an account?
          <span
            className="text-[#0C71BA] underline hover:cursor-pointer"
            title="Sign up"
            onClick={() => setSelectedTab("login")}
          >
            &nbsp;Login
          </span>
        </h4>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12">
            <h4 className="mb-1">
              <span className="text-red-500 mr-1">*</span>
              <span className="font-medium">Country/Region</span>
            </h4>
            <div className="col-span-12 h-12">
              <Autocomplete
                className="col-span-12 border-[1px] border-solid border-gray-400 rounded-lg"
                options={countryData}
                size="small"
                renderInput={(params) => <TextField {...params} label="" />}
                popupIcon={
                  <MdOutlineKeyboardArrowDown size={18} color="black" />
                }
                {...register("country", {
                  required: "Country is require",
                })}
                onChange={(e, value) => setValue("country", value as string)}
              />
              {formState.errors.country?.message && (
                <div className="text-red-500 w-full">
                  {formState.errors.country.message}
                </div>
              )}
            </div>
            <InputComponent
              title="Full name"
              className="col-span-6 mr-3"
              error={formState.errors.fullname?.message}
            >
              <input
                placeholder="An Nguyen"
                className="focus:outline-none "
                {...register("fullname", {
                  required: "Full name is require",
                })}
              />
            </InputComponent>
            <InputComponent
              title="Company Name"
              className="col-span-6 ml-3"
              error={formState.errors.companyName?.message}
            >
              <input
                placeholder="Adept Link"
                className="focus:outline-none"
                {...register("companyName", {
                  required: "Company name is require",
                })}
              />
            </InputComponent>
            <InputComponent
              title="Business email address"
              className="col-span-6 mr-3"
              error={formState.errors.email?.message}
            >
              <input
                type="email"
                placeholder="example@domain.com"
                className="focus:outline-none"
                {...register("email", {
                  required: "Business email is require",
                  pattern: { value: checkEmail, message: "Email invalid" },
                })}
              />
            </InputComponent>
            <div className="col-span-6">
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
                className="col-span-6 ml-3"
                error={formState.errors.phoneNumber?.message}
              >
                <input
                  size={14}
                  placeholder="Phone number"
                  className="focus:outline-none"
                  {...register("phoneNumber", {
                    required: "Phone number is require",
                    pattern: {
                      value: new RegExp(/^[0-9]{9}$/),
                      message: "Phone number invalid",
                    },
                  })}
                />
              </InputComponent>
              {/* <Input
                  {...register("phoneNumber", {
                    required: "Phone is require",
                    // pattern: {value: new RegExp(/^[0-9]{9}$/), message: "Phone number invalid"}
                  })}
                  placeholder="123456789"
                  className="w-48 h-11 border-2 border-gray-300 rounded-md"
                /> */}
              {/* </div> */}
            </div>
            <InputComponent
              title="Password"
              className="col-span-6 relative mr-3"
              error={formState.errors.password?.message}
            >
              <Tooltip
                title={<ValidatePasswordForm />}
                placement="top"
                open={showValidatePassword}
                color="#FFF"
              >
                <input
                  type={showPassword.password ? "text" : "password"}
                  placeholder="********"
                  className="focus:outline-none"
                  {...register("password", {
                    required: "Password is require",
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
              className="col-span-6 relative ml-3"
              error={formState.errors.confirm?.message}
            >
              <input
                type={showPassword.confirm ? "text" : "password"}
                placeholder="********"
                className="focus:outline-none"
                {...register("confirm", {
                  required: "Confirm password is require",
                  validate: (value) =>
                    value === watch("password") || "Confirm do not match",
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
            />
            &nbsp; I agree to your&nbsp;
            <span className="text-[#0C71BA] cursor-pointer">Terms of Service</span>&nbsp;and&nbsp;
            <span className="text-[#0C71BA] cursor-pointer">Privacy Policy</span>
          </div>

          <button
            className={`w-full text-white mt-5 px-3 py-2 rounded ${
              formState.isValid
                ? "bg-[#4285F4]"
                : "bg-blue-300 cursor-not-allowed"
            }`}
            type="submit"
            disabled={!formState.isValid}
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
          onCancel={() => setShowValidateEmail(false)}
          style={{ top: 200, right: -400 }}
          footer={false}
        >
          <h4 className="text-center text-xl font-medium">
            Email <span className="text-blue-400">verification</span>
          </h4>
          <div className="text-center mb-2">
            A six-digit verification code has been sent to your email address:{" "}
            <span className="font-medium">{getValues().email}</span>
          </div>

          <div className="h-5 text-red-400 text-center">
            {isOtpError && <span>OTP incorrect</span>}
          </div>

          <div className="mt-1 w-4/5 mx-auto">
            <InputOTP
              length={6}
              onComplete={(value: any) => {
                setIsValidateOtp(true), setOtp(value);
              }}
            />
          </div>

          <div className="text-center mt-3">
            <div>Did not receive the code?</div>
            <button
              disabled={!isEnableResendOtp}
              className={
                isEnableResendOtp ? "text-blue-500 underline" : "text-red-400"
              }
            >
              Resend code&nbsp;
            </button>
            {countdown > 0 && <span>{countdown}</span>}
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
    </React.Fragment>
  );
};

export default SignupFormPage;
