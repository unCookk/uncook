'use client'
import { ReactNode } from 'react'

import sidebarStore from '#/store/sidebar-store'

interface SidebarContainerProps {
  children: ReactNode
}
export default function SidebarContainer({ children }: SidebarContainerProps) {
  const handleMouseLeave = () => {
    sidebarStore.setState((state) => ({
      ...state,
      isOpen: false,
    }))
  }

  return (
    <div className="size-fit" onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  )
}
