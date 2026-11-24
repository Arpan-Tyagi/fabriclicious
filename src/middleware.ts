import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { env } from './env'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
  const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';

  // If Supabase is not configured, skip auth middleware
  if (!env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.next({ request });
  }

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith('/admin');
  const isAccountRoute = pathname.startsWith('/account');

  // Check if any Supabase auth cookies are present
  const allCookies = request.cookies.getAll();
  const hasAuthCookies = allCookies.some(c => c.name.startsWith('sb-') && c.name.includes('-auth-token'));

  // FAST PATH: Anonymous public requests skip external Supabase network calls completely!
  if (!isAdminRoute && !isAccountRoute && !hasAuthCookies) {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh the auth token only when relevant
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect admin routes
  if (isAdminRoute) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    
    // Check role from profiles
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  // Protect patron account route
  if (isAccountRoute && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
