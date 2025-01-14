'use client'

import { useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

import SecondaryView from '../ui/secondary-view'

import SecondaryViewContent from './secondary-view-content'

import { useStoreSelector } from '#/store/utils/use-store'
import splitViewStore from '#/store/split-view-store'
import { ScrollArea } from '#/components/ui/scroll-area'

function SecondaryViewContainer() {
  const title = useStoreSelector(splitViewStore, (state) => state.title)
  const id = useStoreSelector(splitViewStore, (state) => state.id)
  const contentRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const handleClose = useCallback(() => {
    splitViewStore.setState({ isOpen: false, id: null, title: '' })
    router.back()
  }, [router])

  useEffect(() => {
    // Content가 변경될 때마다 스크롤을 최상단으로 이동
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }, [id]) // id가 변경될 때마다 실행

  return (
    <SecondaryView title={title} onClose={handleClose}>
      <ScrollArea scrollViewRef={contentRef} className="size-full px-10">
        <SecondaryViewContent id={id} />
      </ScrollArea>
    </SecondaryView>
  )
}

export default SecondaryViewContainer
