import React, { memo } from 'react'

import withSplitView from '../split-view/with-split-view'

interface SsulBlockProps {
  title: string
  description: string
}

function SsulBlock({ title, description }: SsulBlockProps) {
  return (
    <article className="rounded-lg px-5 py-8">
      <h3 className="!mt-0">{title}</h3>
      <p className="!mb-0">{description}</p>
    </article>
  )
}

export default withSplitView(memo(SsulBlock))
