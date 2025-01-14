import ResumeSection from './ui/resume-section'
import SsulBlock from './ui/ssul-block'

import SectionType from '#/types/resume'

const sections: Record<SectionType, React.ReactNode> = {
  problemSolving: (
    <ResumeSection key="problemSolving" title="문제 해결 역량">
      <SsulBlock
        title="“링크를 왜 열었더라?” 이력서 이탈 문제"
        description="외부 링크 클릭 시 이력서 화면을 이탈하는 불편함이 있습니다. 애플의 휴면 인터페이스 가이드에 따라 split view를 적용해 이를 해결했습니다. 해당 문단을 클릭하면 자세한 사항을 세컨더리 패널에서 확인할 수 있습니다."
        splitViewId={0}
        SplitViewTitle="“링크를 왜 열었더라?” 이력서 이탈 문제"
      />
      <SsulBlock
        title="“뭐 어쩌라는 거지?” 역량 확인의 어려움"
        description="이력서에서 지원자의 역량을 추론해야 하는 불편함이 있습니다. 프로젝트가 아닌 역량과 경험 단위로만 이력서를 구성해 이를 해결했습니다. 문제 해결 능력, 커뮤니케이션 능력, 기술 역량을 강조하는 경험을 바로 확인 할 수 있습니다."
        splitViewId={1}
        SplitViewTitle="“뭐 어쩌라는 거지?” 역량 확인의 어려움"
      />
    </ResumeSection>
  ),
  communication: (
    <ResumeSection key="communication" title="커뮤니케이션 역량">
      <SsulBlock
        title="“듣고 싶은 것만 들려요” 칵테일 파티 효과"
        description="수많은 이력서와 무의미한 내용은 집중력을 소모합니다. ‘칵테일파티 효과’를 참고하여 페르소나 선택 화면을 제작해 이를 해결했습니다. 사용자는 1:1 대화에 초대받는 기분과 함께 의미 있는 정보를 제공받습니다. 시끄러운 파티에서도 대화에 집중하는 사람들처럼 사용자의 집중력이 향상됩니다."
        splitViewId={2}
        SplitViewTitle="“듣고 싶은 것만 들려요” 칵테일 파티 효과"
      />
      <SsulBlock
        title="“피드백 귀찮아요” 피드백 잘 받기"
        description="피드백은 이력서를 개선하는 데 중요한 역할을 하지만, 시간과 노력이 많이 듭니다. 이를 해결하기 위해 이력서 내 모달 창을 활용하여 검토자가 간단하고 빠르게 피드백을 제공할 수 있도록 했습니다."
        splitViewId={3}
        SplitViewTitle="“피드백 귀찮아요” 피드백 잘 받기"
      />
    </ResumeSection>
  ),
  technicalSkills: (
    <ResumeSection key="technicalSkills" title="기술 역량">
      <SsulBlock
        title="MVP 제작"
        description="본 mvp는 다음과 같은 기술 스택으로 제작하였습니다: Next.js, MDX, tailwind, Shadcn, BitBucket, firebase"
        splitViewId={4}
        SplitViewTitle="MVP 제작"
      />
    </ResumeSection>
  ),
}

interface ResumeCapabilityProps {
  order: SectionType[]
}

function ResumeCapability({ order }: ResumeCapabilityProps) {
  return (
    <div className="mt-6 flex flex-col gap-12">
      {order.map((section) => sections[section])}
    </div>
  )
}

export default ResumeCapability
