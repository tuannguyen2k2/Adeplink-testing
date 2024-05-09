"use client";
import { useResetPassword } from "@/api/auth/query";
import AppLogo from "@/assets/icons/logo.svg";
import SuccessModal from "@/component/auth/SuccessModal";
import { InputComponent } from "@/component/common/InputComponent";
import { ValidatePasswordForm } from "@/component/common/ValidatePasswordForm";
import {
  CheckSpecial,
  checkLength,
  checkNumber,
  checkUpper,
} from "@/constant/regex";
import { ChangePasswordForm } from "@/model/form/AuthForm";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Icon } from "@mui/material";
import { Tooltip } from "antd";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoMdArrowBack } from "react-icons/io";

const ChangePasswordFormPage = () => {
  const [showPassword, setShowPassword] = useState<{
    password: boolean;
    confirm: boolean;
  }>({ password: false, confirm: false });
  const [showValidatePassword, setShowValidatePassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [validated, setValidated] = useState({
    upperValidated: false,
    numberValidated: false,
    specialValidated: false,
    lengthValidated: false,
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const otp = searchParams.get("otp") ?? "";
  const { register, handleSubmit, formState, setValue, watch, getValues } =
    useForm<ChangePasswordForm>();
  const { resetPassword, isPending, error, isSuccess } = useResetPassword();
  const onSubmit: SubmitHandler<{
    password: string;
    confirmPassword: string;
  }> = async (data) => {
    resetPassword({
      email,
      otp,
      new_password: data.password,
      confirm_password: data.confirmPassword,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      setShowSuccessModal(true);
    }
  }, [isSuccess]);

  const handleValidatePassword = (value: string) => {
    setValidated({
      ...validated,
      upperValidated: checkUpper.test(value),
      numberValidated: checkNumber.test(value),
      specialValidated: CheckSpecial.test(value),
      lengthValidated: checkLength.test(value),
    });
  };
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
            <span className="text-[#0C71BA]">Change</span>&nbsp;password
          </h3>
          <h4 className="text-center">Please enter the new password</h4>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-5 w-[80%]">
            <div className="mb-5">
              <InputComponent
                title="New password"
                className="  relative mb-2"
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
                title="Confirm new password"
                className="  relative mb-2"
                error={formState.errors.confirmPassword?.message}
              >
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  placeholder="********"
                  className="focus:outline-none w-full"
                  {...register("confirmPassword", {
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
      {showSuccessModal && (
        <SuccessModal
          showSuccessModal={showSuccessModal}
          title={
            <div>
              <h3 className="font-bold text-2xl text-center font-sans">
                <span className="text-[#0C71BA]">Successful</span> password
                reset!
              </h3>
              <div className="text-center font-medium font-sans text-[16px] mt-1">
                Your new password has been{" "}
                <span className="text-[#0C71BA]">updated.</span>
                <br /> You will be redirect to Homepage in
              </div>
            </div>
          }
        />
      )}
    </React.Fragment>
  );
};

export default ChangePasswordFormPage;
