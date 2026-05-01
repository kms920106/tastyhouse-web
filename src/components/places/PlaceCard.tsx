import { PAGE_PATHS } from '@/lib/paths'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import * as React from 'react'

interface Props {
  placeId: number
  children: React.ReactNode
  className?: string
}

export function PlaceCard({ placeId, children, className }: Props) {
  return (
    <Link
      href={PAGE_PATHS.PLACE_DETAIL(placeId)}
      className={cn('group block overflow-hidden', className)}
    >
      {children}
    </Link>
  )
}

export function PlaceCardContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

export function PlaceCardHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('flex items-center justify-between mb-[9px]', className)} {...props}>
      {children}
    </div>
  )
}

export function PlaceCardStation({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cn('text-xs leading-[12px] text-[#999999] truncate', className)} {...props}>
      {children}
    </span>
  )
}

export function PlaceCardName({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn('text-base leading-[16px] truncate', className)} {...props}>
      {children}
    </h3>
  )
}

export { PlaceCardImage } from './PlaceCardImage'
export { PlaceCardRating } from './PlaceCardRating'
export { PlaceCardStats } from './PlaceCardStats'
export { PlaceCardTags } from './PlaceCardTags'
