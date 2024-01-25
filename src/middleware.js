import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(request) {
  {
    /**
     * const jwt = request.cookies.get('miToken')

  if(request.nextUrl.pathname.includes('/admin')){
    if(jwt === undefined){
      return NextResponse.rewrite(new URL('/login', request.url))
    }
    try {
      const {payload} = jwtVerify(jwt, new TextEncoder().encode('secret'))
      console.log(payload)
      return NextResponse.next()
    } catch (error) {
      console.error(error)
      return NextResponse.rewrite(new URL('/login', request.url))
    }
  }
     */
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
