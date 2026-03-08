import { AppToaster } from '@/components/ui/AppToaster'
import { PAGE_PATHS } from '@/lib/paths'
import QueryProvider from '@/providers/QueryProvider'
import '@/styles/globals.css'
import { Nanum_Myeongjo } from 'next/font/google'

const nanumMyeongjo = Nanum_Myeongjo({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
  variable: '--font-nanum-myeongjo',
  preload: false,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={nanumMyeongjo.variable}>
      <head>
        <link rel="icon" href={PAGE_PATHS.FAVICON} sizes="any" />
      </head>
      <body>
        <QueryProvider>
          <main>{children}</main>
          <AppToaster />
        </QueryProvider>
      </body>
    </html>
  )
}
