import { NextRequest, NextResponse } from 'next/server'

import { cookies } from 'next/headers'

export default async function middleware(req: NextRequest, res: NextResponse) {
  const isLoggedIn =cookies().get('payload-token')
  if (!isLoggedIn) {
    const absUrl = new URL('/', req.nextUrl.origin)
    return NextResponse.redirect(absUrl.toString())
  }
}

export const config = {
  matcher: ['/dashboard']
} 