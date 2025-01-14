import Resume from './_components/resume'
import SecondaryViewContainer from './_components/split-view/secondary-view-container'
import SplitViewContainer from './_components/split-view/split-view-container'

function ResumePage() {
  return (
    <SplitViewContainer
      PrimaryView={<Resume />}
      SecondaryView={<SecondaryViewContainer />}
    />
  )
}

export default ResumePage
