export enum QuestionType {
  RatingOnly = 'rating',
  RatingWithText = 'rating_text',
  TextOnly = 'text',
}

export interface SurveyQuestion {
  type: QuestionType
  question: string
  descriptive?: string
  ratingOptions?: number[]
}

const ratingOptions = [5, 4, 3, 2, 1]

export const questions: SurveyQuestion[] = [
  {
    type: QuestionType.RatingWithText,
    question:
      'Split View 기능이 이력서와 상세 내용을 이어서 이해하는 데 도움이 되었나요?',
    descriptive: '이 기능에서 개선하거나 추가했으면 하는 점이 무엇인가요?',
    ratingOptions,
  },
  {
    type: QuestionType.TextOnly,
    question:
      '이력서를 보면서 Split View 기능이 불편했던 점이 있다면 무엇이었나요?',
  },
  {
    type: QuestionType.RatingWithText,
    question: '역량 별로 분류된 이력서 구성이 이해하기 쉬웠나요?',
    ratingOptions,
    descriptive:
      '역량별 분류 방식이 면접관의 판단에 더 효과적이려면 어떤 점이 개선되어야 할까요?',
  },
  {
    type: QuestionType.RatingWithText,
    question: '역량별 분류가 판단 속도를 높이는 데 얼마나 도움이 되었나요?',
    ratingOptions,
    descriptive:
      '역량별 분류 방식이 면접관의 판단에 더 효과적이려면 어떤 점이 개선되어야 할까요?',
  },
  {
    type: QuestionType.RatingWithText,
    question:
      '경험 요약 기반으로 작성된 이력서 구성이 지원자를 평가하기 쉬웠나요?',
    ratingOptions,
    descriptive:
      '경험 요약 기반의 이력서 구성 방식에 개선할 부분이 있다면 어떤 점이 있을까요?',
  },
  {
    type: QuestionType.RatingWithText,
    question:
      '경험 요약이 지원자의 기여도를 더 명확하게 이해하는 데 얼마나 도움이 되었나요?',
    ratingOptions,
    descriptive:
      '기여도를 더 명확하게 전달하기 위해 추가로 필요한 정보나 개선할 부분이 있다면 적어주세요.',
  },
  {
    type: QuestionType.TextOnly,
    question: '전체적으로 봤을 때 가장 유용했던 기능은 무엇인가요?',
  },
  {
    type: QuestionType.TextOnly,
    question:
      '이 MVP를 통해 개선하면 좋을 점이나 추가 기능 제안이 있다면 적어주세요.',
  },
  {
    type: QuestionType.TextOnly,
    question:
      '이 이력서 구조가 구직자 평가에 어떤 긍정적 또는 부정적 영향을 줄 것 같은지 생각을 적어주세요.',
  },
]
