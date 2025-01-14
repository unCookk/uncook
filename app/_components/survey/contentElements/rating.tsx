import { memo } from 'react'

export const StarRating = memo(function StarRating({
  rating,
  selectedRating,
  onSelect,
  questionIndex,
  distance,
}: {
  rating: number
  selectedRating: number
  onSelect: (rating: number) => void
  questionIndex: number
  distance: number
}) {
  // 모바일에서는 더 작은 사이즈로 시작
  let currentSize = 8 // 기본 사이즈를 8로 줄임
  if (distance > 0) {
    currentSize += distance
  } else {
    currentSize -= distance
  }

  // 모바일과 데스크톱 사이즈 분리
  const size =
    {
      8: 'h-6 w-6 sm:h-8 sm:w-8', // 기본
      9: 'h-7 w-7 sm:h-10 sm:w-10', // 약간 큰 것
      10: 'h-8 w-8 sm:h-12 sm:w-12', // 가장 큰 것
    }[currentSize] || 'h-6 w-6 sm:h-8 sm:w-8'

  const selectedColorClass =
    distance > 0
      ? 'bg-[#33a474] border-[#33a474] hover:bg-[#33a474]'
      : distance < 0
        ? 'bg-[#88619a] border-[#88619a] hover:bg-[#88619a]'
        : 'bg-gray-400 hover:bg-gray-400 border-gray-400'

  const unselectedColorClass =
    distance > 0
      ? 'bg-white border-[#33a474] hover:bg-[#33a474]'
      : distance < 0
        ? 'border-[#88619a] hover:bg-[#88619a]'
        : 'border-gray-300 hover:bg-gray-300'

  return (
    <div className="m-0.5 flex sm:m-1">
      <input
        type="radio"
        name={`rating-${questionIndex}`}
        id={`rating-${questionIndex}-${rating}`}
        value={rating}
        checked={selectedRating === rating}
        onChange={() => onSelect(rating)}
        className="hidden"
      />
      <label
        htmlFor={`rating-${questionIndex}-${rating}`}
        className={`
          flex ${size} cursor-pointer
          items-center justify-center
          rounded-full
          border-2
          transition-colors duration-200 ease-in-out
          ${
            selectedRating === rating
              ? selectedColorClass
              : unselectedColorClass
          }
          ${
            selectedRating === rating
              ? 'text-white'
              : distance > 0
                ? 'text-green-500'
                : distance < 0
                  ? 'text-purple-500'
                  : 'text-gray-500'
          }
          text-sm sm:text-base
        `}
        aria-label={`Rating ${rating}`}
        aria-hidden="true"
      >
        <span aria-hidden="true" />
      </label>
    </div>
  )
})
