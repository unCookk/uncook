import { ComponentType } from 'react'

import OpenSplitView from './open-split-view'

interface DetailComponent {
  splitViewId?: number | null
  SplitViewTitle?: string
}

function withSplitView<P extends object>(WrappedComponent: ComponentType<P>) {
  return function SplitViewComponent(props: P & DetailComponent) {
    const { splitViewId, SplitViewTitle, ...restProps } = props

    if (typeof splitViewId === 'number' && typeof SplitViewTitle === 'string') {
      const openSplitViewProps = { splitViewId, SplitViewTitle }
      return (
        <OpenSplitView {...openSplitViewProps}>
          <WrappedComponent {...(restProps as P)} />
        </OpenSplitView>
      )
    }

    return <WrappedComponent {...(restProps as P)} />
  }
}

export default withSplitView
