import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '../globals.css';
import { AdminSidebar } from '@/components/AdminSidebar';
import { Suspense } from 'react';
import Loading from '../loading';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gerenciador de Funcionários',
  description: '',
}

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <section>
    <Suspense fallback={<Loading />} >
      <div className='container mx-auto'>
        <div className='bg-white'>
          <AdminSidebar />
        </div>
        {children}
      </div>
    </Suspense>
  </section>
  )
}
