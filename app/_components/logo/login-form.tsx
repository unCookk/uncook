'use client'
import { useRouter } from 'next/navigation'

import { navigationMenuTriggerStyle } from '#/components/ui/navigation-menu'
import loginAction from '#/api/login'
import loginStore from '#/store/login-store'
import { useStore } from '#/store/utils/use-store'
import { deleteCookie } from '#/utils/next-cookies'

export default function LoginForm() {
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useStore(loginStore)

  const handleSubmit = async (formData: FormData) => {
    const password = formData.get('password') as string
    try{
      const result = await loginAction(password)
      if (result.success) {
        setLoggedIn(true)
        router.refresh()
      } else {
        alert(result.error)
        setLoggedIn(false)
      }
    }catch{
      alert("로그인 중 에러 발생");
    }
  }

  const handleLogout = async () => {
    await deleteCookie('auth')
    setLoggedIn(false)
  }
  return (
    <form className={navigationMenuTriggerStyle()} action={handleSubmit}>
      <label htmlFor="login" className="mr-2 text-sm font-medium leading-none">
        Login
      </label>
      {loggedIn ? (
        <button type="button" onClick={handleLogout}>
          logout
        </button>
      ) : (
        <input id="login" name="password" type="password" className="w-16" />
      )}
    </form>
  )
}
