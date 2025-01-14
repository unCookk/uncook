'use client'
import { AiFillAliwangwang } from 'react-icons/ai'

import { ScrollArea } from '#/components/ui/scroll-area'
import surveyModalStore from '#/store/survey-store'
import { useStore } from '#/store/utils/use-store'

function DropUp({ children }: { children: React.ReactNode }) {
  const [isOpen, setToggle] = useStore(surveyModalStore)

  return (
    <>
      {/* 오버레이 - PC에서는 투명하게 */}
      {isOpen && (
        <div
          role="button"
          tabIndex={0}
          className="fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 sm:bg-transparent"
          onClick={() => setToggle(false)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === 'Space') {
              setToggle(false)
            }
          }}
        />
      )}

      {/* 드롭업 메뉴 컨테이너 */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 sm:bottom-28 sm:left-auto sm:right-8 ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className="relative">
          <div
            className={`
          w-full origin-bottom rounded-t-2xl border border-gray-200 bg-white shadow-xl transition-all duration-300 ease-out
          sm:absolute sm:bottom-0 sm:right-0 sm:w-[500px] sm:max-w-3xl sm:rounded-2xl sm:border sm:border-gray-200 sm:ring-1 sm:ring-black/5
          ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 sm:translate-y-4 sm:scale-95'}
        `}
          >
            {/* 모바일 드래그 핸들 */}
            <div className="flex h-6 items-center justify-center rounded-t-2xl sm:hidden">
              <div className="h-1 w-12 rounded-full bg-gray-300" />
            </div>

            <ScrollArea className="h-[80dvh] sm:h-[calc(100dvh-240px)]">
              <div className="p-4">{children}</div>
            </ScrollArea>
          </div>
        </div>
      </div>

      {/* 설문 버튼 */}
      <button
        onClick={() => setToggle((prev) => !prev)}
        className="group fixed bottom-4 right-4 z-50 flex size-14 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl sm:bottom-8 sm:size-16"
        aria-label="설문 열기"
      >
        <div className="rounded-full bg-gradient-to-br from-lime-700 to-lime-800 p-2.5 transition-all duration-300 ease-in-out group-hover:from-lime-600 group-hover:to-lime-700 sm:p-3">
          <AiFillAliwangwang className="size-8 text-white sm:size-9" />
        </div>
      </button>
    </>
  )
}

export default DropUp
