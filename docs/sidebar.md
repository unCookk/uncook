# 📄 반응형 Sidebar 제작 문제

## ⚠️문제

“어떤 문제가 있었나요”

데스크톱은 마우스를 사용하고 화면이 크다. 반면 모바일이나 태블릿은 터치를 기반으로 하고 화면이 작다. 좋은 사용자 경험을 위해서는 이 둘의 UI/UX는 달라져야만 한다.

기기(모바일 태블릿, 데스크톱)에 따라 달라지는 사이드바를 어떻게 구현할 것인가?

## 레퍼런스

[클로드](https://claude.ai/)의 사이드바를 참고했다.

## ✅ 요구사항 설계

### 🖥 데스크톱 (Desktop)

✔️ UI/UX

- 마우스 사용을 전제로 한 인터랙션 제공
- 사이드바는 화면 왼쪽에 다른 콘텐츠 위에 떠 있는 형태이나 고정 시 화면 일부를 차지한다.

✔️ 트리거 아이콘

- 아이콘: `LayoutSidebar`
- 아이콘 위치: 로고 오른쪽
- 트리거 방식: `hover`
  - 사이드바 표시: 아이콘에 hover하면 열림
  - 사이드바 숨김
    - 사이드바가 고정되지 않은 경우: `mouseleave` 이벤트 발생 시 닫힘
    - 사이드바가 고정된 경우: 닫을 수 없음

✔️ 사이드바 고정

- 고정 버튼 아이콘: `RxPin`
- 고정 방식: 아이콘 클릭 시 고정 상태를 토글

### 📱 모바일, 태블릿 (Mobile & Tablet)

✔️UI/UX 원칙

- 터치를 전제로 한 인터랙션 제공
- 사이드바는 화면 전체를 덮는 형태

✔️ 트리거 아이콘

- 아이콘: `TiThMenu`
- 아이콘 위치: 로고 왼쪽
- 아이콘: `TiThMenu`
- 트리거 방식: `click`
  - 사이드바 표시: 아이콘을 `click`하면 열림
  - 사이드바 숨김: 다시 아이콘을 `click`하면 닫힘

✔️ 사이드바 고정 기능 없음

## 🔍 분석

현재 데스크톱인지 아닌지에 대한 상태 필요. `isDesktop`

- 컴포넌트를 `isDesktop` 상태에 따라 조건부 렌더링
- tailwind className을 `isDesktop` 상태에 따라 조건부로 적용

## 💡 해결 방법 후보

1️⃣ 화면 크기 검사 훅 제작

2️⃣ 화면 크기를 전역 상태로 관리

3️⃣ 기기 정보를 활용한 분기 처리 **(채택!)**

## 1️⃣ 화면 크기 검사 훅 제작: useIsDesktop

### 👁‍🗨 예시

아래와 같은 훅을 만들어서 사용해 보는 걸 생각해 볼 수 있다.

```tsx
'use client'

import { useEffect, useState } from 'react'

// useEffect를 활욜해 window의 크기를 감지하고 지역상태에 저장해 반환한다.

const useIsDesktop = (): boolean => {
  const [isDesktop, setIsDesktop] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth >= 768)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return isDesktop
}

export default useIsDesktop
```

그러면 이런 식으로 사용해 볼 수 있다.

```tsx
'use client'

export default function NavIcon() {
  const isDesktop = useIsDesktop()

  if (isDesktop) {
    return (
      <SidebarHoverTrigger>
        <LayoutSidebar />
      </SidebarHoverTrigger>
    )
  } else {
    return (
      <SidebarTrigger>
        <TiThMenu />
      </SidebarTrigger>
    )
  }
}
```

### 👍 장점

간단한 구현

### 📛 문제점

- 중복 문제:  
  useIsDesktop를 많이 사용하는 경우 동일한 useEffect가 여러번 돌아가고, 동일한 EventListener가 여러개 등록된다. 또한 같은 상태를 가진 지역 상태가 중복해서 여러 개 생긴다. 즉 비효율적이다.

- 화면 크기 기반 분기 문제:  
  화면의 크기에 따라서 desktop인지를 검사한다. 그러나 이는 요구사항에 맞지 않는다. 윈도우 창이 작아지더라도 여전히 마우스 사용을 전제로 한 사이드바를 사용할 수 있어야 한다.

- Layout Shift 문제
  마운트(처음 렌더링) 후 useEffect가 돈다. 즉 초깃값이 useEffect 이후에 값과 달라지면 아이콘이 갑자기 바뀌거나 사이드바 크기가 달라지는 등 화면이 깜빡 거리고 Layout Shift가 일어나 사용감과 성능에도 좋지 않다.

## 2️⃣ 화면 크기를 전역 상태로 관리: DesktopSizeWatcher

`isDesktop` 상태는 앱 전체에 걸쳐 사용될테니까 전역 변수를 사용하는 게 적절해 보인다.

### 👁‍🗨 예시

먼저 데스크톱인지에 대한 전역 상태를 만든다.

```tsx
import createStore from './utils/create-store'

const isDesktopStore = createStore<boolean>(true)

export default isDesktopStore
```

그리고 아래와 같은 컴포넌트를 최상단 레이아웃에 박는 방법을 생각해 볼 수 있다.

```tsx
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

//layout.tsx
// 최상단 레이아웃에 박을 경우 useEffect가 한 번만 돌도 이벤트 리스터도 한 번 등록된다.
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${pretendard.className} size-full`}>
      <body className="relative size-full">
        <DesktopSizeWatcher />
        <main>{children}</main>
      </body>
    </html>
  )
}
```

그리고 이렇게 사용하는 걸 생각해 볼 수 있다.

```tsx
'use client'

