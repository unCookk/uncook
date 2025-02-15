'use client'

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
  isDesktop: boolean
  loggedIn: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setPinned: Dispatch<SetStateAction<boolean>>
}

interface ChildrenProp {
  children: ReactNode
}

interface ClassNameProp extends ChildrenProp {
  className?: string
}

interface SidebarProviderProps extends ChildrenProp {
  isDesktop: boolean
  loggedIn: boolean
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

export function SidebarProvider({
  children,
  isDesktop,
  loggedIn,
}: SidebarProviderProps) {
  const [open, setOpen] = useState(false)
  const [pinned, setPinned] = useState(false)

  const value: SidebarContextType = {
    open,
    pinned,
    setOpen,
    setPinned,
    isDesktop,
    loggedIn,
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

export function SidebarTrigger({ children, className }: ClassNameProp) {
  const { setOpen } = useSidebar()

  const handleToggle = () => {
    setOpen((prev) => !prev)
  }
  return (
    <button className={cn('transition-all', className)} onClick={handleToggle}>
      {children}
    </button>
  )
}

export function SidebarTriggerOpen({ children }: ClassNameProp) {
  const { open } = useSidebar()

  if (open) {
    return <>{children}</>
  }
}

export function SidebarTriggerClosed({ children }: ClassNameProp) {
  const { open } = useSidebar()

  if (!open) {
    return <>{children}</>
  }
}

export function SidebarContainer({ children, className }: ClassNameProp) {
  const { open, pinned, setOpen, isDesktop } = useSidebar()

  const handleMouseLeave = () => {
    if (pinned === false) {
      setOpen(false)
    }
  }

  if (!open) {
    return null
  }

  const baseClassName = cn(
    'h-full border-r fixed z-40',
    'flex flex-col justify-between',
    isDesktop
      ? 'bg-gray-50/80 backdrop-blur-md'
      : 'bg-gray-50 backdrop-blur-none',
    !isDesktop ? 'w-full' : pinned ? 'w-64' : 'w-60',
    className,
  )

  const props = {
    className: baseClassName,
    ...(isDesktop && { onMouseLeave: handleMouseLeave }),
  }

  return <aside {...props}>{children}</aside>
}

export function SidebarHeader({ children, className }: ClassNameProp) {
  return <div className={cn('h-14 w-full p-3', className)}>{children}</div>
}

export function SidebarPinButton({ children, className }: ClassNameProp) {
  const { setPinned, isDesktop } = useSidebar()
  const toggle = () => {
    setPinned((prev) => !prev)
  }

  if (isDesktop) {
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
}

export function SidebarPinned({ children, className }: ClassNameProp) {
  const { pinned } = useSidebar()

  if (!pinned) {
    return null
  }

  return (
    <div className={cn('animate-slide-in-left', className)}>{children}</div>
  )
}

export function SidebarUnPinned({ children, className }: ClassNameProp) {
  const { pinned } = useSidebar()

  if (pinned) {
    return null
  }

  return (
    <div className={cn('animate-slide-in-right', className)}>{children}</div>
  )
}

export function SidebarNav({ children, className }: ClassNameProp) {
  return <nav className={cn('flex-1', className)}>{children}</nav>
}

export function SidebarNavMenu({ children, className }: ClassNameProp) {
  return (
    <menu className={cn('flex flex-col gap-6', className)}>{children}</menu>
  )
}

export function SidebarMenuItem({ children, className }: ClassNameProp) {
  return <li className={cn('h-fit w-full', className)}>{children}</li>
}

export function SidebarFooter({ children, className }: ClassNameProp) {
  return <div className={cn('h-14 w-full p-3', className)}>{children}</div>
}
