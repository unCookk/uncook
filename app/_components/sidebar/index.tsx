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

interface SidebarContextType {
  open: boolean
  pinned: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  setPinned: Dispatch<SetStateAction<boolean>>
}

interface ChildrenProp {
  children: ReactNode
}

export interface MenuLink {
  title: string
  href: string
  description: string
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

function SidebarProvider({ children }: ChildrenProp) {
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

function SidebarHoverTrigger({ children }: ChildrenProp) {
  const { setOpen } = useSidebar()
  const handleMouseEnter = () => {
    setOpen(true)
  }

  return <div onMouseEnter={handleMouseEnter}>{children}</div>
}

function SidebarContainer({ children }: ChildrenProp) {
  const { open, pinned, setOpen } = useSidebar()
  const handleMouseLeave = () => {
    if (pinned === false) {
      setOpen(false)
    }
  }

  if (!open) {
    return null
  }

  return <div onMouseLeave={handleMouseLeave}>{children}</div>
}

function SidebarPinButton({ children }: ChildrenProp) {
  const { setPinned } = useSidebar()
  const toggle = () => {
    setPinned((prev) => !prev)
  }

  return <button onClick={toggle}>{children}</button>
}
function SidebarPinned({ children }: ChildrenProp) {
  const { pinned } = useSidebar()

  if (!pinned) {
    return null
  }

  return <>{children}</>
}
function SidebarUnPinned({ children }: ChildrenProp) {
  const { pinned } = useSidebar()

  if (pinned) {
    return null
  }

  return <>{children}</>
}

function SidebarNavMenu({ children }: ChildrenProp) {
  return (
    <menu>
      <ul>{children}</ul>
    </menu>
  )
}

function SidebarNavLink({ title, href, description }: MenuLink) {
  return (
    <li>
      <Link
        className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
        href={href}
      >
        <div className="flex flex-col items-center justify-start">
          <span className="text-sm font-medium leading-none">{title}</span>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        </div>
      </Link>
    </li>
  )
}

export const Sidebar = {
  Provider: SidebarProvider,
  HoverTrigger: SidebarHoverTrigger,
  Container: SidebarContainer,
  PinButton: SidebarPinButton,
  NavMenu: SidebarNavMenu,
  NavLink: SidebarNavLink,
  Pinned: SidebarPinned,
  UnPinned: SidebarUnPinned,
}
