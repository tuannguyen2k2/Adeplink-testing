"use client";
import React, { useState } from "react";
import AppLogo from "@/assets/images/app-logo.png";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { Modal } from "antd";
import InputOTP from "@/component/InputOTP";
import { useSendOTP, useVerifyOTP } from "@/api/auth/query";
import { useCountdown } from "@/hook/useCountdown";
import { selectedTabType } from "./page";

const ForgetPasswordForm = ({ setSelectedTab }: selectedTabType) => {
  const [showValidateEmail, setShowValidateEmail] = useState<boolean>(false);
  const [otp, setOtp] = useState("");
  const [isEnableResendOtp, setIsEnableResendOtp] = useState(false);
  const [isValidateOtp, setIsValidateOtp] = useState(false);
  const [isOtpError, setIsOtpError] = useState<string | null>(null);
  const countdown = useCountdown(60, () => setIsEnableResendOtp(true));
  const { sendOtp, error } = useSendOTP();
  const { verifyOtp, isSuccess, data: tokenData } = useVerifyOTP();

  const { register, handleSubmit, formState, getValues } = useForm<{
    email: string;
  }>();
  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    setShowValidateEmail(true);
    sendOtp(data.email);
  };

  const handleSubmitOTP = async () => {
    try {
      verifyOtp({ email: getValues().email, otp: otp as string });
      console.log("DDDDDDDDDDDDDDDDDDDDDDDDD", tokenData);
      if (isSuccess) {
        setSelectedTab("reset-password");
      } else {
        setIsOtpError("Incorrect OTP");
      }
    } catch {
      setIsOtpError("Something error");
    }
  };

  return (
    <React.Fragment>
      <div className="bg-white h-full w-full">
        <div
          className="hover:underline text-blue-400 hover:cursor-pointer ml-10 mt-5"
          onClick={() => setSelectedTab("login")}
        >
          Back to Login
        </div>
        <div className="w-3/5 mx-auto">
          <div className="flex justify-center pt-20">
            <Image src={AppLogo} alt={""} />
          </div>
          <h3 className="font-bold text-2xl text-center">
            <span className="text-blue-400">Forgot</span>&nbsp;password
          </h3>
          <h4 className="text-center">
            Please enter your account email to receive password reset link.
          </h4>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
            <div className="mb-5 h-20">
              <h4 className={formState.errors.email && "text-red-500"}>
                Email
              </h4>
              <div className="px-3 py-2 border-2 border-gray-400 rounded">
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
                  ? "bg-[#4285F4]"
                  : "bg-blue-300 cursor-not-allowed"
              }`}
              type="submit"
              disabled={!formState.isValid}
            >
              Reset password
            </button>
          </form>
        </div>
      </div>

      {showValidateEmail && (
        <Modal
          open={showValidateEmail}
          onCancel={() => setShowValidateEmail(false)}
          style={{ top: 200, right: -400 }}
          okButtonProps={{ style: { backgroundColor: "#1677ff" } }}
          footer={false}
        >
          <h4 className="text-center text-xl font-medium">
            Email <span className="text-blue-400">verification</span>
          </h4>
          <div className="text-center">
            A six-digit verification code has been sent to your email address:{" "}
            <span className="font-medium">{getValues().email}</span>
          </div>

          <div className="h-5 text-red-400 text-center">
            {isOtpError && <span>{isOtpError}</span>}
          </div>

          <div className="mt-5 w-4/5 mx-auto">
            <InputOTP
              length={6}
              onComplete={(value: any) => {
                setIsValidateOtp(true), setOtp(value);
              }}
            />
          </div>

          <div className="text-center">
            <div>Did not receive the code?</div>
            <button
              disabled={!isEnableResendOtp}
              className={
                isEnableResendOtp ? "text-blue-500 underline" : "text-red-400"
              }
            >
              Resend code&nbsp;
            </button>
            {countdown > 0 && (
              <span className="font-medium">0:{countdown}</span>
            )}
          </div>

          <div className="w-4/5 mx-auto mt-5">
            <button
              className={`w-full text-white px-3 py-2 rounded ${
                formState.isValid
                  ? "bg-[#4285F4]"
                  : "bg-blue-300 cursor-not-allowed"
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
