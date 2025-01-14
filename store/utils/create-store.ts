export interface Store<T> {
  getState: () => T
  setState: (action: T | ((prev: T) => T)) => void
  subscribe: (callback: () => void) => () => void
}

const createStore = <T>(initialState: T): Store<T> => {
  let state = initialState
  const callbacks = new Set<() => void>()
  const getState = () => state
  const setState = (nextState: T | ((prev: T) => T)) => {
    const newState =
      typeof nextState === 'function'
        ? (nextState as (prev: T) => T)(state)
        : nextState

    // Shallow comparison using Object.is
    if (Object.is(state, newState)) {
      return
    }

    state = newState

    callbacks.forEach((callbackFun) => callbackFun())
  }
  const subscribe = (callbackFun: () => void) => {
    callbacks.add(callbackFun)
    return () => {
      callbacks.delete(callbackFun)
    }
  }
  return { getState, setState, subscribe }
}
export default createStore
