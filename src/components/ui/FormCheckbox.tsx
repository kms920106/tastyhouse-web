import Image from 'next/image'

interface Props {
  name: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function FormCheckbox({ name, checked, onChange }: Props) {
  return (
    <label className="w-[20px] h-[20px] flex items-center justify-center cursor-pointer shrink-0">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <Image
        src={checked ? '/images/icon-check-on.png' : '/images/icon-check-off.png'}
        alt={checked ? '선택됨' : '선택 안됨'}
        width={14}
        height={10}
      />
    </label>
  )
}
