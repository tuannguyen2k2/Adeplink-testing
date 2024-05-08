import React, { useState } from "react";
import Image from "next/image";
import AppLogo from "@/assets/images/app-logo.png";
import { SubmitHandler, useForm } from "react-hook-form";
import { resetPasswordDto } from "@/interface/user";
import { useResetPassword } from "@/api/auth/query";
import { Icon as MUIcon } from "@mui/material/";
import { Tooltip } from "antd";
import {
  CheckSpecial,
  checkLength,
  checkNumber,
  checkUpper,
} from "@/constant/regex";
import {
  VisibilityOff,
  Visibility,
  CheckCircleOutline,
  HighlightOff,
} from "@mui/icons-material";
import { selectedTabType } from "./page";
import { useRouter } from "next/navigation";

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
  <div className={`my-2 mr-2 h-[5rem] ${className}`}>
    <h4>
      <span className="text-red-500">*</span>
      {title}
    </h4>
    <div className="border-2 border-gray-300 rounded w-full px-3 py-2">
      {children}
    </div>
    {error && <div className="text-red-500">{error}</div>}
  </div>
);

const ResetPasswordForm = () => {
  const [showPassword, setShowPassword] = useState<{
    password: boolean;
    confirm: boolean;
  }>({ password: false, confirm: false });
  const [showValidatePassword, setShowValidatePassword] = useState(false);
  const [validated, setValidated] = useState({
    upperValidated: false,
    numberValidated: false,
    specialValidated: false,
    lengthValidated: false,
  });
  const router = useRouter();
  const { resetPassword, isPending, error, isSuccess } = useResetPassword();
  const { register, handleSubmit, formState, setValue, watch } =
    useForm<resetPasswordDto>();
  const onSubmit: SubmitHandler<resetPasswordDto> = async (data) => {
    resetPassword(data);
    router.push("/en/auth/successfully");
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
            <MUIcon component={CheckCircleOutline} fontSize="inherit" />
          ) : (
            <MUIcon component={HighlightOff} fontSize="inherit" color="error" />
          )}
          <span className="ml-1">Between 8 and 20 characters long</span>
        </div>
        <div className={`${validated.upperValidated && "text-green-500"}`}>
          {validated.upperValidated ? (
            <MUIcon component={CheckCircleOutline} fontSize="inherit" />
          ) : (
            <MUIcon component={HighlightOff} fontSize="inherit" color="error" />
          )}
          <span className="ml-1">Contains at least 1 upper case character</span>
        </div>
        <div className={`${validated.numberValidated && "text-green-500"}`}>
          {validated.numberValidated ? (
            <MUIcon component={CheckCircleOutline} fontSize="inherit" />
          ) : (
            <MUIcon component={HighlightOff} fontSize="inherit" color="error" />
          )}
          <span className="ml-1">Contains at least 1 numberic character</span>
        </div>
        <div className={`${validated.specialValidated && "text-green-500"}`}>
          {validated.specialValidated ? (
            <MUIcon component={CheckCircleOutline} fontSize="inherit" />
          ) : (
            <MUIcon component={HighlightOff} fontSize="inherit" color="error" />
          )}
          <span className="ml-1">Contains at least 1 special character</span>
        </div>
      </div>
    );
  };

  return (
    <div className="w-3/5 h-full mx-auto">
      <div className="flex justify-center mt-20">
        <Image src={AppLogo} alt={""} />
      </div>

      <h3 className="font-bold text-2xl text-center">
        <span className="text-blue-400">Change</span>&nbsp;password
      </h3>
      <h4 className="text-center">Please enter the new password</h4>

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputComponent
          title="Password"
          className="col-span-6 relative"
          error={formState.errors.password?.message}
        >
          <Tooltip
            title={<ValidatePasswordForm />}
            placement="top"
            open={showValidatePassword}
            color="#FFF"
          >
            <input
              size={35}
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
          <MUIcon
            titleAccess={
              showPassword.password ? "Hide password" : "Show password"
            }
            fontSize="small"
            component={showPassword.password ? Visibility : VisibilityOff}
            className="absolute right-3 hover:cursor-pointer"
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
          className="col-span-6 relative"
          error={formState.errors.confirmPassword?.message}
        >
          <input
            size={35}
            type={showPassword.confirm ? "text" : "password"}
            placeholder="********"
            className="focus:outline-none"
            {...register("confirmPassword", {
              required: "Confirm password is require",
              validate: (value) =>
                value === watch("password") || "Confirm do not match",
            })}
          />
          <MUIcon
            titleAccess={
              showPassword.confirm ? "Hide password" : "Show password"
            }
            fontSize="small"
            component={showPassword.confirm ? Visibility : VisibilityOff}
            className="absolute right-3"
            onClick={() =>
              setShowPassword({
                ...showPassword,
                confirm: !showPassword.confirm,
              })
            }
          />
        </InputComponent>

        <button
          className={`w-full text-white mt-5 px-3 py-2 rounded ${
            formState.isValid
              ? "bg-[#4285F4]"
              : "bg-blue-300 cursor-not-allowed"
          }`}
          type="submit"
          disabled={!formState.isValid}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
