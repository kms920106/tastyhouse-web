'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import TextContent from './TextContent'

const estimateIsClamped = (text: string | undefined, maxLines: number) => {
  if (!text) return false
  const charsPerLine = 20
  return text.length > charsPerLine * maxLines
}

interface MoreButtonProps {
  onClick: () => void
  className?: string
}

export function MoreButton({ onClick, className = '' }: MoreButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn('absolute bottom-1 right-0 text-sm leading-[14px] text-[#cccccc] bg-white pl-1', className)}
    >
      <span className="text-black">... </span>
      <span className="cursor-pointer">더보기</span>
    </button>
  )
}

interface ClampedTextProps {
  text: string
  maxLines?: number
  className?: string
  href?: string
  MoreButton?: React.ReactElement<{ onClick: () => void }>
}

export default function ClampedText({
  text,
  maxLines = 5,
  className = '',
  href,
  MoreButton: customMoreButton,
}: ClampedTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null)
  const [isClamped, setIsClamped] = useState(() => estimateIsClamped(text, maxLines))
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    const checkClamped = () => {
      setIsClamped(element.scrollHeight > element.clientHeight)
    }

    checkClamped()

    const observer = new ResizeObserver(checkClamped)
    observer.observe(element)

    return () => observer.disconnect()
  }, [text])

  const lineHeight = 23
  const maxHeight = lineHeight * maxLines

  const textContent = (
    <TextContent
      innerRef={textRef}
      text={text}
      className={className}
      style={!isExpanded ? { maxHeight: `${maxHeight}px`, overflow: 'hidden' } : undefined}
    />
  )

  const moreButtonElement = customMoreButton || <MoreButton onClick={() => setIsExpanded(true)} />

  return (
    <div className="relative">
      {href ? <Link href={href}>{textContent}</Link> : textContent}
      {isClamped && !isExpanded && moreButtonElement}
    </div>
  )
}
