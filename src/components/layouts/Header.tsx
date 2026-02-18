'use client'

import { cn } from '@/lib/utils'
import { createContext, useContext } from 'react'

interface HeaderContextValue {
  variant: 'primary' | 'white'
}

const HeaderContext = createContext<HeaderContextValue | null>(null)

export function useHeaderContext() {
  const context = useContext(HeaderContext)
  if (!context) {
    throw new Error('Header 컴포넌트 내부에서만 사용할 수 있습니다.')
  }
  return context
}

interface HeaderProps {
  children: React.ReactNode
  variant?: 'primary' | 'white'
  height: number
  showBorder?: boolean
}

interface HeaderSlotProps {
  children: React.ReactNode
}

export function HeaderLeft({ children }: HeaderSlotProps) {
  return (
    <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
      {children}
    </div>
  )
}

export function HeaderCenter({ children }: HeaderSlotProps) {
  return <div className="absolute left-1/2 -translate-x-1/2">{children}</div>
}

export function HeaderRight({ children }: HeaderSlotProps) {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center gap-5 pr-[15px]">
      {children}
    </div>
  )
}

interface HeaderTitleProps {
  children: React.ReactNode
  className?: string
}

export function HeaderTitle({ children, className }: HeaderTitleProps) {
  return <h1 className={cn('text-[17px] leading-[17px]', className)}>{children}</h1>
}

export default function Header({
  children,
  variant = 'primary',
  height,
  showBorder = true,
}: HeaderProps) {
  const isPrimary = variant === 'primary'

  return (
    <HeaderContext.Provider value={{ variant }}>
      <header
        className={`relative flex items-center ${showBorder ? 'border-b border-[#eeeeee] box-border' : ''} ${isPrimary ? 'bg-main text-white' : 'bg-white text-black'}`}
        style={{ height: `${height}px` }}
      >
        {children}
      </header>
    </HeaderContext.Provider>
  )
}
