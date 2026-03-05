import AppButton, { type AppButtonProps } from '@/components/ui/AppButton'
import { cn } from '@/lib/utils'

export default function AppPrimaryButton({ className, ...props }: AppButtonProps) {
  return (
    <AppButton
      className={cn(
        'w-full h-[50px] bg-[#a91201] text-base leading-[16px] text-white hover:bg-[#a91201]/90 hover:text-white border-0',
        className,
      )}
      {...props}
    />
  )
}
