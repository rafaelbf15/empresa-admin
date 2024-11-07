import { NextResponse } from 'next/server'
import { withAuth, NextRequestWithAuth, NextAuthMiddlewareOptions } from 'next-auth/middleware'

const middleware = (req: NextRequestWithAuth) => {
  const token = req.nextauth.token
  if (!token) {
    return NextResponse.redirect('/login')
  }
}

const callbackOptions: NextAuthMiddlewareOptions = {
  callbacks: {
    authorized: ({ token }) => !!token
  }
}

export default withAuth(middleware, callbackOptions)

export const config = {
  matcher: ['/admin/:path*']
}