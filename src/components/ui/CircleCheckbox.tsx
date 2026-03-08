import { cn } from '@/lib/utils'
import { BsCheckLg } from 'react-icons/bs'

interface CircleCheckboxProps {
  checked: boolean
  onChange: (value: boolean) => void
}

export default function CircleCheckbox({ checked, onChange }: CircleCheckboxProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
    >
      <div
        className={cn(
          'w-[25px] h-[25px] rounded-full flex items-center justify-center',
          checked ? 'bg-main' : 'border-[1.5px] border-[#dddddd] box-border',
        )}
      >
        <BsCheckLg size={20} className={cn(checked ? 'text-white' : 'text-[#dddddd]')} />
      </div>
    </button>
  )
}
