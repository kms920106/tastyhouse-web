import Header, { HeaderCenter, HeaderTitle } from '@/components/layouts/Header'
import Image from 'next/image'
import SignupCompleteConfirmButton from './SignupCompleteConfirmButton'

export default function SignupCompleteSection() {
  return (
    <section className="flex flex-col h-dvh overflow-hidden">
      <Header variant="white" height={55}>
        <HeaderCenter>
          <HeaderTitle>회원가입</HeaderTitle>
        </HeaderCenter>
      </Header>
      <div className="flex-1 flex flex-col items-center justify-center">
        <Image src="/images/icon-logo-150.png" alt="테이스티하우스" width={75} height={87} />
        <div className="flex flex-col items-center text-center mt-[30px]">
          <h2 className="text-[23px] leading-[23px]">회원가입이 완료되었습니다.</h2>
          <p className="mt-[15px] text-sm leading-relaxed text-[#666666]">
            테이스티하우스의 회원이 되신걸 환영합니다.
            <br />
            다양한 서비스들을 만나보세요
          </p>
        </div>
      </div>
      <div className="px-[15px] py-2.5">
        <SignupCompleteConfirmButton />
      </div>
    </section>
  )
}
