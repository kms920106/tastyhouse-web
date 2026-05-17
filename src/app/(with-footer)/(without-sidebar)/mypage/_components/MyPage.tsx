import MyPageProfile from './MyPageProfile'
import MyPageHeader from './MyPageHeader'
import MyPageTabs from './MyPageTabs'
import type { MyPageTab } from './MyPageTabs'

interface Props {
  initialTab: MyPageTab
  isLoggedIn: boolean
}

export default function MyPage({ initialTab, isLoggedIn }: Props) {
  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <div className="flex flex-col h-[50dvh]">
        <MyPageHeader />
        <MyPageProfile isLoggedIn={isLoggedIn} />
      </div>
      <MyPageTabs initialTab={initialTab} isLoggedIn={isLoggedIn} />
    </div>
  )
}
