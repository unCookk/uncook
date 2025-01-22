import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

import Header from './_components/header/header'

export const metadata: Metadata = {
  description: '팀 UnCook 이력서, 포트폴리오, 아티클 저장소',
  title: {
    template: '%s | Uncook',
    default: 'Uncook',
  },
  icons: {
    icon: '/images/spyglass.png',
  },
}

const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
  preload: true,
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${pretendard.className} size-full`}>
      <body className="relative flex size-full flex-col">
        <Header />
        <div className="size-full overflow-x-hidden">{children}</div>
      </body>
    </html>
  )
}
