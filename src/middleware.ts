import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  let url = request.nextUrl.clone()
  const token = request.cookies.get('authToken')?.value

  // **Proteksi Semua Halaman Admin**
  if (url.pathname.startsWith('/admin/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // **Rewrite URL untuk Upload**
  if (url.pathname.startsWith('/admin/dashboard/upload')) {
    url.hostname = 'localhost'
    url.port = '5000'
    url.protocol = 'http'

    // Hapus '/admin/dashboard' untuk menyesuaikan route backend
    url.pathname = url.pathname.replace('/admin/dashboard', '')

    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

// **Terapkan Middleware ke Semua Halaman Admin**
export const config = {
  matcher: ['/admin/dashboard/:path*'],
}
