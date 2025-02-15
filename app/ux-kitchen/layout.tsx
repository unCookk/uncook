import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'UX-kitchen',
}

export default function PersonaLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
