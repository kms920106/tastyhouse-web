interface SectionHeaderProps {
  title: string
  description: string
}

export default function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <header className="mb-[30px] text-center">
      <h2 className="mb-[15px] text-[23px] leading-[23px] font-nanum-myeongjo-bold font-bold">
        {title}
      </h2>
      <p className="text-sm leading-[14px] text-[#aaaaaa]">{description}</p>
    </header>
  )
}
