import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '아카이브',
}

export default function PersonaLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
