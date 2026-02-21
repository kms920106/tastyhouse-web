import { NextRequest, NextResponse } from 'next/server'

/**
 * Middleware for automatic token refresh
 * - 모든 요청 전에 accessToken 만료 여부 확인
 * - 만료 시 자동으로 refreshToken으로 갱신
 * - 브라우저 쿠키에 새 토큰 자동 저장
 */
export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  // refreshToken이 없으면 로그인 필요 (갱신 불가)
  if (!refreshToken) {
    return NextResponse.next()
  }

  // accessToken이 있으면 만료 여부 확인
  if (accessToken) {
    const isExpired = isTokenExpired(accessToken)

    // 토큰이 유효하면 그대로 진행
    if (!isExpired) {
      return NextResponse.next()
    }

  } else {
  }

  // 토큰 갱신 시도
  try {
    const baseURL = process.env.NEXT_PUBLIC_API_URL || ''

    const response = await fetch(`${baseURL}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    })

    if (!response.ok) {
      const res = NextResponse.next()
      res.cookies.delete('accessToken')
      res.cookies.delete('refreshToken')
      return res
    }

    const data = await response.json()

    // 새 토큰으로 쿠키 업데이트하여 다음 요청으로 진행
    const res = NextResponse.next()
    res.cookies.set('accessToken', data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // 외부 리다이렉트(토스페이먼츠) 허용
      path: '/',
      maxAge: 60 * 60, // 1 hour
    })
    res.cookies.set('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax', // 외부 리다이렉트(토스페이먼츠) 허용
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return res
  } catch (error) {
    console.error('[middleware] Token refresh error:', error)
    return NextResponse.next()
  }
}

/**
 * JWT 토큰 만료 여부 확인
 * - Base64 디코딩하여 exp (만료 시간) 확인
 * - 만료 5분 전이면 갱신 (여유 시간 확보)
 */
function isTokenExpired(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    const exp = payload.exp * 1000 // seconds to milliseconds
    const now = Date.now()
    const bufferTime = 5 * 60 * 1000 // 5분 여유

    return now >= exp - bufferTime
  } catch {
    return true // 파싱 실패 시 만료로 간주
  }
}

/**
 * Middleware 실행 경로 설정
 * - /api/auth/refresh는 제외 (무한 루프 방지)
 * - 정적 파일, Next.js 내부 파일 제외
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/auth/refresh (토큰 갱신 API)
     * 2. /_next (Next.js internals)
     * 3. /_static (static files)
     * 4. /_vercel (Vercel internals)
     * 5. /favicon.ico, /sitemap.xml, /robots.txt (static files)
     */
    '/((?!api/auth/refresh|_next|_static|_vercel|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
