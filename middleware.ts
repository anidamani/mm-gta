import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

export async function middleware(request: NextRequest) {
  // Handle admin routes protection
  if (request.nextUrl.pathname.startsWith('/admin') && request.nextUrl.pathname !== '/admin/login') {
    const supabaseResponse = await updateSession(request)
    
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      const redirectUrl = new URL('/admin/login', request.url)
      const response = NextResponse.redirect(redirectUrl)
      
      // Copy cookies individually with their attributes
      supabaseResponse.cookies.getAll().forEach(cookie => {
        response.cookies.set({
          name: cookie.name,
          value: cookie.value,
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        })
      })
      
      return response
    }
    return supabaseResponse
  }

  // For all other routes, just update the session without redirecting
  return await updateSession(request)
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