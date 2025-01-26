import Logo from './logo'
import NavLogo from './nav-logo'

import { getCookie } from '#/utils/next-cookies'

export default async function Header() {
  const loggedIn = (await getCookie('auth')) === 'true'
  return (
    <header>
      <NavLogo loggedIn={loggedIn}>
        <Logo />
      </NavLogo>
    </header>
  )
}
