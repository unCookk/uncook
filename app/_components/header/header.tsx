import Sidebar from '../sidebar'
import SidebarProvider from '../sidebar/sidebar-provider'

import Logo from './logo'
import NavLogo from './nav-logo'

export default function Header() {
  return (
    <header>
      <NavLogo>
        <Logo />
      </NavLogo>
      <SidebarProvider>
        <Sidebar />
      </SidebarProvider>
    </header>
  )
}
