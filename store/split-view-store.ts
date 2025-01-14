import createStore from './utils/create-store'

interface SplitViewStoreType {
  isOpen: boolean
  id: number | null
  title: string
}

const splitViewStore = createStore<SplitViewStoreType>({
  isOpen: false,
  id: null,
  title: '',
})
export default splitViewStore
