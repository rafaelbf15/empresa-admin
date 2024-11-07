export interface FuncionarioType {
  id?: string;
  nome: string;
  sobrenome: string;
  emailCorporativo: string;
  numeroChapa?: number;
  telefones?: string;
  telefoneList: string[];
  liderId?: string;
  nomeLider?: string;
  senha?: string;
  userId?: string;
  dataRemocao?: Date;
  dataCadastro?: Date;
}



export interface UsuarioType {
  id: string;
  accessToken: string;
  nome: string;
  email: string;
}

export interface ValidationParams {
  schema: any,
  mode: string,
  fields: any
}



export type TColors = 'primary-l' | 'primary-m' | 'primary-d' | 'secondary-l' | 'secondary-m' | 'secondary-d' | 'gray-900' | 'gray-800' | 'gray-700' | 'gray-600' | 'gray-500' | 'gray-400' | 'gray-300' | 'gray-200' | 'gray-100' | 'white' | 'black' | 'error' | 'success' | 'warning' | 'info'

export type TIconName = "upload" | "trash" | "edit" | "person" | "dashboard" | "logout" | "sick" | "hospital" | "group" | "smile" | "search" | "chevronLeft" | "chevronRight" | "chevronDown" | "eye" | "filter" | "calendar" | "menu" | "info" | "cross" | "arrowBack" | "pencil" | 'fill_info' | 'fill_check' | 'fill_error' | 'fill_warning'