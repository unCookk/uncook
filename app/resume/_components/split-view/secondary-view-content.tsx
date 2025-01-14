import { memo } from 'react'

import ssulContents from '../ssul'

interface SecondaryViewContentProps {
  id: number | null
}

function SecondaryViewContent({ id }: SecondaryViewContentProps) {
  const Content = id != null ? ssulContents[id] : () => null

  return (
    <article className="prose size-full !max-w-full py-5 md:prose">
      <Content />
      <br />
    </article>
  )
}

export default memo(SecondaryViewContent)
