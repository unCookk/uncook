import { memo } from 'react'

import { StarRating } from './rating'

import { Textarea } from '#/components/ui/textarea'
import { Question, QuestionResponse } from '#/types/survey'

interface QuestionBlockProps {
  question: Question
  questionIndex: number
  response: QuestionResponse
  onRatingChange?: (questionId: string, rating: number) => void
  onTextChange?: (questionId: string, text: string) => void
}

export const QuestionBlock = memo(function QuestionBlock({
  question,
  questionIndex,
  response,
  onRatingChange,
  onTextChange,
}: QuestionBlockProps) {
  const hasRating = question.type === 'rating' || question.type === 'combined'
  const hasText = question.type === 'text' || question.type === 'combined'

  const renderRating = () => {
    if (!hasRating || !('config' in question)) {
      return null
    }
    const { options, leftLabel, rightLabel } = question.config
    const midpoint = Math.ceil(options.length / 2)

    return (
      <div>
        <div className="mb-3 flex items-center justify-center gap-2 sm:mb-4 sm:gap-4">
          {options.map((rating) => {
            const distance = rating - midpoint
            return (
              <StarRating
                key={`${question.id}-${rating}`}
                rating={rating}
                selectedRating={response.rating || 0}
                onSelect={(rating) => onRatingChange?.(question.id, rating)}
                questionIndex={questionIndex}
                distance={distance}
              />
            )
          })}
        </div>
        <div className="flex justify-between px-1 text-xs font-medium sm:px-2 sm:text-sm md:text-base">
          <div className="text-[#33a474]">{leftLabel}</div>
          <div className="text-[#88619a]">{rightLabel}</div>
        </div>
      </div>
    )
  }

  const renderText = () => {
    if (!hasText) {
      return null
    }
    const promptText =
      question.type === 'combined' ? question.followUpQuestion : question.text

    return (
      <div className="mt-3 sm:mt-4">
        {question.type === 'combined' && (
          <h3 className="mb-2 text-sm font-medium sm:text-base">
            {promptText}
          </h3>
        )}
        <Textarea
          className="min-h-[80px] w-full rounded-md border p-2 text-sm sm:min-h-[100px] sm:text-base"
          placeholder={
            question.type === 'text'
              ? question.placeholder
              : '의견을 입력해주세요...'
          }
          value={response.text || ''}
          onChange={(e) => onTextChange?.(question.id, e.target.value)}
        />
      </div>
    )
  }

  return (
    <fieldset className="mb-4 rounded-lg border border-gray-200 bg-white p-3 shadow-sm sm:mb-6 sm:p-6">
      <legend className="mb-3 flex gap-2 px-1 text-base font-medium sm:mb-4 sm:px-2 sm:text-lg">
        <div className="font-bold text-neutral-700">{`Q${questionIndex + 1}.`}</div>
        <div className="text-neutral-800">{question.text}</div>
      </legend>
      {renderRating()}
      {renderText()}
    </fieldset>
  )
})
