import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '프로젝트',
}

export default function PersonaLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
