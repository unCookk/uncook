import Logo from './logo'
import NavLogo from './nav-logo'

export default function Header() {
  return (
    <header className="absolute top-0 z-50 flex h-12 w-full items-center pl-10">
      <NavLogo>
        <Logo />
      </NavLogo>
    </header>
  )
}
