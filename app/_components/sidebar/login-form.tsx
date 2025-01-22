'use client'

import Link from 'next/link'

import loginAction from '#/api/login'
import { deleteCookie } from '#/utils/next-cookies'

interface LoginFormProps {
  loggedIn: boolean
}
export default function LoginForm({ loggedIn }: LoginFormProps) {
  const handleSubmit = async (formData: FormData) => {
    const password = formData.get('password') as string
    try {
      const result = await loginAction(password)
      if (!result.success) {
        alert(result.error)
      }
    } catch {
      alert('로그인 중 에러 발생')
    }
  }

  const handleLogout = async () => {
    await deleteCookie('auth')
  }
  return loggedIn ? (
    <div className="flex gap-4 text-sm font-medium leading-none">
      <button
        className="p-2 transition-colors hover:bg-accent"
        type="button"
        onClick={handleLogout}
      >
        logout
      </button>
      <Link className="p-2 transition-colors hover:bg-accent" href="/edit">
        Edit
      </Link>
    </div>
  ) : (
    <form action={handleSubmit}>
      <label htmlFor="login" className="mr-2 text-sm font-medium leading-none">
        Login
      </label>
      <input id="login" name="password" type="password" className="w-16" />
    </form>
  )
}
