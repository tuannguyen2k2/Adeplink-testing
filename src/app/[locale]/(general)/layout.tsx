import Footer from "@/component/footer/Footer";
import Header from "@/component/header/Header";
import SidebarMobile from "@/component/header/mobile/SidebarMobile";
import { Hidden } from "@mui/material";

export default function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <Hidden smUp><SidebarMobile /></Hidden>
    </>
  );
}
