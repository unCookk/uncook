import Link from 'next/link'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '#/components/ui/navigation-menu'

const links: { title: string; href: string; description: string }[] = [
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
interface MenuLink {
  title: string
  href: string
  description: string
}

function Links({ title, href, description }: MenuLink) {
  return (
    <Link href={href} legacyBehavior passHref>
      <NavigationMenuLink className={navigationMenuTriggerStyle()}>
        <span className="text-sm font-medium leading-none">{title}</span>
        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {description}
        </p>
      </NavigationMenuLink>
    </Link>
  )
}

export default function LogoNav() {
  return (
    <header className="sticky top-0 z-50 px-12">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="pb-0 text-lg">
              Uncook
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <menu className="flex h-96 w-40 flex-col">
                {links.map((link) => (
                  <Links
                    key={link.href}
                    href={link.href}
                    title={link.title}
                    description={link.description}
                  />
                ))}
              </menu>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
