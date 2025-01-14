import { Survey, RatingConfig, DEFAULT_RATING_CONFIG } from '#/types/survey'

const HELP_RATING_CONFIG: RatingConfig = {
  ...DEFAULT_RATING_CONFIG,
  leftLabel: '매우 도움됨',
  rightLabel: '전혀 도움 안됨',
}

const EASY_RATING_CONFIG: RatingConfig = {
  ...DEFAULT_RATING_CONFIG,
  leftLabel: '매우 쉬움',
  rightLabel: '매우 어려움',
}

export const surveyData: Survey = {
  id: 'resume-interface-feedback',
  title: '이력서 인터페이스 피드백',
  sections: [
    {
      id: 'split-view',
      title: 'Split View 인터페이스에 대한 피드백',
      questions: [
        {
          id: 'split-view-effectiveness',
          type: 'combined',
          text: 'Split View 기능이 이력서와 상세 내용을 이어서 이해하는 데 도움이 되었나요?',
          config: HELP_RATING_CONFIG,
          followUpQuestion:
            '이 기능에서 개선하거나 추가했으면 하는 점이 무엇인가요?',
        },
        {
          id: 'split-view-issues',
          type: 'text',
          text: '이력서를 보면서 Split View 기능이 불편했던 점이 있다면 무엇이었나요?',
          placeholder:
            '예를 들어 문맥 연결이 부족했거나, 상세 내용을 볼 때 더 필요한 정보나 포함되었으면 좋을 세부 내용이 있었는지 작성해 주세요.',
        },
      ],
    },
    {
      id: 'competency-based',
      title: '역량 기반 분류에 대한 피드백',
      questions: [
        {
          id: 'competency-understanding',
          type: 'combined',
          text: '역량 별로 분류된 이력서 구성이 이해하기 쉬웠나요?',
          config: EASY_RATING_CONFIG,
          followUpQuestion:
            '역량 기반의 이력서 구성 방식에 대해 개선할 부분이 있다면 어떤 점인가요?',
        },
        {
          id: 'competency-speed',
          type: 'combined',
          text: '역량별 분류가 판단 속도를 높이는 데 얼마나 도움이 되었나요?',
          config: HELP_RATING_CONFIG,
          followUpQuestion:
            '역량별 분류 방식이 면접관의 판단에 더 효과적이려면 어떤 점이 개선되어야 할까요?',
        },
      ],
    },
    {
      id: 'experience-summary',
      title: '경험 요약 기반 구성에 대한 피드백',
      questions: [
        {
          id: 'summary-evaluation',
          type: 'combined',
          text: '경험 요약 기반으로 작성된 이력서 구성이 지원자를 평가하기 쉬웠나요?',
          config: EASY_RATING_CONFIG,
          followUpQuestion:
            '경험 요약 기반의 이력서 구성 방식에 개선할 부분이 있다면 어떤 점이 있을까요?',
        },
        {
          id: 'contribution-clarity',
          type: 'combined',
          text: '경험 요약이 지원자의 기여도를 더 명확하게 이해하는 데 얼마나 도움이 되었나요?',
          config: HELP_RATING_CONFIG,
          followUpQuestion:
            '기여도를 더 명확하게 전달하기 위해 추가로 필요한 정보나 개선할 부분이 있다면 적어주세요.',
        },
      ],
    },
    {
      id: 'overall-feedback',
      title: '종합 피드백',
      questions: [
        {
          id: 'most-useful-feature',
          type: 'text',
          text: '전체적으로 봤을 때 가장 유용했던 기능은 무엇인가요?',
          placeholder:
            '각 기능의 어떤 점이 가장 마음에 들었는지 구체적으로 적어주세요.',
        },
        {
          id: 'improvement-suggestions',
          type: 'text',
          text: '이 MVP를 통해 개선하면 좋을 점이나 추가 기능 제안이 있다면 적어주세요.',
          placeholder:
            '더 나은 사용자 경험을 위해 추가되었으면 하는 기능이나 개선사항, 또는 평소에 이력서를 검토하며 느꼈던 불편한 점이 있다면 자유롭게 작성해 주세요.',
        },
        {
          id: 'evaluation-impact',
          type: 'text',
          text: '이 이력서 구조가 구직자 평가에 어떤 긍정적 또는 부정적 영향을 줄 것 같은지 생각을 적어주세요.',
          placeholder:
            '이 구조가 면접관 입장에서 평가 과정에 어떤 변화를 줄 것 같은지, 긍정적인 점과 부정적인 점을 함께 작성해 주세요.',
        },
      ],
    },
  ],
}
