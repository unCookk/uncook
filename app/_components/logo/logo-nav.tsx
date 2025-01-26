import Link from 'next/link'

import LoginForm from './login-form'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '#/components/ui/navigation-menu'
import { getCookie } from '#/utils/next-cookies'

interface MenuLink {
  title: string
  href: string
  description: string
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

function Links({ title, href, description }: MenuLink) {
  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink
        className={navigationMenuTriggerStyle() + ' !w-full !h-16 !py-4'}
      >
        <div className="flex flex-col items-center justify-start">
          <span className="text-sm font-medium leading-none">{title}</span>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {description}
          </p>
        </div>
      </NavigationMenuLink>
    </Link>
  )
}

export default async function LogoNav() {
  const loggedIn = (await getCookie('auth')) === 'true'
  return (
    <header className="sticky top-0 z-50 px-3 md:px-12">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="pb-2 text-base md:pb-0 md:text-lg">
              Uncook
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <menu className="flex h-fit w-56 flex-col gap-5 pt-4">
                {links.map((link) => (
                  <Links
                    key={link.href}
                    href={link.href}
                    title={link.title}
                    description={link.description}
                  />
                ))}
                <LoginForm loggedIn={loggedIn} />
              </menu>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
