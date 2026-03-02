import { cn } from '@/lib/utils'
import { Textarea } from './shadcn/textarea'

type AppTextareaProps = React.ComponentProps<'textarea'> & {
  error?: boolean
}

export default function AppTextarea({ className, error, ...props }: AppTextareaProps) {
  return (
    <Textarea
      className={cn(
        'field-sizing-fixed w-full px-[16px] py-[19px] text-sm leading-[14px] border border-[#eeeeee] box-border bg-white shadow-none rounded-none resize-none focus-visible:ring-0 focus-visible:border-[#666666] placeholder:text-[#999999] text-[#333333]',
        error && 'border-[#bc4040] focus-visible:border-[#bc4040]',
        className,
      )}
      {...props}
    />
  )
}
