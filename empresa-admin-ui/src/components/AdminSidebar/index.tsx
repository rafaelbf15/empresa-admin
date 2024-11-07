'use client'
import React from "react";
import {
  Navbar,
  MobileNav,
  Button,
  IconButton,
  Avatar,
} from "@material-tailwind/react";
import { signOut } from "next-auth/react";
import { useUsuarioContext } from "@/context/UsuarioContext";

export function AdminSidebar() {
  const [openNav, setOpenNav] = React.useState(false);
  const { getUsuario } = useUsuarioContext()


  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);


  return (
    <Navbar className='lg:h-28 mx-auto lg:rounded-full lg:pl-6' shadow={false} onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}>
      <div className="flex items-center justify-between text-blue-gray-900">
        <div className="flex items-center">
          <Avatar
            variant='circular'
            size='sm'
            alt='tania andrew'
            className='border border-gray-900 p-0.5 '
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}
          />
          <span className='hidden md:flex ml-2'>{'Olá, ' + (getUsuario()?.usuarioToken.nome ?? '')}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-x-1">
            <Button
              variant="gradient"
              size="sm"
              className="hidden lg:inline-block"
              onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
              onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}
            >
              <span>Sair</span>
            </Button>
          </div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
            onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>
        <div className="flex items-center gap-x-1">
          <Button fullWidth variant="gradient" size="sm" className=""
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
            onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} placeholder={undefined}>
            <span>Sair</span>
          </Button>
        </div>
      </MobileNav>
    </Navbar>
  );
}