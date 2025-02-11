'use client'

import { deleteCookie } from '#/utils/next-cookies'

function LogoutButton() {
  const handleLogout = async () => {
    await deleteCookie('auth')
  }
  return (
    <button
      className="p-2 transition-colors hover:bg-accent"
      type="button"
      onClick={handleLogout}
    >
      logout
    </button>
  )
}

export default LogoutButton
