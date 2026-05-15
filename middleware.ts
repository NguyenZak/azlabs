import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from './utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabase, response } = await createClient(request)

  const { data: { user } } = await supabase.auth.getUser()

  // 🛡️ Security Headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')

  // 🔐 Admin Routes Protection
  if (request.nextUrl.pathname.startsWith('/adminaz')) {
    const isLoginPage = request.nextUrl.pathname === '/adminaz/login'
    
    if (!user) {
      if (!isLoginPage) {
        return NextResponse.redirect(new URL('/adminaz/login', request.url))
      }
    } else {
      // Check for Admin Role (metadata-based fallback, but DB check is better)
      const role = user.user_metadata?.role
      const isAdmin = role === 'admin' || role === 'super_admin'
      
      if (!isAdmin && !isLoginPage) {
        // Log unauthorized access attempt
        console.warn(`🚨 Unauthorized access attempt to /adminaz by ${user.email}`)
        return NextResponse.redirect(new URL('/', request.url))
      }

      if (isAdmin && isLoginPage) {
        return NextResponse.redirect(new URL('/adminaz/dashboard', request.url))
      }
    }
  }

  // 🔐 Private API Protection
  if (request.nextUrl.pathname.startsWith('/api/private')) {
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
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
