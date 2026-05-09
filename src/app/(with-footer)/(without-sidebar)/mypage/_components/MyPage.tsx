import MyPageProfile from './MyPageProfile'
import MyPageHeader from './MyPageHeader'
import MyPageTabs from './MyPageTabs'

export type MyPageTabValue = 'reviews' | 'payments' | 'bookmarks'

interface Props {
  initialTab: MyPageTabValue
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