import isDesktopStore from '#/store/is-desktop-store'
import { useStoreSelector } from '#/store/utils/use-store'

export default function NavIcon() {
  const isDesktop = useStoreSelector(isDesktopStore, (state) => state)

  if (isDesktop) {
    return (
      <SidebarHoverTrigger>
        <LayoutSidebar />
      </SidebarHoverTrigger>
    )
  } else {
    return (
      <SidebarTrigger>
        <TiThMenu />
      </SidebarTrigger>
    )
  }
}
```

### 👍 장점

useEffect와 EventListner를 최소화 할 수 있다. 또한 isDesktop라는 하나의 상태를 전역에서 사용 가능해진다.

### 📛 문제점

- ~~중복 문제.~~ **해결**

- 화면 크기 기반 분기 문제:  
  화면의 크기에 따라서 desktop인지를 검사한다. 그러나 이는 요구사항에 맞지 않는다. 윈도우 창이 작아지더라도 여전히 마우스 사용을 전제로 한 사이드바를 사용할 수 있어야 한다.

- Layout Shift 문제
  마운트(처음 렌더링) 후 useEffect가 돈다. 즉 초깃값이 useEffect 이후에 값과 달라지면 아이콘이 갑자기 바뀌거나 사이드바 크기가 달라지는 등 화면이 깜빡 거리고 Layout Shift가 일어나 사용감과 성능에도 좋지 않다.

**여전히 1️⃣ useIsDesktop에도 두 가지 문제가 남는다.**

## 3️⃣ 기기 정보를 활용한 분기 처리: User-Agent

먼저 기기 정보를 알 수 있는 User-Agent를 알아보자.

### 🔍User-Agent란?

User-Agent(UA)는 웹 브라우저, 모바일 앱, 봇 등 사용자의 클라이언트가 웹 서버와 통신할 때 자신을 식별하기 위해 전송하는 HTTP 요청 헤더 중 하나다.

#### User-Agent의 역할

1. 클라이언트 식별

- 요청을 보낸 브라우저(Chrome, Safari, Edge 등) 또는 앱이 무엇인지 알려줌
- 운영 체제(Windows, macOS, Android 등) 정보 포함
- 특정 기기 정보(iPhone, Samsung 등) 포함

2. 웹사이트 최적화

- 웹 서버가 특정 브라우저나 디바이스에 맞춰 콘텐츠를 최적화하여 제공 가능
- 예: 모바일에서는 가벼운 UI를 제공하고, 데스크톱에서는 풀 기능을 제공

3. 분석 및 로그 기록

- 웹사이트 방문자의 사용 환경을 분석하여 트렌드 파악 가능
- 보안 목적으로 특정 User-Agent 차단 가능 (예: 악성 봇 차단)

#### User-Agent 예제

1. Chrome 브라우저 (Windows 10)

```swift
Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36
```

- Mozilla/5.0: 과거 넷스케이프 브라우저와의 호환성을 위해 유지되는 부분
- Windows NT 10.0; Win64; x64: Windows 10 운영 체제, 64비트 아키텍처
- AppleWebKit/537.36: Chrome이 사용하는 렌더링 엔진 (WebKit 기반)
- Chrome/120.0.0.0: Chrome 브라우저 버전
- Safari/537.36: Safari와의 호환성을 유지하기 위한 정보

2. iPhone Safari (iOS 16)

```swift
Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/537.36
```

- iPhone; CPU iPhone OS 16_0 like Mac OS X: iOS 16을 사용하는 iPhone
- Mobile: 모바일 장치임을 나타냄
- Safari/537.36: Safari 브라우저

#### User-Agent 변경 및 활용

1. User-Agent 스푸핑

- 개발자 도구(F12)에서 다른 User-Agent로 변경하여 테스트 가능
- 브라우저 확장 프로그램(User-Agent Switcher)으로 변경 가능
- 서버가 User-Agent 기반으로 다르게 응답하는지 확인 가능

2. User-Agent 기반 대응

- 모바일/데스크톱 전환 (예: window.navigator.userAgent 사용)
- 특정 봇(User-Agent 분석) 차단

#### User-Agent 관련 문제점

1. User-Agent 스푸핑

- 일부 사용자가 다른 브라우저로 가장할 수 있음
- 봇이나 스크래퍼가 정교한 User-Agent를 사용해 차단 회피 가능

2. 브라우저별 차이

- 브라우저마다 다른 User-Agent 포맷을 사용하여 처리 복잡

3. Privacy 이슈

- User-Agent 정보를 통해 특정 사용자 또는 기기를 추적할 가능성 있음
- 일부 브라우저(예: 최신 Chrome, Firefox)는 User-Agent를 점진적으로 폐지하고 User-Agent Client Hints로 대체 중

#### 정리

- User-Agent는 웹 서버가 클라이언트를 식별하는 중요한 HTTP 헤더
- User-Agent 기반 최적화보다는 반응형 웹 디자인, 기능 감지(feature detection) 등을 활용하는 것이 더 바람직함
- Privacy 이슈로 인해 User-Agent Client Hints로 전환이 진행 중

## 🔍Next.js: headers

Next.js에서 제공하는 headers 함수를 사용해 User-Agent에 접근할 수 있다.

headers 함수는 서버 컴포넌트에서 HTTP 수신 요청 헤더를 읽을 수 있게 해줍니다.

```tsx
import { headers } from 'next/headers'

