import { UsuarioType } from '@/types';
import { User } from 'next-auth';
import { createContext, useContext, useState } from 'react';


interface IUsuarioContext {
  getUsuario: () => User | null | undefined;
  saveUsuario: (usuario: User | null | undefined) => void;
}

export const UsuarioContext = createContext<IUsuarioContext>({
  getUsuario: () => null,
  saveUsuario: () => {},
});

export const useUsuarioContext = () => useContext(UsuarioContext);
