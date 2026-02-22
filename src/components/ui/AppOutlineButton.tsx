import AppButton, { type AppButtonProps } from '@/components/ui/AppButton'
import { cn } from '@/lib/utils'

export default function AppOutlineButton({ className, ...props }: AppButtonProps) {
  return (
    <AppButton
      className={cn(
        'border-[#666666] disabled:border-[#eeeeee] disabled:text-[#aaaaaa] disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    />
  )
}
