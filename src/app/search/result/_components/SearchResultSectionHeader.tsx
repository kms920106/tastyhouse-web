import Image from 'next/image'

interface Props {
  title: string
}

export default function SearchResultSectionHeader({ title }: Props) {
  return (
    <div className="flex items-center gap-[9px] mb-5">
      <h2 className="text-base leading-[16px] font-bold">{title}</h2>
      <Image src="/images/icon-nav-right.svg" alt="" width={8} height={14} style={{ width: 8, height: 14 }} />
    </div>
  )
}
