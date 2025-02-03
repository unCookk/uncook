import { ReactNode } from 'react'
import Link from 'next/link'
import { BsLayoutSidebar } from 'react-icons/bs'

import { SidebarHoverTrigger } from '../sidebar'

interface SidebarTriggerProps {
  children: ReactNode
}

export default function NavLogo({ children }: SidebarTriggerProps) {
  return (
    <SidebarHoverTrigger className="flex items-center gap-2">
      <Link href="/">{children}</Link>
      <BsLayoutSidebar className="size-3" />
    </SidebarHoverTrigger>
  )
}
