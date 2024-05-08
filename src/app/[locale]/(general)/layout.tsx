"use client"
import Footer from "@/component/footer/Footer";
import Header from "@/component/header/Header";
import SidebarMobile from "@/component/header/mobile/SidebarMobile";
import { setUser } from "@/store/slice/accountSlice";
import { Hidden } from "@mui/material";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch();
  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, []);
  return (
    <>
      <Header />
      {children}
      <Footer />
      <Hidden smUp><SidebarMobile /></Hidden>
    </>
  );
}
