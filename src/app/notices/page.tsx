import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import NoticeList from './_components/NoticeList'

export default function NoticePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>공지사항</HeaderTitle>
        </HeaderCenter>
      </Header>
      <div className="pt-[18px] px-0">
        <NoticeList />
      </div>
    </div>
  )
}
