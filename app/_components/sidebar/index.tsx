'use client'

import Link from 'next/link'
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'


import { cn } from '#/lib/utils'

interface SidebarContextType {
  open: boolean
  pinned: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setPinned: Dispatch<SetStateAction<boolean>>
}

interface ChildrenProp {
  children: ReactNode
}

interface ClassNameProp extends ChildrenProp {
  className?: string
}

export interface MenuLink {
  title: string
  href: string
  description: string
}

interface MenuLinkProps extends MenuLink {
  active: boolean
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export function SidebarProvider({ children }: ChildrenProp) {
  const [open, setOpen] = useState(false)
  const [pinned, setPinned] = useState(false)

  const value = {
    open,
    pinned,
    setOpen,
    setPinned,
  }

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}

export function Main({ children, className }: ClassNameProp) {
  const { pinned } = useSidebar()

  return (
    <main
      className={cn(
        'size-full transition-all duration-300 ease-out',
        pinned ? 'pl-72' : 'pl-0',
        className,
      )}
    >
      {children}
    </main>
  )
}

export function SidebarHoverTrigger({ children, className }: ClassNameProp) {
  const { setOpen } = useSidebar()
  const handleMouseEnter = () => {
    setOpen(true)
  }

  return (
    <div className={cn('', className)} onMouseEnter={handleMouseEnter}>
      {children}
    </div>
  )
}

export function SidebarContainer({ children, className }: ClassNameProp) {
  const { open, pinned, setOpen } = useSidebar()
  const handleMouseLeave = () => {
    if (pinned === false) {
      setOpen(false)
    }
  }

  if (!open) {
    return null
  }

  return (
    <aside
      className={cn(
        'h-full border-r fixed z-40 bg-gray-50/80 backdrop-blur-sm',
        'from-bg-500/40 to-bg-500/0 bg-gradient-to-r',
        pinned ? 'w-64' : 'w-60',
        className,
      )}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-full">{children}</div>
    </aside>
  )
}

export function SidebarPinButton({
  children,
  className,
}: ChildrenProp & { className?: string }) {
  const { setPinned } = useSidebar()
  const toggle = () => {
    setPinned((prev) => !prev)
  }

  return (
    <button
      className={cn(
        'p-2 mb-3 transition-all duration-300 ease-in-out rounded-lg',
        'hover:scale-105 active:scale-95',
        'hover:bg-accent',
        className,
      )}
      onClick={toggle}
    >
      {children}
    </button>
  )
}

export function SidebarPinned({
  children,
  className,
}: ChildrenProp & { className?: string }) {
  const { pinned } = useSidebar()

  if (!pinned) {
    return null
  }

  return (
    <div className={cn('animate-slide-in-left', className)}>{children}</div>
  )
}

export function SidebarUnPinned({
  children,
  className,
}: ChildrenProp & { className?: string }) {
  const { pinned } = useSidebar()

  if (pinned) {
    return null
  }

  return (
    <div className={cn('animate-slide-in-right', className)}>{children}</div>
  )
}

export function SidebarNavMenu({ children, className }: ClassNameProp) {
  return (
    <menu>
      <ul className={cn('flex flex-col gap-6', className)}>{children}</ul>
    </menu>
  )
}
export function SidebarFooter({ children, className }: ClassNameProp) {
  return (
    <div className={cn('absolute bottom-0 h-14 w-full p-3', className)}>
      {children}
    </div>
  )
}

export function SidebarNavLink({
  title,
  href,
  description,
  active,
}: MenuLinkProps) {
  return (
    <li className="h-fit w-full">
      <Link
        className={cn(
          'flex flex-col items-start p-4 transition-colors',
          active ? 'bg-accent' : 'hover:bg-accent',
        )}
        href={href}
      >
        <span className="text-sm font-medium leading-none">{title}</span>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {description}
        </p>
      </Link>
    </li>
  )
}
