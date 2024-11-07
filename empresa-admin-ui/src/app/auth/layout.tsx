import axios from '@/lib/axios'
import '../globals.css'

export default async function AuthRootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <section>
      <div className="h-screen flex">
        <div className="w-full p-6 bg-white flex flex-col justify-center items-center bg-cover">
          {children}
        </div>
      </div>
    </section>
  )
}