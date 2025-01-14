import ResumeCapability from './resume-capability'
import ResumeIntroduce from './resume-introduce'

import PersonaType from '#/types/persona'
import SectionType from '#/types/resume'
import { ScrollArea } from '#/components/ui/scroll-area'

interface ResumeProps {
  persona?: PersonaType
}

const sectionOrder: Record<PersonaType, SectionType[]> = {
  teamLead: ['problemSolving', 'communication', 'technicalSkills'],
  developer: ['technicalSkills', 'communication', 'problemSolving'],
  hr: ['communication', 'problemSolving', 'technicalSkills'],
  default: ['problemSolving', 'communication', 'technicalSkills'],
}

function Resume({ persona }: ResumeProps) {
  const currentOrder = persona ? sectionOrder[persona] : sectionOrder.default

  return (
    <article className="prose-sm size-full !max-w-full rounded-lg border shadow md:prose ">
      <ScrollArea className="size-full">
        <section className="p-10">
          <ResumeIntroduce />
          <ResumeCapability order={currentOrder} />
        </section>
      </ScrollArea>
    </article>
  )
}

export default Resume
