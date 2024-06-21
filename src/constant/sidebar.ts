import { FaThLarge } from "react-icons/fa";
import { IoLayersSharp, IoCube, IoSettings, IoLogOut } from "react-icons/io5";
import { HiUsers } from "react-icons/hi2";
import { BiSolidLayout } from "react-icons/bi";
import { ADMIN_PATH_SUPPLIERS_URL } from "./pathUrl";

export const NAVIGATION = [
  {
    label: "Dashboard",
    Icon: FaThLarge,
    path: "/dashboard",
  },

  {
    label: "Categories",
    Icon: BiSolidLayout,
    path: "/categroies",
  },
  {
    label: "Products",
    Icon: IoCube,
    path: "/products",
  },
  {
    label: "Orders",
    Icon: IoLayersSharp,
    path: "/orders",
  },
  {
    label: "Users",
    Icon: HiUsers,
    path: "/users",
    subItems: [
      {
        label: "Buyer",
        path: "/buyer",
      },
      {
        label: "Supplier",
        path: ADMIN_PATH_SUPPLIERS_URL,
      },
      {
        label: "Admin",
        path: "admin_",
      },
      {
        label: "Buyers",
        path: "buyers",
      },
    ],
  },
  {
    label: "Settings",
    Icon: IoSettings,
    path: "/settings",
  },
  {
    label: "Logout",
    Icon: IoLogOut,
    path: "/logout",
  },
];
