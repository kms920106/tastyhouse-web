import GuestLoginBanner from '@/components/ui/GuestLoginBanner'
import { RankPeriod } from '@/domains/rank'
import { getIsLoggedIn } from '@/lib/auth-config'
import { Suspense } from 'react'
import MyRankInfo from './MyRankInfo'
import { MyRankInfoSkeleton } from './MyRankInfoSkeleton'

export default async function MyRankFixedSection({ rankPeriod }: { rankPeriod: RankPeriod }) {
  const isLoggedIn = await getIsLoggedIn()

  return (
    <section className="fixed left-0 right-0 bottom-[72px] w-full">
      <div className="flex justify-between items-center py-[15px] pl-8 pr-[35px] bg-[#eeeeee] border border-[#cccccc] box-border rounded-[2.5px]">
        {isLoggedIn ? (
          <Suspense fallback={<MyRankInfoSkeleton />}>
            <MyRankInfo rankPeriod={rankPeriod} />
          </Suspense>
        ) : (
          <div className="w-full">
            <GuestLoginBanner
              title="내 랭킹을 확인하려면?"
              description="로그인 후 랭킹을 확인해 보세요"
            />
          </div>
        )}
      </div>
    </section>
  )
}
