'use client'

import { useEffect } from 'react'

import isDesktopStore from '#/store/is-desktop-store'

export default function DesktopSizeWatcher() {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)')

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      isDesktopStore.setState(e.matches)
    }

    // 초기 렌더링 시 확인
    isDesktopStore.setState(mediaQuery.matches)

    // 미디어 쿼리 변경 시 이벤트 등록
    mediaQuery.addEventListener('change', handleMediaQueryChange)

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange)
    }
  }, [])

  return null
}
