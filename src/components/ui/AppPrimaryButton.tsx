'use client'

import AppButton, { type AppButtonProps } from '@/components/ui/AppButton'
import { cn } from '@/lib/utils'

export default function AppPrimaryButton({ className, ...props }: AppButtonProps) {
  return (
    <AppButton
      className={cn('text-white bg-[#a91201]', className)}
      {...props}
    />
  )
}
