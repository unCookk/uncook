'use client'

import { RxPinLeft, RxPinRight } from 'react-icons/rx'

import sidebarStore from '#/store/sidebar-store'
import { useStoreSelector } from '#/store/utils/use-store'

export default function PinButton() {
  const isPinned = useStoreSelector(sidebarStore, (state) => state.isPinned)

  const handleClick = () => {
    sidebarStore.setState((state) => ({
      ...state,
      isPinned: !state.isPinned,
    }))
  }
  return (
    <button onClick={handleClick}>
      {isPinned ? <RxPinLeft /> : <RxPinRight />}
    </button>
  )
}
