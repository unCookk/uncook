'use server'

import { cookies } from 'next/headers'

export async function setCookie(name: string, value: string) {
  const cookieStore = await cookies()
  cookieStore.set(name, value, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
  })
}

export async function deleteCookie(name: string) {
  const cookieStore = await cookies()
  cookieStore.delete(name)
}

export async function getCookie(name: string) {
  const cookieStore = await cookies()
  return cookieStore.get(name)?.value
}