export default async function Page() {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent')
}
```

그렇다면 서버 컴포넌트에서 User-Agent 정보를 이용하는 방법을 생각해 볼 수 있다.

### 👁‍🗨 예시

예를 들면 아래와 같이 사용해 볼 수 있다.

headers 함수와 User-Agent 정보를 가지고 `mobile`인지 `desktop`인지 `tablet`인지 반환하는 util 함수 classifyDeviceType 만들어 사용해 보자.

```tsx
'use server'

import { headers } from 'next/headers'

// 기기 타입 3가지
type DeviceType = 'mobile' | 'desktop' | 'tablet'

export default async function NavIcon() {
  const headersList = await headers()
  const userAgent = headersList.get('user-agent')

  // userAgent DeviceType
  //classifyDeviceType: (userAgent: string) =>DeviceType
  const isDesktop = classifyDeviceType(userAgent) === 'desktop'

  if (isDesktop) {
    return (
      <SidebarHoverTrigger>
        <LayoutSidebar />
      </SidebarHoverTrigger>
    )
  } else {
    return (
      <SidebarTrigger>
        <TiThMenu />
      </SidebarTrigger>
    )
  }
}
```

classifyDeviceType은 내부다. 정규식을 사용해 기기를 분류한다.

```ts
type DeviceType = 'mobile' | 'desktop' | 'tablet'

