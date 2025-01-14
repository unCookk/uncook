interface ResumeSectionProps {
  title: string
  children: React.ReactNode
}

function ResumeSection({ title, children }: ResumeSectionProps) {
  return (
    <article className="">
      <h2 className="border-b p-3">{title}</h2>
      <section className="flex flex-col gap-4">{children}</section>
    </article>
  )
}

export default ResumeSection
