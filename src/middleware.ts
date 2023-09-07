import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { withAuth } from "next-auth/middleware"
import { i18n } from '@/../i18n.config'

import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  //@ts-expect-error 
  const locales: string[] = i18n.locales
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()

  const locale = matchLocale(languages, locales, i18n.defaultLocale)
  return locale
}

export default withAuth(
  async function middleware(req) {
    // const token = await getToken({ req })

    // const isAuth = !!token
    // const isAuthPage =
    //   req.nextUrl.pathname.startsWith("/login") ||
    //   req.nextUrl.pathname.startsWith("/register")
    // const isAdminPage = req.nextUrl.pathname.startsWith("/admin")



    const pathname = req.nextUrl.pathname
    const pathnameIsMissingLocale = i18n.locales.every(
      locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
      const locale = getLocale(req)
      console.log(locale)
      return NextResponse.redirect(
        new URL(
          `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
          req.url
        )
      )
    }









    // if (isAuthPage) {
    //   if (isAuth) {
    //     return NextResponse.redirect(new URL("/dashboard", req.url))
    //   }
    //   return null
    // }

    // if (!isAuth) {
    //   let from = req.nextUrl.pathname
    //   if (req.nextUrl.search) {
    //     from += req.nextUrl.search
    //   }
    //   return NextResponse.redirect(
    //     new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
    //   )
    // } else {
    //   if (isAdminPage && token?.user.role !== "ADMIN") {
    //     return NextResponse.redirect(new URL(`/`, req.url))
    //   }
    // }





  },
  {
    callbacks: {
      async authorized() {
        // This is a work-around for handling redirect on auth pages.
        // We return true here so that the middleware function above
        // is always called.
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)'
  ],
}
