'use client'

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";
import PasswordField from '@/components/PasswordFieldComponent';
import { getSession, signIn } from "next-auth/react";
import { Helpers, Validation } from '@/utils';
import Yup from '@/utils/yup.config';
import { useRouter } from 'next/navigation'
import { useUsuarioContext } from '@/context/UsuarioContext';
import toast from 'react-hot-toast';

function SignInPage() {
  const router = useRouter();
  const [values, setValues] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);
  const { saveUsuario } = useUsuarioContext()

  const formSchema = Yup.object({
    email: Yup.string().email().required().label('E-mail'),
    password: Yup.string().required().label('Senha'),
  });

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrors([]);
    setIsLoading(true);
    const data: any = await Validation.resolveValidation({ schema: formSchema, mode: 'formFields', fields: values });
    if (data.error) {
      Validation.resolveErrors(setErrors, data.error.inner);
      setIsLoading(false);
    } else {
      try {
        const response = await signIn('credentials', {
          redirect: false,
          email: values['email'],
          senha: values['password'],
        })
        setIsLoading(false)
        if (response?.ok) {
          const session = await getSession()
          saveUsuario(session?.user);
          router.refresh();
          router.push('/');
        } else {
          setErrors([{ path: 'email-senha', message: 'Email ou senha inválidos' }])
        }
      } catch (error) {
        toast.error('Erro ao realizar login, tente novamente!')
        setIsLoading(false)
        console.log('[LOGIN_ERROR]: ', error)
      }
    }
  };

  return (
    <>
          <Card className={`w-full md:w-96 bg-black-100 opacity-[.9]`} placeholder={undefined} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}} >
            <form onSubmit={onSubmit}>
              <CardBody className="flex flex-col gap-4" placeholder={undefined} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                <h2 className="text-h3 font-bold text-white mb-2 text-center">GERENCIADOR DE FUNCIONÁRIOS</h2>
                <p className='text-white'>Email:</p>
                <Input
                name='email'
                size="lg"
                className='bg-white overscroll-contain'
                value={values['email']}
                onChange={(event: ChangeEvent<HTMLInputElement>) => Helpers.onChangeHandleErrors(setValues, setErrors, event)}
                crossOrigin={undefined}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}  onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}/>
                <p className='text-white'>Senha:</p>
                <PasswordField
                  name='password'
                  className='bg-white overscroll-contain'
                  value={values['password']}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => Helpers.onChangeHandleErrors(setValues, setErrors, event)} />
              </CardBody>
              <CardFooter className="pt-0" placeholder={undefined} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                <Button type='submit' variant="gradient" fullWidth disabled={isLoading} placeholder={undefined}  onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </Button>
                {
                  errors?.length > 0 && errors.map((error: any, i: number) => (
                    <p key={i} className="text-red-500 text-sm mt-2">{error.message}</p>
                  ))
                }
                <Typography variant="small" className="mt-6 flex justify-center text-white" placeholder={undefined} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                  Ainda não possui conta?
                  <Link href="sign-up" className="ml-1 font-bold">
                    Cadastre-se
                  </Link>
                </Typography>
              </CardFooter>
            </form>
          </Card>
        </>
  );
}

export default SignInPage;
