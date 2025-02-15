import './globals.css'
import type { Metadata } from 'next'
import localFont from 'next/font/local'

import Header from './_components/header'
import { Main, SidebarProvider } from './_components/sidebar'
import AppSidebar from './_components/sidebar/app-sidebar'

import { getCookie } from '#/utils/next-cookies'
import { getDeviceType } from '#/utils/get-device-type'

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const loggedIn = (await getCookie('auth')) === 'true'
  const deviceType = await getDeviceType()

  return (
    <html lang="ko" className={`${pretendard.className} size-full`}>
      <body className="relative size-full">
        <SidebarProvider
          isDesktop={deviceType === 'desktop'}
          loggedIn={loggedIn}
        >
          <Header />
          <AppSidebar />
          <Main className="overflow-x-hidden pt-12">{children}</Main>
        </SidebarProvider>
      </body>
    </html>
  )
}
