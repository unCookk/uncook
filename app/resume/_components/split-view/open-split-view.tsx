'use client'

import { ReactNode, KeyboardEvent } from 'react'

import splitViewStore from '#/store/split-view-store'
import { useStoreSelector } from '#/store/utils/use-store'

interface OpenSplitViewProps {
  children: ReactNode
  splitViewId: number | null
  SplitViewTitle: string
}

function OpenSplitView({
  children,
  splitViewId,
  SplitViewTitle,
}: OpenSplitViewProps) {
  const isActive = useStoreSelector(
    splitViewStore,
    (state) => state.id === splitViewId,
  )

  const handleOpenSplitView = () => {
    splitViewStore.setState({
      isOpen: true,
      id: splitViewId,
      title: SplitViewTitle,
    })
    window.history.pushState({ isSecondaryView: true }, '')
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleOpenSplitView()
    }
  }

  return (
    <div
      onClick={handleOpenSplitView}
      onKeyDown={handleKeyDown}
      className={`cursor-pointer rounded-lg border-2
        hover:border-black
        ${isActive ? 'border-black' : 'border-transparent'}`}
      role="button"
      tabIndex={0}
      aria-label="open split view"
    >
      {children}
    </div>
  )
}

export default OpenSplitView
