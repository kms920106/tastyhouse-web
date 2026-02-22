import AppButton, { type AppButtonProps } from '@/components/ui/AppButton'
import { cn } from '@/lib/utils'

export default function AppPrimaryButton({ className, ...props }: AppButtonProps) {
  return <AppButton className={cn('bg-[#a91201] text-white', className)} {...props} />
}
