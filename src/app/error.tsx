'use client'

import AppButton from '@/components/ui/AppButton'
import ErrorMessage from '@/components/ui/ErrorMessage'
import { MdRefresh } from 'react-icons/md'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <section className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center">
        <ErrorMessage message={error.message || '예기치 않은 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.'} />
      </div>
      <div className="p-4">
        <AppButton onClick={reset} className="bg-main w-full">
          <MdRefresh size={20} />
          다시 시도
        </AppButton>
      </div>
    </section>
  )
}
