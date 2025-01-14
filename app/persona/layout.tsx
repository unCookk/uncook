import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '페르소나 선택',
}

export default function PersonaLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
