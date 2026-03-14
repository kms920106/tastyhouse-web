'use client'

import { Button, buttonVariants } from '@/components/ui/shadcn/button'
import { cn } from '@/lib/utils'
import { type VariantProps } from 'class-variance-authority'
import * as React from 'react'

export interface AppButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export default function AppButton({
  className,
  variant = 'outline',
  size,
  asChild,
  ...props
}: AppButtonProps) {
  return (
    <Button
      // className={cn('m-0 p-0 rounded-none shadow-none cursor-pointer', className)}
      className={cn('p-0 rounded-none shadow-none cursor-pointer', className)}
      variant={variant}
      size={size}
      asChild={asChild}
      {...props}
    />
  )
}
