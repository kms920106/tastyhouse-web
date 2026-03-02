'use client'

import { MdRefresh } from 'react-icons/md'

interface GlobalErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalErrorPage({ error, reset }: GlobalErrorPageProps) {
  return (
    <html lang="ko">
      <body>
        <section className="flex flex-col min-h-screen">
          <div className="flex-1 flex items-center justify-center">
            <div className="w-full text-sm leading-relaxed text-[#999999] text-center whitespace-pre-line">
              {error.message || '심각한 오류가 발생했습니다.\n페이지를 새로고침 해 주세요.'}
            </div>
          </div>
          <div className="p-4">
            <button
              onClick={reset}
              className="w-full h-[50px] flex items-center justify-center gap-2 bg-main text-white text-base"
            >
              <MdRefresh size={20} />
              다시 시도
            </button>
          </div>
        </section>
      </body>
    </html>
  )
}
