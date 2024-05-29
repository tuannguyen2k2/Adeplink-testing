"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AppLogo from "@/assets/icons/logo.svg";
import Link from "next/link";
import { useRouter } from "next-nprogress-bar";
import { useCountdown } from "@/hook/useCountdown";
import { HOME_PATH_URL } from "@/constant/pathUrl";

const SuccessfullyForm = () => {
  const router = useRouter();
  const { remaining, handleRunCountDown } = useCountdown(5, () =>
    router.replace(HOME_PATH_URL)
  );
  useEffect(() => {
    handleRunCountDown();
  }, []);
  return (
    <div className="w-[80%] lg:w-3/5 mx-auto">
      <h3 className="font-bold text-2xl text-center mt-[100px]">
        Registered <span className="text-[#0C71BA]">successfully</span>!
      </h3>

      <div className="text-center font-medium">
        Thank you and Welcome to{" "}
        <span className="text-[#0C71BA]">AdeptLink!</span>
        <br /> You will be redirect to Homepage in
      </div>
      <div className="text-center font-semibold text-xl my-3">{remaining}s</div>

      <div className="flex justify-center">
        <Link
          href={HOME_PATH_URL}
          className=" text-white bg-[#0C71BA] mt-5 px-14 py-2 rounded-lg font-semibold "
        >
          Go to Homepage now
        </Link>
      </div>
    </div>
  );
};

export default SuccessfullyForm;
