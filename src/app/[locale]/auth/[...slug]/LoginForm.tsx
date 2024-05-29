"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Icon } from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { LoginForm } from "@/model/form/AuthForm";
import Image from "next/image";
import AppLogo from "@/assets/icons/logo.svg";
import { useLogin } from "@/api/auth/query";
import { checkEmail } from "@/constant/regex";
import { selectedTabType } from "./page";
import GoogleIcon from "@/assets/icons/google-icon.png";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store/slice/accountSlice";
import { userSelector } from "@/store/selector";
import { useRouter } from "next-nprogress-bar";
import Cookies from "js-cookie";
import { AUTH_PATH_URL, HOME_PATH_URL } from "@/constant/pathUrl";

const LoginFormPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { login, isPending, error } = useLogin();
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<LoginForm>();
  const dispatch = useDispatch();
  const user = useSelector(userSelector);
  const locale = Cookies.get("NEXT_LOCALE");
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    login(data);
  };

  return (
    <div className="w-[80%] lg:w-3/5 mx-auto">
      <div className="flex flex-col items-center">
        <div
          className="flex justify-center mt-10 lg:mt-[100px] mr-7 cursor-pointer"
          onClick={() => router.push(HOME_PATH_URL)}
        >
          <Image src={AppLogo} alt={""} />
          <span className="text-[#0B7ECA] text-[48px] font-bold">
            Adeptlink
          </span>
        </div>

        <h3 className="font-semibold text-2xl text-center">
          Good to see you again
        </h3>
        <h4 className="text-center">
          New to <span className="font-medium">AdeptLink?</span>{" "}
          <span
            className="text-[#0C71BA] underline hover:cursor-pointer font-medium"
            title="Sign up"
            onClick={() => router.push(AUTH_PATH_URL.SIGN_UP)}
          >
            Sign up
          </span>
          , it&#39;s free now
        </h4>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="text-red-500 h-5 mt-5 text-center font-sans font-medium">
          {error && <span>Incorrect email address or password.</span>}
        </div>

        <div className="mb-5 h-20 mt-2">
          <h4
            className={`font-medium mb-2 ${
              formState.errors.username && "text-red-500"
            }`}
          >
            Email Address
          </h4>
          <div className="px-3 py-2 border-[1px] border-gray-400 rounded-lg">
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
            <h4
              className={`font-medium mb-2 ${
                formState.errors.password && "text-red-500"
              }`}
            >
              Password
            </h4>
            <span
              onClick={() => router.push(AUTH_PATH_URL.FORGET_PASSWORD)}
              className="text-[#0C71BA] hover:underline hover:cursor-pointer font-medium"
            >
              Forgot password?
            </span>
          </div>
          <div className="px-3 py-2 border-[1px] border-gray-400 rounded-lg relative">
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
        <div className="hover:cursor-pointer w-fit flex items-center gap-2">
          <input type="checkbox" className="w-[18px] h-[18px] cursor-pointer" />{" "}
          <span>Remember me</span>
        </div>
        <button
          className={`w-full text-white mt-5 px-3 py-2 rounded-lg ${
            formState.isValid
              ? "bg-[#0C71BA]"
              : "bg-[#DBE9FE] cursor-not-allowed"
          }`}
          type="submit"
          disabled={!formState.isValid}
        >
          Log in
        </button>
      </form>
      <div className="mt-10  relative flex items-center w-full">
        <div className="w-full bg-[#E5E7EB] h-[1px]"></div>
        <span className=" bg-white px-4 opacity-60 whitespace-nowrap">
          or continue with
        </span>
        <div className="w-full bg-[#E5E7EB] h-[1px]"></div>
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
