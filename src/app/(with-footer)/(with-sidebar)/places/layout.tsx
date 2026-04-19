import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { MenuButton } from '@/components/layouts/header-parts'

export default function PlaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header height={55} showBorder={false}>
        <HeaderLeft>
          <MenuButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle className="text-white">플레이스</HeaderTitle>
        </HeaderCenter>
      </Header>
      <div className="min-h-screen px-[15px] py-[30px] pb-[90px]">{children}</div>
    </>
  )
}
