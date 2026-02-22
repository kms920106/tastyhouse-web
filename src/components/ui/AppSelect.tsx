import { cn } from '@/lib/utils'
import Image from 'next/image'
import * as React from 'react'

export interface AppSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export default function AppSelect({ className, children, ...props }: AppSelectProps) {
  return (
    <div className="relative w-full">
      <select
        className={cn(
          'w-full h-[50px] pl-4 pr-10 text-sm leading-[14px] text-[#333333] border border-[#666666] box-border appearance-none bg-white focus:outline-none',
          className,
        )}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2">
        <Image
          src="/images/icon-nav-bottom-gray.png"
          alt="select arrow"
          width={12}
          height={8}
          className="select-none"
        />
      </div>
    </div>
  )
}
