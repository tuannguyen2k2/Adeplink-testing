"use server";
import { ADEPTLINK_LOGIN } from "@/constant/cookies";
import { LoginResponse } from "@/interface/user";
import { NextResponse } from "next/server";

export const set_cookies = async (
  res: LoginResponse,
  response?: NextResponse
) => {
  console.log(res);
  if (response) {
    response.cookies.set(ADEPTLINK_LOGIN, JSON.stringify(res));
  }
};
