'use client'

import { ChangeEvent, FormEvent, useState } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import PasswordField from '@/components/PasswordFieldComponent';
import { Helpers, Validation } from '@/utils';
import Yup from '@/utils/yup.config';
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast';
import axios from '@/lib/axios';
import Link from 'next/link';

function SignInPage() {
  const router = useRouter();
  const [values, setValues] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);


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
        const response = await axios.post('v1/auth/nova-conta', {
          nome: values['nome'],
          sobrenome: values['sobrenome'],
          email: values['email'],
          senha: values['password'],
          senhaConfirmacao: values['confirmPassword']
        })
        setIsLoading(false)
        if (response?.status === 200) {
          toast.success('Usuário cadastrado com sucesso!')
          router.push('/auth/sign-in')
        } 
      } catch (error) {
        setIsLoading(false)
        console.log('error', error)
        if ((error as any).response.data.statusCode == 400) {
          setErrors((error as any).response.data.message?.map((msg: any[]) => ({ message: msg[0] })))
        }
        toast.error('Erro ao cadastrar usuário, tente novamente!')
      }
    }
  };

  return (
    <>
        <Card className={`w-full md:w-96 bg-black-100 opacity-[.9]`} placeholder={undefined} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
            <form onSubmit={onSubmit}>
              <CardBody className="flex flex-col gap-4" placeholder={undefined} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                <h2 className="text-h3 font-bold text-white mb-2 text-center">GERENCIADOR DE FUNCIONÁRIOS</h2>
                <p className='text-white'>Nome:</p>
                <Input
                name='nome'
                size="lg"
                className='bg-white overscroll-contain'
                value={values['nome']}
                onChange={(event: ChangeEvent<HTMLInputElement>) => Helpers.onChangeHandleErrors(setValues, setErrors, event)}
                crossOrigin={undefined}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}  onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}/>
                <p className='text-white'>Sobrenome:</p>
                <Input
                name='sobrenome'
                size="lg"
                className='bg-white overscroll-contain'
                value={values['sobrenome']}
                onChange={(event: ChangeEvent<HTMLInputElement>) => Helpers.onChangeHandleErrors(setValues, setErrors, event)}
                crossOrigin={undefined}
                labelProps={{
                  className: "before:content-none after:content-none",
                }}  onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}/>
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
                  <p className='text-white'>Confirmar Senha:</p>
                <PasswordField
                  name='confirmPassword'
                  className='bg-white overscroll-contain'
                  value={values['confirmPassword']}
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => Helpers.onChangeHandleErrors(setValues, setErrors, event)} />
              </CardBody>
              <CardFooter className="pt-0" placeholder={undefined} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                <Button type='submit' variant="gradient" fullWidth disabled={isLoading} placeholder={undefined}  onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                  {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                </Button>
                {
                  errors?.length > 0 && errors.map((error: any, i: number) => (
                    <p key={i} className="text-red-500 text-sm mt-2">{error.message}</p>
                  ))
                }
                 <Typography variant="small" className="mt-6 flex justify-center text-white" placeholder={undefined} onPointerEnterCapture={() => {}} onPointerLeaveCapture={() => {}}>
                  <Link href="sign-in" className="ml-1 font-bold">
                    Login
                  </Link>
                </Typography>
              </CardFooter>
            </form>
          </Card>
      </>
  );
}

export default SignInPage;
