import Image from 'next/image'

interface Props {
  icon: string
  name: string
}

export default function MenuGridItem({ icon, name }: Props) {
  return (
    <>
      <div className="relative w-14 h-8">
        {icon && <Image src={icon} alt={name} fill style={{ objectFit: 'contain' }} />}
      </div>
      <span className="text-[13px] text-[#333333]">{name}</span>
    </>
  )
}
