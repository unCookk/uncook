'use server'

import { headers } from 'next/headers'

export type DeviceType = 'mobile' | 'desktop' | 'tablet'

const classifyDeviceType = (userAgent: string): DeviceType => {
  // iPad 특정 패턴 (iPadOS 13+)
  const iPadRegex = /iPad|Mozilla.*Mac OS.*Safari|Macintosh.*Safari/i

  // Mac 전용 패턴 (iPad 제외)
  const macRegex = /Macintosh.*Chrome|Macintosh.*Firefox|Macintosh.*Edge/i

  // 모바일 패턴
  const mobileRegex = new RegExp(
    [
      'Mobile',
      'Android.*Mobile',
      'iPhone',
      'iPod',
      'BlackBerry',
      'IEMobile',
      'Opera Mini',
      'Windows Phone',
      'webOS',
      'Palm',
      'SamsungBrowser',
      'Opera Mobi',
      'Opera Mobile',
      'Mobile Safari',
      'SymbianOS',
      'Series60',
      'S60',
      'MeeGo',
      'Firefox.*Mobile',
      'MicroMessenger',
    ].join('|'),
    'i',
  )

  // 일반 태블릿 패턴
  const tabletRegex = new RegExp(
    [
      'Android(?!.*Mobile)',
      'Kindle',
      'PlayBook',
      'Silk',
      'Tablet',
      'Nexus(?!.*Mobile)',
      'KFAPWI',
      'RIM Tablet',
      'HP TouchPad',
      'Shield Tablet',
    ].join('|'),
    'i',
  )

  // 디버깅을 위한 상세 로깅
  console.log({
    userAgent,
    isIPad: iPadRegex.test(userAgent),
    isMac: macRegex.test(userAgent),
    isMobile: mobileRegex.test(userAgent),
    isTablet: tabletRegex.test(userAgent),
  })

  // iPad 체크
  if (iPadRegex.test(userAgent) && !macRegex.test(userAgent)) {
    return 'tablet'
  }

  // Mac 체크
  if (macRegex.test(userAgent)) {
    return 'desktop'
  }

  // 일반 태블릿 체크
  if (tabletRegex.test(userAgent) && !mobileRegex.test(userAgent)) {
    return 'tablet'
  }

  // 모바일 체크
  if (mobileRegex.test(userAgent)) {
    return 'mobile'
  }

  // 기본값
  return 'desktop'
}

export const getDeviceType = async (): Promise<DeviceType> => {
  const headersList = await headers()
  const userAgent = (headersList.get('user-agent') as string) || ''
  return classifyDeviceType(userAgent)
}
