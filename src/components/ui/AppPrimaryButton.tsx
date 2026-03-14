import { type AppButtonProps } from '@/components/ui/AppButton'
import AppFullButton from '@/components/ui/AppFullButton'
import { cn } from '@/lib/utils'

export default function AppPrimaryButton({ className, ...props }: AppButtonProps) {
  return (
    <AppFullButton
      className={cn('bg-[#a91201] text-white hover:bg-[#a91201]/90', className)}
      {...props}
    />
  )
}
