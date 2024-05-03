"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import AppLogo from "@/assets/images/app-logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCountdown } from "@/hook/useCountdown";

const SuccessfullyForm = () => {
  const router = useRouter();
  const countdown = useCountdown(5, () => router.push("/"));

  return (
    <div className="w-3/5 mx-auto">
      <div className="flex justify-center mt-24">
        <Image src={AppLogo} alt={""} />
      </div>

      <h3 className="font-bold text-2xl text-center">
        Registered <span className="text-blue-500">successfully</span>!
      </h3>

      <div className="text-center">
        Thank you and Welcome to{" "}
        <span className="text-blue-500">AdeptLink!</span>
        <br /> You will be redirect to Homepage in
      </div>
      <div className="text-center font-semibold text-xl my-3">{countdown}s</div>

      <div className="flex justify-center">
        <Link
          href={"/"}
          className=" text-white bg-blue-500 mt-5 px-3 py-2 rounded "
        >
          Go to Homepage now
        </Link>
      </div>
    </div>
  );
};

export default SuccessfullyForm;
