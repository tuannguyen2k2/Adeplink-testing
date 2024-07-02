/* eslint-disable react/no-unescaped-entities */
import { Box, Button, Typography, useTheme } from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { InputVerfication } from "./inputVerification";
import InputOTP from "@/component/InputOTP";
import { Modal } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCountdown } from "@/hook/useCountdown";

interface IEmailVerification {
  open: boolean;
  onClose: () => void;
  email: string;
  setShowValidateEmail: Dispatch<SetStateAction<boolean>>;
  isOtpError: boolean;
  otp: string;
  setOtp: Dispatch<SetStateAction<string>>;
  handleResendCode: () => void;
  handleSubmitOTP: () => void;
  setIsValidateOtp: Dispatch<SetStateAction<boolean>>;
  isValidateOtp: boolean;
}

const EmailVerification = ({
  open,
  onClose,
  email,
  setShowValidateEmail,
  isOtpError,
  otp,
  setOtp,
  handleResendCode,
  handleSubmitOTP,
  setIsValidateOtp,
  isValidateOtp,
}: IEmailVerification) => {
  const [isResend, setIsResend] = useState(false);
  const { remaining, handleRunCountDown } = useCountdown(60);
  useEffect(() => {
    handleRunCountDown();
  }, []);
  
  return (
    <Modal open={open} onCancel={onClose} footer={false}>
      <h4 className="text-center text-xl font-semibold font-sans mt-6">
        Email <span className="text-[#0C71BA]">verification</span>
      </h4>
      <div className="text-center mb-2  font-sans">
        A six-digit verification code has been sent to your email address:{" "}
        <span className="font-medium ">{email}</span>
      </div>

      <div className="h-5 text-red-400 text-center font-sans">
        {isOtpError && open && <span>OTP incorrect</span>}
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
          onClick={() => {
            handleResendCode();
            handleRunCountDown();
            setIsResend(true);
          }}
          className={
            remaining === 0
              ? "text-[#0C71BA] font-medium"
              : "text-[#DC2626] font-medium"
          }
        >
          Resend Code&nbsp;
        </button>
        {remaining > 0 && <span className="font-medium">0:{remaining}</span>}
      </div>

      <div className="w-4/5 mx-auto mt-5">
        <button
          className={`w-full text-white px-3 font-sans py-2 rounded-lg ${
            isValidateOtp ? "bg-[#4285F4]" : "bg-blue-300 cursor-not-allowed"
          }`}
          type="submit"
          disabled={!isValidateOtp}
          onClick={() => handleSubmitOTP()}
        >
          Verify & Proceed
        </button>
      </div>
    </Modal>
  );
};

export default EmailVerification;
