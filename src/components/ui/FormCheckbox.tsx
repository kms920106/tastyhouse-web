import { cn } from '@/lib/utils'
import { BsCheckLg } from 'react-icons/bs'

interface FormCheckboxProps {
  name: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function FormCheckbox({ name, checked, onChange }: FormCheckboxProps) {
  return (
    <label className="w-[25px] h-[25px] flex items-center justify-center cursor-pointer">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div
        className={cn(
          'w-[25px] h-[25px] rounded-full flex items-center justify-center',
          checked ? 'bg-main' : 'border-[1.5px] border-[#dddddd] box-border',
        )}
      >
        <BsCheckLg size={20} className={cn(checked ? 'text-white' : 'text-[#dddddd]')} />
      </div>
    </label>
  )
}
