import createStore from './utils/create-store'

interface SidebarStoreType {
  isOpen: boolean
  isPinned: boolean
}

const sidebarStore = createStore<SidebarStoreType>({
  isOpen: false,
  isPinned: false,
})
export default sidebarStore
