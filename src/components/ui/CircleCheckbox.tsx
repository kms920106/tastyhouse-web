import Image from 'next/image'

interface CircleCheckboxProps {
  checked: boolean
  onChange: (value: boolean) => void
}

export default function CircleCheckbox({ checked, onChange }: CircleCheckboxProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center justify-center shrink-0 w-[25px] h-[25px] cursor-pointer"
    >
      <Image
        src={checked ? '/images/icon-allcheck-on.png' : '/images/icon-allcheck-off.png'}
        alt={checked ? '전체 동의 선택됨' : '전체 동의 선택 안됨'}
        width={25}
        height={25}
      />
    </button>
  )
}
