'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { BsLayoutSidebar, BsLayoutSidebarInset } from 'react-icons/bs'
import { TiThMenu, TiThMenuOutline } from 'react-icons/ti'

import {
  SidebarHoverTrigger,
  SidebarTrigger,
  SidebarTriggerClosed,
  SidebarTriggerOpen,
} from '../sidebar'

import isDesktopStore from '#/store/is-desktop-store'
import { useStoreSelector } from '#/store/utils/use-store'

interface SidebarTriggerProps {
  children: ReactNode
}

export default function NavLogo({ children }: SidebarTriggerProps) {
  const isDesktop = useStoreSelector(isDesktopStore, (state) => state)

  if (isDesktop) {
    return (
      <SidebarHoverTrigger className="flex items-center gap-2">
        <Link href="/">{children}</Link>
        <SidebarTriggerOpen>
          <BsLayoutSidebarInset className="size-3" />
        </SidebarTriggerOpen>
        <SidebarTriggerClosed>
          <BsLayoutSidebar className="size-3" />
        </SidebarTriggerClosed>
      </SidebarHoverTrigger>
    )
  } else {
    return (
      <div className="flex items-center gap-2">
        <SidebarTrigger className="flex items-center gap-2">
          <SidebarTriggerOpen>
            <TiThMenuOutline className="size-5 animate-scale-up" />
          </SidebarTriggerOpen>
          <SidebarTriggerClosed>
            <TiThMenu className="size-5 animate-scale-up" />
          </SidebarTriggerClosed>
        </SidebarTrigger>
        <Link href="/">{children}</Link>
      </div>
    )
  }
}
