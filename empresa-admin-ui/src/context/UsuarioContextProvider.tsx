"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { UsuarioContext } from "./UsuarioContext";
import { User } from "next-auth";

interface IProps {
  children: ReactNode;
}

const UsuarioContextProvider = ({ children }: IProps) => {
  const [usuario, setUsuario] = useState<User | null | undefined>(null);

  const saveUsuario = (data: User | null | undefined) => {
    localStorage.setItem('usuario', JSON.stringify(data))
    setUsuario(data);
  }

  const getUsuario = () => usuario;

  const getUsuarioStorage = () => {
    const user = localStorage.getItem('usuario');
    if (user !== null && user !== undefined) {
      const userParser = JSON.parse(user ?? '');
      setUsuario(userParser)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      getUsuarioStorage();
    }
  }, [])

  

  return (
    <UsuarioContext.Provider
      value={{
        getUsuario,
        saveUsuario,
      }}
    >
      {children}
    </UsuarioContext.Provider>
  );
};

export default UsuarioContextProvider;