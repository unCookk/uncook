import Link from 'next/link'

const PersonaButton = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="flex size-28 items-center justify-center rounded-full bg-neutral-600 text-center text-base font-medium text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-black hover:shadow-xl md:size-40 md:text-xl"
  >
    {label}
  </Link>
)

const personas = [
  {
    href: '/resume?persona=developer',
    label: '개발자',
    position: 'translate-x-24 translate-y-0 md:translate-x-40',
  },
  {
    href: '/resume?persona=hr',
    label: '인사담당자',
    position: '-translate-x-24 translate-y-0 md:-translate-x-40',
  },
  {
    href: '/resume?persona=teamLead',
    label: '팀 리드',
    position: 'translate-x-0 -translate-y-24 md:-translate-y-40',
  },
  {
    href: '/resume?persona=default',
    label: '기타',
    position: 'translate-x-0 translate-y-24 md:translate-y-40',
  },
]

export default function PersonaPage() {
  return (
    <div className="flex h-full items-center justify-center p-4">
      <div className=" text-center">
        <h2 className="mb-2 text-base font-normal text-gray-500">
          안녕하세요 uncook입니다
        </h2>
        <h1 className="mb-12 text-4xl font-bold">당신은 누구십니까?</h1>

        <div className="relative flex size-[31rem] items-center justify-center">
          {personas.map((persona) => {
            return (
              <div
                key={persona.label}
                className={`absolute ${persona.position}`}
              >
                <PersonaButton href={persona.href} label={persona.label} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
