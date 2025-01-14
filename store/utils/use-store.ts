import { useSyncExternalStore } from 'react'

import { Store } from './create-store'

const useStore = <T>(store: Store<T>) => {
  const state = useSyncExternalStore(
    store.subscribe,
    store.getState,
    store.getState,
  )

  return [state, store.setState] as const
}

const useStoreSelector = <T, S>(store: Store<T>, selector: (state: T) => S) => {
  const state = useSyncExternalStore(
    store.subscribe,
    () => selector(store.getState()),
    () => selector(store.getState()),
  )

  return state
}

export { useStore, useStoreSelector }
