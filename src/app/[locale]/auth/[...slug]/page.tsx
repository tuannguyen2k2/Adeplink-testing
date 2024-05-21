"use client";
import AuthBackgroundImage from "@/assets/images/login-background.png";
import React, { useState } from "react";
import ChangePasswordForm from "./ChangePasswordForm";
import ForgetPasswordForm from "./ForgetPasswordForm";
import LoginFormPage from "./LoginForm";
import SignupForm from "./SignupForm";
import SuccessfullyForm from "./SuccessfullyForm";

export type SlugType =
  | "login"
  | "signup"
  | "change-password"
  | "forget-password"
  | "successfully";
const AuthPage = ({
  params,
}: {
  params: {
    slug: SlugType[];
  };
}) => {
  const [selectedTab, setSelectedTab] = useState<SlugType>(params.slug[0]);
  return (
    <div
      className="w-full h-screen bg-white flex bg-['@/assets/images/login-background.png'] flex justify-end"
      style={{
        backgroundImage: `url('${AuthBackgroundImage.src}')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "57% auto",
        backgroundPosition: "left",
      }}
    >
      <div className="w-[100%] md:w-[80%] xl:w-1/2 md:rounded-l-[2.5rem] bg-white relative overflow-x-hidden overflow-y-auto">
        <div
          className={` top-0 bottom-0 w-full h-screen right-0 transition-all duration-300  ${
            selectedTab === "signup" ? "translate-x-0" : "translate-x-full"
          } z-10`}
        >
          {selectedTab === "signup" && <SignupForm />}
        </div>
        <div
          className={`absolute top-0 bottom-0 w-full h-screen right-0 transition-all duration-300 ${
            selectedTab === "forget-password"
              ? "translate-x-0"
              : "translate-x-full"
          } z-10`}
        >
          {selectedTab === "forget-password" && <ForgetPasswordForm />}
        </div>
        <div
          className={`absolute top-0 bottom-0 w-full h-screen right-0 transition-all duration-300 ${
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
          <LoginFormPage />
        </div>
        <div
          className={`absolute top-0 bottom-0 w-full h-screen right-0 transition-all duration-300 ${
            selectedTab === "change-password"
              ? "translate-x-0"
              : "translate-x-full"
          } z-10`}
        >
          {selectedTab === "change-password" && <ChangePasswordForm />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

export type selectedTabType = {
  setSelectedTab: React.Dispatch<React.SetStateAction<SlugType>>;
};
