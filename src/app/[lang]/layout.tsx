import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Locale, i18n } from '../../../i18n.config'


export const metadata: Metadata = {
  title: 'WishGiftHub - Inspire, Share, Gift',
  description: 'Where Wishes Find Their Perfect Presents',
}
export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}
export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { lang: Locale }
}) {
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
