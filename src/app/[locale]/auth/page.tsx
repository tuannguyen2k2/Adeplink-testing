"use client";
import React, { useState } from "react";
import Image from "next/image";
import AuthBackgroundImage from "@/assets/images/login-background.png";
import LoginFormPage from "./LoginForm";
import SignupForm from "./SignupForm";
import ForgetPasswordForm from "./ForgetPasswordForm";
import SuccessfullyForm from "./SuccessfullyForm";
import ResetPasswordForm from "./ResetPasswordForm";

const AuthPage = () => {
  const [selectedTab, setSelectedTab] = useState<
    | "login"
    | "signup"
    | "change-password"
    | "reset-password"
    | "forget-password"
    | "successfully"
  >("login");

  return (
    <div
      className="w-full h-screen bg-white flex bg-['@/assets/images/login-background.png'] flex justify-end"
      style={{
        backgroundImage: `url('${AuthBackgroundImage.src}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-[100%] md:w-[80%] xl:w-1/2 md:rounded-l-[2.5rem] bg-white relative overflow-hidden">
        <div
          className={` top-0 bottom-0 w-full h-screen right-0 transition-all duration-300  ${
            selectedTab === "signup" ? "translate-x-0" : "translate-x-full"
          } z-10`}
        >
          {selectedTab === "signup" && (
            <SignupForm setSelectedTab={setSelectedTab} />
          )}
        </div>
        <div
          className={` top-0 bottom-0 w-full h-screen right-0 transition-all duration-300 ${
            selectedTab === "forget-password"
              ? "translate-x-0"
              : "translate-x-full"
          } z-10`}
        >
          {selectedTab === "forget-password" && (
            <ForgetPasswordForm setSelectedTab={setSelectedTab} />
          )}
        </div>
        <div
          className={` top-0 bottom-0 w-full h-screen right-0 transition-all duration-300 ${
            selectedTab === "reset-password"
              ? "translate-x-0"
              : "translate-x-full"
          } z-10`}
        >
          {selectedTab === "reset-password" && (
            <ResetPasswordForm setSelectedTab={setSelectedTab} />
          )}
        </div>
        <div
          className={` top-0 bottom-0 w-full h-screen right-0 transition-all duration-300 ${
            selectedTab === "successfully"
              ? "translate-x-0"
              : "translate-x-full"
          } z-10`}
        >
          {selectedTab === "successfully" && <SuccessfullyForm />}
        </div>
        <div
          className={`absolute top-0 bottom-0 w-full h-screen right-0 transition-all duration-300  ${
            selectedTab === "login" ? "translate-x-0" : "translate-x-full"
          } z-10`}
        >
          <LoginFormPage setSelectedTab={setSelectedTab} />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

export type selectedTabType = {
  setSelectedTab: React.Dispatch<
    React.SetStateAction<
      | "login"
      | "signup"
      | "change-password"
      | "reset-password"
      | "forget-password"
      | "successfully"
    >
  >;
};
