'use client'

import { RxPinRight, RxPinLeft } from 'react-icons/rx'
import { usePathname } from 'next/navigation'

import LoginForm from './login-form'

import {
  MenuLink,
  SidebarContainer,
  SidebarPinButton,
  SidebarPinned,
  SidebarUnPinned,
  SidebarNavMenu,
  SidebarNavLink,
  SidebarFooter,
} from '.'

interface SidebarTriggerProps {
  loggedIn: boolean
}

const links: MenuLink[] = [
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
]

export default function AppSidebar({ loggedIn }: SidebarTriggerProps) {
  const pathname = usePathname()

  return (
    <SidebarContainer className="pt-12">
      {/* 사이드바 고정 버튼 */}
      <div className="flex justify-end pr-5">
        <SidebarPinButton>
          <SidebarPinned>
            <RxPinLeft />
          </SidebarPinned>
          <SidebarUnPinned>
            <RxPinRight />
          </SidebarUnPinned>
        </SidebarPinButton>
      </div>

      {/* 사이드바 네비게이션 링크들 */}
      <SidebarNavMenu>
        {links.map((link) => (
          <SidebarNavLink
            key={link.href}
            href={link.href}
            title={link.title}
            description={link.description}
            active={
              link.href === pathname ||
              (link.href !== '/' && pathname.startsWith(link.href))
            }
          />
        ))}
      </SidebarNavMenu>

      <SidebarFooter>
        <LoginForm loggedIn={loggedIn} />
      </SidebarFooter>
    </SidebarContainer>
  )
}
