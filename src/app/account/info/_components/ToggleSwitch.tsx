'use client'

import Image from 'next/image'

interface Props {
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function ToggleSwitch({ checked, onChange }: Props) {
  return (
    <button type="button" onClick={() => onChange(!checked)} className="shrink-0">
      <Image
        src={checked ? '/images/icon-toggle-on.png' : '/images/icon-toggle-off.png'}
        alt={checked ? '켜짐' : '꺼짐'}
        width={43}
        height={24}
      />
    </button>
  )
}
