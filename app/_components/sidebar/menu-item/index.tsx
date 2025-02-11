import Link from 'next/link'

import { MenuItem } from '../app-sidebar'

import { cn } from '#/lib/utils'

interface MenuLinkProps extends MenuItem {
  active: boolean
}

export default function MenuLink({
  title,
  href,
  description,
  active,
}: MenuLinkProps) {
  return (
    <Link
      className={cn(
        'flex flex-col items-start p-4 transition-colors rounded-lg',
        active ? 'bg-gray-300' : 'hover:bg-gray-300',
      )}
      href={href}
    >
      <span className="text-sm font-medium leading-none">{title}</span>
      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
        {description}
      </p>
    </Link>
  )
}
