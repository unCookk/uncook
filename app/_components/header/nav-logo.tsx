'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { RxPinRight, RxPinLeft } from 'react-icons/rx'

import { MenuLink, Sidebar } from '../sidebar'
import LoginForm from '../sidebar/login-form'

interface SidebarTriggerProps {
  children: ReactNode
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

export default function NavLogo({ children, loggedIn }: SidebarTriggerProps) {
  return (
    <Sidebar.Provider>
      {/* 사이드바 호버 트리거 */}
      <Sidebar.HoverTrigger>
        <Link href="/">{children}</Link>
      </Sidebar.HoverTrigger>
      <Sidebar.Container>
        {/* 사이드바 고정 버튼 */}
        <Sidebar.PinButton>
          <Sidebar.Pinned>
            <RxPinLeft />
          </Sidebar.Pinned>
          <Sidebar.UnPinned>
            <RxPinRight />
          </Sidebar.UnPinned>
        </Sidebar.PinButton>

        {/* 사이드바 네비게이션 링크들 */}
        <Sidebar.NavMenu>
          {links.map((link) => (
            <Sidebar.NavLink
              key={link.href}
              href={link.href}
              title={link.title}
              description={link.description}
            />
          ))}
        </Sidebar.NavMenu>

        <LoginForm loggedIn={loggedIn} />
      </Sidebar.Container>
    </Sidebar.Provider>
  )
}
