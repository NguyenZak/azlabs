import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from './utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabase, response } = await createClient(request)

  const { data: { user } } = await supabase.auth.getUser()

  // Protect /adminaz routes
  if (request.nextUrl.pathname.startsWith('/adminaz')) {
    // Allow access to login page even if not logged in
    if (!user && request.nextUrl.pathname !== '/adminaz/login') {
      return NextResponse.redirect(new URL('/adminaz/login', request.url))
    }
    
    // Redirect logged in users away from login page to dashboard
    if (user && request.nextUrl.pathname === '/adminaz/login') {
      return NextResponse.redirect(new URL('/adminaz/dashboard', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
