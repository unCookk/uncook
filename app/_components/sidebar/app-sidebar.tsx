'use client'

import { RxPinRight, RxPinLeft } from 'react-icons/rx'
import { usePathname } from 'next/navigation'

import Login from './login'
import MenuItem from './menu-item'

import {
  SidebarContainer,
  SidebarHeader,
  SidebarPinButton,
  SidebarPinned,
  SidebarUnPinned,
  SidebarNav,
  SidebarNavMenu,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from '.'

export interface MenuItem {
  title: string
  href: string
  description: string
}

const menuItems: MenuItem[] = [
  {
    title: 'Home',
    href: '/',
    description: '팀 언쿡 소개',
  },
  {
    title: 'Member',
    href: '/member',
    description: '언쿡 멤버 소개 및 이력서',
  },
  {
    title: 'UX kitchen',
    href: '/ux-kitchen',
    description: 'UX 관련 아티클을 확인하세요',
  },
  {
    title: 'Archive',
    href: '/archive',
    description: '기술 블로그',
  },
  {
    title: 'Projects',
    href: '/projects',
    description: '포트폴리오를 확인하세요',
  },
  {
    title: 'Edit',
    href: '/edit',
    description: '관리자 페이지',
  },
]

export default function AppSidebar() {
  const pathname = usePathname()
  const { loggedIn } = useSidebar()
  const filteredMenuItems = loggedIn
    ? menuItems
    : menuItems.filter((item) => item.href !== '/edit')

  return (
    <SidebarContainer className="pt-12">
      {/* 사이드바 고정 버튼 */}
      <SidebarHeader className="flex justify-end pr-5">
        <SidebarPinButton>
          <SidebarPinned>
            <RxPinLeft />
          </SidebarPinned>
          <SidebarUnPinned>
            <RxPinRight />
          </SidebarUnPinned>
        </SidebarPinButton>
      </SidebarHeader>

      {/* 사이드바 네비게이션 링크들 */}
      <SidebarNav>
        <SidebarNavMenu>
          {filteredMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <MenuItem
                href={item.href}
                title={item.title}
                description={item.description}
                active={
                  item.href === pathname ||
                  (item.href !== '/' && pathname.startsWith(item.href))
                }
              />
            </SidebarMenuItem>
          ))}
        </SidebarNavMenu>
      </SidebarNav>

      <SidebarFooter>
        <Login loggedIn={loggedIn} />
      </SidebarFooter>
    </SidebarContainer>
  )
}
