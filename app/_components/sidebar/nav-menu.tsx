import Link from 'next/link'

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
  )
}

export default function NavMenu() {
  return (
    <menu className="flex h-fit w-56 flex-col gap-5 pt-4">
      {links.map((link) => (
        <Links
          key={link.href}
          href={link.href}
          title={link.title}
          description={link.description}
        />
      ))}
    </menu>
  )
}
