'use client'

import { useRouter } from 'next/navigation'

export default function CustomerCenterPage() {
  const router = useRouter()

  const handlePhoneCall = () => {
    window.location.href = 'tel:1234-5678'
  }

  const handleKakaoTalk = () => {
    // TODO: 카카오톡 문의 링크 연결
    console.log('카카오톡 문의')
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-10">
        <div className="relative flex items-center h-14 px-4">
          <button onClick={() => router.back()} className="p-2 -ml-2" aria-label="뒤로가기">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-medium">고객센터</h1>
        </div>
      </header>

      {/* 컨텐츠 */}
      <div className="pt-14 pb-20">
        {/* 전화번호 섹션 */}
        <div className="flex flex-col items-center justify-center px-6 pt-12 pb-8">
          <h2 className="text-[32px] font-medium text-gray-900 mb-6">1234-5678</h2>
          <div className="text-center space-y-1">
            <p className="text-[15px] text-gray-600">평일 09:00 ~ 18:00 (점심시간 13:00 ~ 14:00)</p>
            <p className="text-[15px] text-gray-600">(토/일/공휴일 휴무)</p>
          </div>
        </div>

        {/* 전화 문의 버튼 */}
        <div className="px-6 mb-16">
          <button
            onClick={handlePhoneCall}
            className="w-full bg-[#333333] text-white text-base font-medium py-4 rounded-lg active:bg-[#222222] transition-colors"
          >
            전화 문의
          </button>
        </div>

        {/* 고객센터 이용 안내 */}
        <div className="px-6 mb-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">고객센터 이용 안내</h3>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="text-[14px] text-gray-600 leading-relaxed">
                • 이전 고객님의 상담이 길어질 경우 통화가 지연될 수 있습니다.
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-[14px] text-gray-600 leading-relaxed">
                • 전화가 지연될 경우 카카오톡 문의를 통해 연락처와 통화가 가능한 시간대를 남겨주시면
                확인 후 바로 연락을 드립니다.
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-[14px] text-gray-600 leading-relaxed">
                • 카카오톡 문의를 이용해주시면 빠른 답변이 가능합니다.
              </span>
            </div>
          </div>
        </div>

        {/* 카카오톡 문의 버튼 */}
        <div className="px-6">
          <button
            onClick={handleKakaoTalk}
            className="w-full bg-[#FEE500] text-gray-900 text-base font-medium py-4 rounded-lg active:bg-[#F5DC00] transition-colors flex items-center justify-center gap-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.477 3 2 6.477 2 10.75c0 2.746 1.803 5.163 4.52 6.545-.175.66-.623 2.336-.709 2.699-.103.439.161.433.339.315.141-.094 2.25-1.515 3.103-2.094.563.078 1.146.119 1.747.119 5.523 0 10-3.477 10-7.75S17.523 3 12 3z" />
            </svg>
            카카오톡 문의
          </button>
        </div>
      </div>
    </div>
  )
}
