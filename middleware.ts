import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from './utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const { supabase, response } = createClient(request)

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
      const role = user.user_metadata?.role
      const adminEmails = (process.env.ADMIN_EMAILS ?? '').split(',').map(e => e.trim()).filter(Boolean)
      
      // If ADMIN_EMAILS is not configured on the server, we allow any authenticated user
      const isAdmin = 
        role === 'admin' || 
        role === 'super_admin' || 
        (adminEmails.length > 0 ? adminEmails.includes(user.email ?? '') : true)

      if (!isAdmin && !isLoginPage) {
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
