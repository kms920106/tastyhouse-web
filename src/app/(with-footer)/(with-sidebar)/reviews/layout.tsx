import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { MenuButton } from '@/components/layouts/header-parts'

export default function ReviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header height={55} showBorder={false}>
        <HeaderLeft>
          <MenuButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle className="text-white">리뷰</HeaderTitle>
        </HeaderCenter>
      </Header>
      <div className="pb-[70px]">{children}</div>
    </>
  )
}
