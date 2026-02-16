'use client'

import Link from 'next/link'

export default function SettingPage() {
  const menuItems = [
    // { id: 'e-gift', label: 'e-gift 등록', href: '/setting/e-gift' },
    { id: 'coupons', label: '쿠폰', href: '/coupons' },
    { id: 'event', label: '이벤트', href: '/events' },
    { id: 'point', label: '포인트 내역', href: '/point' },
    { id: 'custom-info', label: '맛집제보', href: '/places/new' },
    { id: 'bank-info', label: '등급안내', href: '/grade' },
    { id: 'notice', label: '공지사항', href: '/setting/notice' },
    { id: 'faq', label: '자주하는 질문', href: '/setting/faq' },
    { id: 'customer-center', label: '고객센터', href: '/setting/customer-center' },
    { id: 'ad-proposal', label: '광고 및 제휴', href: '/setting/ad-proposal' },
    { id: 'version', label: '버그제보', href: '/setting/bug-report' },
    { id: 'terms', label: '이용약관', href: '/setting/terms' },
    { id: 'privacy-policy', label: '개인정보취급방침', href: '/setting/privacy-policy' },
    { id: 'privacy-settings', label: '개인정보 수정', href: '/setting/privacy-settings' },
    { id: 'password-change', label: '비밀번호 변경', href: '/setting/password-change' },
    { id: 'logout', label: '로그아웃', href: '#', isLogout: true },
  ]

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      // TODO: 로그아웃 로직 구현
      console.log('로그아웃')
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
        <div className="flex items-center h-14 px-4">
          <button onClick={() => window.history.back()} className="p-2 -ml-2" aria-label="뒤로가기">
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
          <h1 className="flex-1 text-center text-[17px] font-semibold -ml-10">설정</h1>
        </div>
      </header>

      {/* 메뉴 리스트 */}
      <div className="pt-14">
        {menuItems.map((item) =>
          item.isLogout ? (
            <button
              key={item.id}
              onClick={handleLogout}
              className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <span className="text-[15px] text-black">{item.label}</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          ) : (
            <Link
              key={item.id}
              href={item.href}
              className="w-full flex items-center justify-between px-6 py-4 border-b border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors"
            >
              <span className="text-[15px] text-black">{item.label}</span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </Link>
          ),
        )}
      </div>
    </div>
  )
}
