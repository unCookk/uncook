'use client'
import { useEffect } from 'react'

import { getCookie } from '#/utils/next-cookies'
import loginStore from '#/store/login-store'

export default function IsLoggedIn() {
  const checkStatus = async () => {
    const status = await getCookie('auth')
    if (status === 'true') {
      loginStore.setState(true)
    } else {
      loginStore.setState(false)
    }
  }
  useEffect(() => {
    checkStatus()
  }, [])
  return null
}
