import { ValidationParams } from "../types";

const singleFieldValidation = async (schema: any, field: any) => {
  const field_path = Object.keys(field);
  const data = await schema.validateAt(field_path[0], field);
  return { data };
}

const formValidation = async (schema: any, values: any) => {
  const data = await schema.validate(values, {abortEarly: false});
  return { data };
}

export const resolveValidation = async (params: ValidationParams) => {
  const { mode, schema, fields } = params;
  
  try {
    if (mode === 'singleField') {
      return await singleFieldValidation(schema, fields);
    }
    if (mode === 'formFields') {
      return await formValidation(schema, fields);
    }
  } catch(error: any) {
    if (!error.inner) {
      throw error;
    }
    return { error };
  }
}

export const resolveErrors = (setErrors: Function, errors: any) => {
    let new_errors: any = []
    errors.forEach((error: any, i: number) => {
        new_errors[i] = {path: error.path, message: error.message}
    })
    setErrors(new_errors);
    window.scrollTo(0, 0);
}

export const percentageValue = (value: number) => {
  return Intl.NumberFormat("pt-BR", { 
    // style: "percent", 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}