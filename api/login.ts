'use server'

import { setCookie } from '#/utils/next-cookies'

const loginAction = async (password: string) => {
  const correctPassword = process.env.NEXT_PUBLIC_LOGIN_PASSWORD

  if (password === correctPassword) {
    await setCookie('auth', 'true')
    return { success: true }
  }

  return { success: false, error: '비밀번호가 일치하지 않습니다.' }
}

export default loginAction
