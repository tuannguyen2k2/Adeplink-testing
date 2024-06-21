import { FaThLarge } from "react-icons/fa";
import { IoLayersSharp, IoCube, IoSettings, IoLogOut } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import { BiSolidLayout } from "react-icons/bi";

export const NAVIGATION = [
  {
    label: "Dashboard",
    Icon: FaThLarge,
    path: "/",
  },

  {
    label: "Categories",
    Icon: BiSolidLayout,
    path: "/",
  },
  {
    label: "Products",
    Icon: IoCube,
    path: "/",
  },
  {
    label: "Orders",
    Icon: IoLayersSharp,
    path: "/",
  },
  {
    label: "Users",
    Icon: HiUsers,
    path: "/",
    children: [
      {
        label: "Buyer",
        path: "",
      },
      {
        label: "Supplier",
        path: "",
      },
      {
        label: "Admin",
        path: "",
      },
      {
        label: "Buyers",
        path: "",
      },
    ],
  },
  {
    label: "Settings",
    Icon: IoSettings,
    path: "/",
  },
  {
    label: "Logout",
    Icon: IoLogOut,
    path: "/",
  },
];
