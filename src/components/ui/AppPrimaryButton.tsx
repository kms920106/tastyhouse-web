import AppButton, { type AppButtonProps } from '@/components/ui/AppButton'
import { cn } from '@/lib/utils'

export default function AppPrimaryButton({ className, ...props }: AppButtonProps) {
  return (
    <AppButton
      className={cn(
        'w-full h-[50px] text-base leading-[16px] border-0',
        'bg-[#a91201] text-white hover:bg-[#a91201]/90 hover:text-white',
        'disabled:bg-[#a91201]/50 disabled:cursor-not-allowed',
        className,
      )}
      {...props}
    />
  )
}
