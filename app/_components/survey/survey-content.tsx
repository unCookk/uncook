'use client'
import { useState, useCallback } from 'react'

import { QuestionBlock } from './content-elements/question-block'
import { surveyData } from './survey-data'

import { addDocument } from '#/lib/firebase/firestore'
import { SurveyResponse } from '#/types/survey'

function SurveyContent() {
  const [responses, setResponses] = useState<SurveyResponse>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [startTime] = useState(() => new Date())

  // 사용자 식별자 생성 또는 가져오기
  const [userId] = useState(() => {
    if (typeof window === 'undefined') {
      return ''
    }

    const stored = localStorage.getItem('survey_user_id')
    if (stored) {
      return stored
    }
    const newId = `user_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`
    localStorage.setItem('survey_user_id', newId)
    return newId
  })

  const handleRatingChange = useCallback(
    (questionId: string, rating: number) => {
      setResponses((prev) => ({
        ...prev,
        [questionId]: {
          ...prev[questionId],
          rating,
        },
      }))
    },
    [],
  )

  const handleTextChange = useCallback((questionId: string, text: string) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        text,
      },
    }))
  }, [])

  const handleSubmit = useCallback(async () => {
    try {
      const params = new URLSearchParams(window.location.search)
      const persona = params.get('persona') || 'unknown'
      const submitTime = new Date()
      const completionTime = submitTime.getTime() - startTime.getTime()

      await addDocument('survey_responses', {
        timestamp: submitTime,
        persona,
        userId,
        userAgent: navigator.userAgent,
        completionTime,
        responses,
        isComplete:
          Object.keys(responses).length ===
          surveyData.sections.reduce(
            (acc, section) => acc + section.questions.length,
            0,
          ),
      })
      setIsSubmitted(true)
    } catch (error) {
      console.error('설문 제출 중 오류 발생:', error)
      alert('설문 제출 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
  }, [responses, startTime, userId])

  if (isSubmitted) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center p-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-lime-700">
            설문에 응해주셔서 감사합니다!
          </h2>
          <p className="mt-4 text-gray-700">
            귀중한 피드백을 보내주셨습니다. <br />
            서비스 개선에 큰 도움이 될 것입니다.
          </p>
        </div>
      </div>
    )
  }

  let questionIndex = 0

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center p-4">
      {surveyData.sections.map((section) => (
        <div key={section.id} className="mb-12 w-full">
          <div className="mb-6 rounded-lg border-l-4 border-neutral-600 bg-gray-50 p-4">
            <h2 className="text-base font-bold  text-gray-800 md:text-lg">
              {section.title}
            </h2>
          </div>
          <div className="border-gray-200">
            {section.questions.map((question) => {
              const currentIndex = questionIndex++
              return (
                <QuestionBlock
                  key={question.id}
                  question={question}
                  questionIndex={currentIndex}
                  response={responses[question.id] || {}}
                  onRatingChange={handleRatingChange}
                  onTextChange={handleTextChange}
                />
              )
            })}
          </div>
        </div>
      ))}

      <div className="mt-6 text-center">
        <button
          onClick={handleSubmit}
          className="rounded-lg bg-neutral-900 px-6 py-3 text-white transition-colors duration-300 hover:bg-neutral-700"
        >
          설문 제출
        </button>
      </div>
    </div>
  )
}

export default SurveyContent
