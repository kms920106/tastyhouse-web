'use client'

import { useRouter } from 'next/navigation'

export default function TermsPage() {
  const router = useRouter()

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
          <h1 className="absolute left-1/2 -translate-x-1/2 text-[17px] font-medium">
            개인정보처리방침
          </h1>
        </div>
      </header>

      {/* 컨텐츠 */}
      <div className="pt-14 pb-20 px-6">
        <div className="space-y-8 py-6">
          {/* 제1조 */}
          <section className="space-y-4">
            <h2 className="text-base font-medium text-gray-900">제1조(목적)</h2>
            <p className="text-[14px] text-gray-700 leading-relaxed">
              본 약관은(이하 &apos;약관&apos;)은 (주)컬쳐히어로(이하 &apos;회사&apos;)에서 제공하는
              온라인 인상의 인터넷 서비스(이하 &apos;서비스&apos;)의 이용과 관련하여 회사와 회원간
              의 권리, 의무 및 책임 사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          {/* 제2조 */}
          <section className="space-y-4">
            <h2 className="text-base font-medium text-gray-900">제2조 (이용약관의 효력 및 변경)</h2>
            <div className="space-y-4 text-[14px] text-gray-700 leading-relaxed">
              <p>
                본 약관은 회사에서 제공하는 서비스의 이용약관으로 이용자에게 공시 함으로써 효력이
                발생하며, 합리적인 사유가 발생할 경우 관련 법령에 위배되지 않는 범위 안에서 개정될
                수 있습니다. 개정된 약관은 온라인 에서 공지함으로써 효력을 발휘하며, 이용자의 권리
                또는 의무 등 중요 한 규정의 개정은 사전에 공지합니다.
              </p>
              <p>
                회사는 합리적인 사유가 발생될 경우에 이 약관을 변경할 수 있으며, 약관이 변경될
                경우에는 지체 없이 이를 공시합니다.
              </p>
              <p>
                이 약관에 동의하는 것은 정기적으로 웹을 방문하여 약관의 변경사항을 확인하는 것에
                동의함을 의미합니다. 변경된 약관에 대한 정보를 알지 못해 발생하는 이용자의 피해는
                회사에서 책임지지 않습니다.
              </p>
              <p>
                회원이 변경된 약관에 동의하지 않을 경우 회사는 해당 회원의 탈퇴(해 지)를 요청할 수
                있으며, 변경된 약관의 효력 발생일로부터 7 일 이후에도 거부의사를 표시하지 아니하고
                서비스를 계속 사용할 경우 약관의 변경사항에 동의한 것으로 간주됩니다.
              </p>
            </div>
          </section>

          {/* 제3조 */}
          <section className="space-y-4">
            <h2 className="text-base font-medium text-gray-900">
              제3조 (약관 외 사항에 대한 준칙)
            </h2>
            <p className="text-[14px] text-gray-700 leading-relaxed">
              이 약관은 회사가 제공하는{' '}
              <span className="underline underline-offset-2">개별서비스</span>에 관한 이용안내(이하
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
