export type QuestionType = 'rating' | 'text' | 'combined'

export interface RatingConfig {
  options: number[]
  leftLabel: string
  rightLabel: string
}

export interface QuestionBase {
  id: string
  text: string
}

export interface RatingQuestion extends QuestionBase {
  type: 'rating'
  config: RatingConfig
}

export interface TextQuestion extends QuestionBase {
  type: 'text'
  placeholder?: string
}

export interface CombinedQuestion extends QuestionBase {
  type: 'combined'
  config: RatingConfig
  followUpQuestion: string
}

export type Question = RatingQuestion | TextQuestion | CombinedQuestion

export interface SurveySection {
  id: string
  title: string
  questions: Question[]
}

export interface Survey {
  id: string
  title: string
  sections: SurveySection[]
}

export const DEFAULT_RATING_CONFIG: RatingConfig = {
  options: [5, 4, 3, 2, 1],
  leftLabel: '긍정적',
  rightLabel: '부정적',
}

export interface QuestionResponse {
  rating?: number
  text?: string
}

export interface SurveyResponse {
  [questionId: string]: QuestionResponse
}
