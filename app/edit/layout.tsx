import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '관리자 페이지',
}

export default function PersonaLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
