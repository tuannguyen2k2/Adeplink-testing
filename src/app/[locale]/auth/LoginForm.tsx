"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Icon } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { LoginForm } from "@/model/form/AuthForm";
import Image from "next/image";
import AppLogo from "@/assets/images/app-logo.png";
import { useLogin } from "@/api/auth/query";
import { checkEmail } from "@/constant/regex";
import { selectedTabType } from "./page";
import GoogleIcon from "@/assets/icons/google-icon.png";

const LoginFormPage = ({ setSelectedTab }: selectedTabType) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login, isPending, error } = useLogin();
  const { register, handleSubmit, formState } = useForm<LoginForm>();
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    login(data);
  };

  return (
    <div className="w-3/5 mx-auto">
      <div className="flex justify-center mt-20">
        <Image src={AppLogo} alt={""} />
      </div>

      <h3 className="font-bold text-2xl text-center">Good to see you again</h3>
      <h4 className="text-center">
        New to AdeptLink?{" "}
        <span
          className="text-[#4285F4] underline hover:cursor-pointer"
          title="Sign up"
          onClick={() => setSelectedTab("signup")}
        >
          Sign up
        </span>
        , it&#39;s free now
      </h4>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-red-500 h-5 mt-5 text-center">
          {error && <span>Username or password incorrect</span>}
        </div>

        <div className="mb-5 h-20">
          <h4 className={formState.errors.username && "text-red-500"}>Email</h4>
          <div className="px-3 py-2 border-2 border-gray-400 rounded">
            <input
              placeholder="example@domain.com"
              className="focus:outline-none w-full"
              {...register("username", {
                required: "Email is require",
                pattern: { value: checkEmail, message: "Email invalid" },
              })}
            />
          </div>
          {formState.errors.username && (
            <div className="text-red-500">
              {formState.errors.username.message}
            </div>
          )}
        </div>
        <div className="mb-5 h-20">
          <div className="flex justify-between">
            <h4 className={formState.errors.password && "text-red-500"}>
              Password
            </h4>
            <span
              onClick={() => setSelectedTab("forget-password")}
              className="text-[#4285F4] hover:underline hover:cursor-pointer"
            >
              Forgot password?
            </span>
          </div>
          <div className="px-3 py-2 border-2 border-gray-400 rounded relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              className="focus:outline-none w-full"
              {...register("password", {
                required: "Password is require",
                // minLength: {
                //   value: 8,
                //   message: "Password at least 8 character",
                // },
              })}
            />
            <Icon
              titleAccess={showPassword ? "Hide password" : "Show password"}
              fontSize="small"
              component={showPassword ? Visibility : VisibilityOff}
              className="absolute right-3 hover:cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {formState.errors.password && (
            <div className="text-red-500">
              {formState.errors.password.message}
            </div>
          )}
        </div>
        <div className="hover:cursor-pointer w-fit">
          <input type="checkbox" /> <span>Remember me</span>
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
          Login
        </button>
      </form>
      <div className="mt-10 border-t-2 relative flex justify-center">
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
  );
};

export default LoginFormPage;
