import LoginForm from './login-form'
import NavMenu from './nav-menu'
import PinButton from './pin-button'
import SidebarContainer from './sidebar-container'

import { getCookie } from '#/utils/next-cookies'

export default async function Sidebar() {
  const loggedIn = (await getCookie('auth')) === 'true'
  return (
    <SidebarContainer>
      <nav className="size-fit">
        <PinButton />
        <NavMenu />
        <LoginForm loggedIn={loggedIn} />
      </nav>
    </SidebarContainer>
  )
}
