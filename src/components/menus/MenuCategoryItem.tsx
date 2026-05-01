import { cn } from '@/lib/utils'

interface Props {
  categoryName: string
  children: React.ReactNode
  className?: string
}

export default function MenuCategoryItem({
  categoryName,
  children,
  className = '',
}: Props) {
  return (
    <div className={cn('pt-[30px]', className)}>
      <h3 className="mb-[5px] text-base leading-[16px] font-bold">{categoryName}</h3>
      <div className="divide-y divide-[#eeeeee]">{children}</div>
    </div>
  )
}
