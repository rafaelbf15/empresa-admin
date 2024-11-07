'use client'

import UsuarioContextProvider from "@/context/UsuarioContextProvider";
import { ThemeProvider } from "@material-tailwind/react";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

const theme = {
  tooltip: {
    defaultProps: {
      interactive: false,
      placement: "top",
      offset: 5,
      className: "text-white font-['Helvetica'] p-2 rounded bg-black-100",
    },
  },
 };

interface IProps {
  children: React.ReactNode,
  session: Session | null
}


export const Providers = ({ children, session }: IProps) => {
  return (
    <SessionProvider session={session}>
        <UsuarioContextProvider>
          <ThemeProvider value={theme}>
            <Toaster position="top-right" />
            {children as React.ReactElement}
          </ThemeProvider>
        </UsuarioContextProvider>
    </SessionProvider>
  )
}