const classifyDeviceType = (userAgent: string): DeviceType => {
  // iPad 특정 패턴 (iPadOS 13+)
  const iPadRegex = /iPad|Mozilla.*Mac OS.*Safari|Macintosh.\*Safari/i

  // Mac 전용 패턴 (iPad 제외)
  const macRegex = /Macintosh.*Chrome|Macintosh.*Firefox|Macintosh.\*Edge/i

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
```

### 👍 장점

서버에서 `headers`를 이용하여 기기 정보를 정확하게 감지하므로,useEffect를 사용하지 않아도 되고, 클라이언트에서 불필요한 렌더링 이슈를 방지한다. 그리고 화면 크기로 기기를 구분하는 것이 아니기 때문에 마우스 사용과 터치에 따른 인터랙션을 항상 제공할 수 있게 된다.

### 📛 문제점

- ~~중복 문제.~~ **해결**

- ~~화면 크기 기반 분기 문제~~ **해결**

- ~~Layout Shift 문제~~ **해결**

## 🟡 결론 및 요약

기기에 따른 반응형 사이드바를 어떻게 제작할 것인가?

| 방법                 | 장점                              | 단점                                                      |
| -------------------- | --------------------------------- | --------------------------------------------------------- |
| useIsDesktop 훅      | 간단한 구현                       | 상태와 이벤트가 중복되고 비효율적이며 Layout Shift 발생   |
| 전역 상태 관리       | useEffect 및 EventListener 최소화 | 여전히 화면 크기 기반 분기라 요구사항과 다름              |
| User-Agent 기반 처리 | 서버에서 기기 정보를 정확히 감지  | User-Agent 스푸핑 가능성이 있지만 대부분의 경우 문제 없음 |

결론적으로 **User-Agent 기반 분기 처리**가 가장 적절한 해결책이다.

## 🔵 마무리 및 고려 사항

- **User-Agent 스푸핑 문제**: 일부 사용자가 User-Agent를 조작할 수 있지만, 일반적인 웹 애플리케이션에서는 큰 문제가 되지 않음.
- **클라이언트에서 추가적인 처리 가능**: 필요할 경우 `useEffect`를 활용하여 클라이언트에서 추가적인 검증을 할 수도 있음.

## 🟣 최종 사용 예시 코드

root layout.tsx -> 기기 정보 확인

```tsx
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const loggedIn = (await getCookie('auth')) === 'true'
  const deviceType = await getDeviceType()

  return (
    <html lang="ko" className={`${pretendard.className} size-full`}>
      <body className="relative size-full">
        <SidebarProvider
          isDesktop={deviceType === 'desktop'}
          loggedIn={loggedIn}
        >
          <Header />
          <AppSidebar />
          <Main className="overflow-x-hidden pt-12">{children}</Main>
        </SidebarProvider>
      </body>
    </html>
  )
}
```

SidebarProvider -> Desktop인지에 대한 정보를 `isDesktop`에 담아 context로 넘겨주어 사이드바 컴포넌트 안에서 사용할 수 있게 한다.

```tsx
export function SidebarProvider({
  children,
  isDesktop,
  loggedIn,
}: SidebarProviderProps) {
  const [open, setOpen] = useState(false)
  const [pinned, setPinned] = useState(false)

  const value: SidebarContextType = {
    open,
    pinned,
    setOpen,
    setPinned,
    isDesktop,
    loggedIn,
  }

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}
```

SidebarPinButton -> `isDesktop` 활용 예시, pin 버튼은 태블릿에서만 보여야 한다.

```tsx
export function SidebarPinButton({ children, className }: ClassNameProp) {
  const { setPinned, isDesktop } = useSidebar()
  const toggle = () => {
    setPinned((prev) => !prev)
  }

  if (isDesktop) {
    return (
      <button
        className={cn(
          'p-2 mb-3 transition-all duration-300 ease-in-out rounded-lg',
          'hover:scale-105 active:scale-95',
          'hover:bg-accent',
          className,
        )}
        onClick={toggle}
      >
        {children}
      </button>
    )
  }
}
```
