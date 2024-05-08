"use client";
import React, { useEffect, useState } from "react";
import AppLogo from "@/assets/icons/logo.svg";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "antd";
import InputOTP from "@/component/InputOTP";
import { useSendOTP, useSendOTPReset, useVerifyOTP, useVerifyOTPReset } from "@/api/auth/query";
import { useCountdown } from "@/hook/useCountdown";
import { selectedTabType } from "./page";
import { IoMdArrowBack } from "react-icons/io";
import { useRouter } from "next/navigation";

const ForgetPasswordForm = () => {
  const [showValidateEmail, setShowValidateEmail] = useState<boolean>(false);
  const [otp, setOtp] = useState("");
  const [isValidateOtp, setIsValidateOtp] = useState(false);
  const [isOtpError, setIsOtpError] = useState<boolean>(false);
  const { remaining, handleRunCountDown } = useCountdown(60);
  const router = useRouter();
  const { sendOtpReset, error } = useSendOTPReset();
  const {
    verifyOtpReset,
    isSuccess: isVerifySuccess,
    error: verifyOTPError,
  } = useVerifyOTPReset();

  const { register, handleSubmit, formState, getValues } = useForm<{
    email: string;
  }>();
  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    setShowValidateEmail(true);
    sendOtpReset(data.email);
    handleRunCountDown();
  };
  const handleResendCode = () => {
    sendOtpReset(getValues().email);
    handleRunCountDown();
  };
  const handleSubmitOTP = async () => {
    try {
      verifyOtpReset({ email: getValues().email, otp: otp as string });
    } catch {
      setIsOtpError(true);
    }
  };

  useEffect(() => {
    if (isVerifySuccess) {
      router.push(`/en/auth/change-password?email=${getValues().email}&otp=${otp}`);
    } else if (verifyOTPError) {
      setIsOtpError(true);
    }
  }, [isVerifySuccess, verifyOTPError]);

  return (
    <React.Fragment>
      <div className="bg-white h-full w-full">
        <div className="w-[80%] mx-auto flex flex-col items-center">
          <div className="flex justify-center mt-10 lg:mt-[100px] mr-7">
            <Image src={AppLogo} alt={""} />
            <span className="text-[#0B7ECA] text-[48px] font-bold">
              Adeptlink
            </span>
          </div>
          <h3 className="font-semibold text-2xl text-center mt-3">
            <span className="text-[#0C71BA]">Forgot</span>&nbsp;password
          </h3>
          <h4 className="text-center">
            Please enter your account email to receive password reset link.
          </h4>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 w-[80%]">
            <div className="mb-5 h-20">
              <h4
                className={`font-medium mb-1 ${
                  formState.errors.email && "text-red-500"
                }`}
              >
                Email
              </h4>
              <div className="px-3 py-2 border-[1px] border-gray-400 rounded-lg">
                <input
                  placeholder="example@domain.com"
                  className="focus:outline-none w-full"
                  {...register("email", {
                    required: "Email is require",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: "email invalid",
                    },
                  })}
                />
              </div>
              {formState.errors.email && (
                <div className="text-red-500">
                  {formState.errors.email.message}
                </div>
              )}
            </div>

            <button
              className={`w-full text-white px-3 py-2 rounded ${
                formState.isValid
                  ? "bg-[#0C71BA]"
                  : "bg-[#DBE9FE] cursor-not-allowed"
              }`}
              type="submit"
              disabled={!formState.isValid}
            >
              Reset
            </button>
          </form>
          <div
            className="hover:underline font-medium text-[#0C71BA] hover:cursor-pointer mt-5 flex gap-1"
            onClick={() => router.push("/en/auth/login")}
          >
            <IoMdArrowBack size={24} />
            Back to Login
          </div>
        </div>
      </div>

      {showValidateEmail && (
        <Modal
          open={showValidateEmail}
          onCancel={() => setShowValidateEmail(false)}
          okButtonProps={{ style: { backgroundColor: "#1677ff" } }}
          footer={false}
        >
          <h4 className="text-center text-xl font-semibold font-sans">
            Email <span className="text-[#0C71BA]">verification</span>
          </h4>
          <div className="text-center font-sans">
            A six-digit verification code has been sent to your email address:{" "}
            <span className="font-medium font-sans">{getValues().email}</span>
          </div>

          <div className="h-5 text-red-400 text-center">
            {isOtpError && showValidateEmail && <span>OTP incorrect</span>}
          </div>

          <div className="mt-5 w-4/5 mx-auto">
            <InputOTP
              length={6}
              onComplete={(value: any) => {
                setIsValidateOtp(true), setOtp(value);
              }}
            />
          </div>

          <div className="text-center font-sans mt-10">
            <div>Didn’t receive the code?</div>
            <button
              disabled={remaining > 0}
              onClick={handleResendCode}
              className={
                remaining == 0
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
              className={`w-full text-white px-3 py-2 rounded-lg font-sans font-semibold ${
                formState.isValid
                  ? "bg-[#0C71BA]"
                  : "bg-[DBE9FE] cursor-not-allowed"
              }`}
              type="submit"
              onClick={handleSubmitOTP}
              disabled={!isValidateOtp}
            >
              Verify & Proceed
            </button>
          </div>
        </Modal>
      )}
    </React.Fragment>
  );
};

export default ForgetPasswordForm;
