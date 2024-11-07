import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/providers';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authoptions';
const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Gerenciador de Funcionarios',
  description: '',
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession(authOptions)

  return (
    <html suppressHydrationWarning lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
      <body className={`${inter.className}`}>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  )
}
