import { format } from "date-fns";
import { ChangeEvent } from "react";

export const isAuthenticated = () => localStorage.getItem('auth') !== null;
  
export const onChange = (setValues: Function, event: ChangeEvent<HTMLInputElement>) => {
  setValues((oldValues: any) => ({...oldValues, [event.target.name]: event.target.value}));
}

export const onChangeSelect = (setValues: Function, value: any, name: string) => {
  setValues((oldValues: any) => ({...oldValues, [name]: value}));
}
  
export const onChangeHandleErrors = (setValues: Function, setErrors: Function, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setValues((oldValues: any) => ({...oldValues, [event.target.name]: event.target.value}));
  setErrors((oldErrors: any[]) => {
    const index = oldErrors.findIndex((x: any) => x.path == event.target.name);
    if (index !== -1) oldErrors.splice(index, 1);
    return oldErrors
  });
}
  
export const onChangeSelectHandleErrors = (setValues: Function, setErrors: Function, value: any, name: string) => {
  setValues((oldValues: any) => ({...oldValues, [name]: value}));
  setErrors((oldErrors: any) => {
    if (oldErrors[name]) {
      delete oldErrors[name]
    }

    return oldErrors
  });
}

export const formatDate = (date: Date | string) => {
  if (date == '') return '';
  if (typeof date === 'string') {
    date = new Date(date)
  }
  return format(date,"yyyy-MM-dd'T'HH:mm")
}