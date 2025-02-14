import { FaRegUserCircle } from 'react-icons/fa'

import loginAction from '#/app/api/login'

export default function LoginForm() {
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

  return (
    <form className="flex items-center" action={handleSubmit}>
      <label
        htmlFor="login"
        className="mr-2 cursor-pointer text-sm font-medium leading-none"
      >
        <FaRegUserCircle className="size-5" />
      </label>
      <input
        id="login"
        name="password"
        type="password"
        className="w-16 bg-transparent focus:bg-white"
      />
    </form>
  )
}
