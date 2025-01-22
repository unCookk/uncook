'use client'

import { ReactNode } from 'react'

import { useStore } from '#/store/utils/use-store'
import sidebarStore from '#/store/sidebar-store'

interface SidebarProviderProps {
  children: ReactNode
}
export default function SidebarProvider({ children }: SidebarProviderProps) {
  const [sidebarStatus] = useStore(sidebarStore)
  return (
    <div className="size-fit">
      {sidebarStatus.isPinned || sidebarStatus.isOpen ? <>{children}</> : null}
    </div>
  )
}
