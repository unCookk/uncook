'use client'
import { ReactNode, memo, useEffect, useCallback } from 'react'

import splitViewStore from '#/store/split-view-store'
import { useStoreSelector } from '#/store/utils/use-store'

interface SplitViewContainerProp {
  PrimaryView: ReactNode
  SecondaryView: ReactNode
}

function SplitViewContainer({
  PrimaryView,
  SecondaryView,
}: SplitViewContainerProp) {
  const isOpen = useStoreSelector(splitViewStore, (state) => state.isOpen)

  // popstate 이벤트 핸들러
  const handlePopState = useCallback(() => {
    if (isOpen) {
      splitViewStore.setState({ isOpen: false, id: null, title: '' })
    }
  }, [isOpen])

  // popstate 이벤트 리스너 등록 및 정리
  useEffect(() => {
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [handlePopState])

  return (
    <div className="relative flex size-full">
      <div className="lg:w-6/12" />
      <div
        className={`absolute size-full lg:w-6/12 ${
          isOpen
            ? 'lg:left-0'
            : 'lg:left-1/2 lg:min-w-[61rem] lg:-translate-x-1/2'
        } transition-all duration-300 ease-out`}
      >
        {PrimaryView}
      </div>
      {isOpen && (
        <div className="z-10 size-full animate-slide-in-right lg:ml-20 lg:w-6/12">
          {SecondaryView}
        </div>
      )}
    </div>
  )
}

export default memo(SplitViewContainer)
