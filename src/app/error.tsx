'use client'

import AppPrimaryButton from '@/components/ui/AppPrimaryButton'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { useEffect } from 'react'
import { MdRefresh } from 'react-icons/md'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: Props) {
  useEffect(() => {
    import('@/lib/logger-browser').then(({ default: browserLogger }) => {
      browserLogger.error(
        {
          type: 'route_error_boundary',
          digest: error.digest,
        },
        '[CLIENT ERROR] %s',
        error.message,
      )
    })
  }, [error])

  return (
    <section className="flex flex-col min-h-screen">
      <div className="flex-1 flex items-center justify-center">
        <FetchErrorState message="예기치 않은 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요." />
      </div>
      <div className="p-4">
        <AppPrimaryButton onClick={reset}>
          <MdRefresh size={20} />
          다시 시도
        </AppPrimaryButton>
      </div>
    </section>
  )
}
