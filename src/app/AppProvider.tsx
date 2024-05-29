"use client";
import { createContext, useContext, useState } from "react";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
const AppContext = createContext({
  sessionToken: "",
  setSessionToken: (sessionToken: string) => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("error");
  }
  return context;
};

export default function AppProvider({
  children,
  initialSessionToken = "",
}: {
  children: React.ReactNode;
  initialSessionToken?: string;
}) {
  const [sessionToken, setSessionToken] = useState(initialSessionToken);
  return (
    <AppContext.Provider value={{ sessionToken, setSessionToken }}>
      {children}
    </AppContext.Provider>
  );
}

export const ProgressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <ProgressBar
        height="2px"
        color="#0B7ECA"
        options={{ showSpinner: false }}
        shallowRouting
      />
      {children}
    </>
  );
};
