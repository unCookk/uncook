import { ReactNode, memo } from 'react'

import SecondaryViewHeader from './secondary-view-header'

interface SecondaryViewProps {
  children: ReactNode
  title: string
  onClose: () => void
}

function SecondaryView({ children, title, onClose }: SecondaryViewProps) {
  return (
    <section
      className="flex size-full flex-col rounded-lg border bg-white shadow"
      aria-label="Detail View"
    >
      <SecondaryViewHeader title={title} onClose={onClose} />

      {children}
    </section>
  )
}

export default memo(SecondaryView)
