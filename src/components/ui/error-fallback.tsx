'use client'

import { cn } from '@/lib/utils'

interface ErrorFallbackProps {
  message?: string
  showRetry?: boolean
  onRetry?: () => void | Promise<void>
  className?: string
}

export default function ErrorFallback({
  message = '데이터를 불러올 수 없습니다',
  showRetry = false,
  onRetry,
  className = '',
}: ErrorFallbackProps) {
  return (
    <div
      className={cn('flex flex-col items-center justify-center py-12 px-4 bg-white rounded-lg', className)}
    >
      <div className="text-center space-y-3">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <p className="text-sm text-gray-600">{message}</p>
        {showRetry && onRetry && (
          <button
            onClick={onRetry}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            다시 시도
          </button>
        )}
      </div>
    </div>
  )
}
