'use client'

import { ReactNode } from 'react'
import Link from 'next/link'

import sidebarStore from '#/store/sidebar-store'

interface SidebarTriggerProps {
  children: ReactNode
}

export default function NavLogo({ children }: SidebarTriggerProps) {
  const handleMouseEnter = () => {
    sidebarStore.setState((state) => ({
      ...state,
      isOpen: true,
    }))
  }

  return (
    <Link
      className="flex size-fit items-center gap-6 transition-colors duration-200"
      href="/"
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </Link>
  )
}
