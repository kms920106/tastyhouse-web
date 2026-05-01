import MyPageProfile from './MyPageProfile'
import MyPageHeader from './MyPageHeader'
import MyPageTabs from './MyPageTabs'

export type MyPageTabValue = 'reviews' | 'payments' | 'bookmarks'

interface Props {
  initialTab: MyPageTabValue
}

export default function MyPageContent({ initialTab }: Props) {
  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <div className="flex flex-col h-[50dvh]">
        <MyPageHeader />
        <MyPageProfile />
      </div>
      <MyPageTabs initialTab={initialTab} />
    </div>
  )
}
