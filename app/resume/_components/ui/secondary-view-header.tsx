import { IoArrowBackOutline } from 'react-icons/io5'
import { memo } from 'react'

interface SecondaryViewHeaderProps {
  title: string
  onClose: () => void
}

const CloseIcon = memo(IoArrowBackOutline)
function SecondaryViewHeader({ title, onClose }: SecondaryViewHeaderProps) {
  return (
    <div className="flex h-14 w-full items-center gap-3 rounded-t-lg bg-neutral-600 pl-6">
      <CloseIcon
        className="size-6 cursor-pointer text-white"
        onClick={onClose}
      />
      <h2 className="text-sm text-white md:text-base">{title}</h2>
    </div>
  )
}

export default memo(SecondaryViewHeader)
