import BannerSection from './_components/BannerSection'
import BestPlaceSection from './_components/BestPlaceSection'
import BestReviewSection from './_components/BestReviewSection'
import ChoiceSection from './_components/ChoiceSection'
import QuickReviewLink from './_components/QuickReviewLink'
import TodayDiscountSection from './_components/TodayDiscountSection'

export default async function HomePage() {
  return (
    <>
      {/* 배너 */}
      <BannerSection />

      {/* 베스트 리뷰 */}
      <BestReviewSection />

      {/* 베스트 플레이스 */}
      <BestPlaceSection />

      {/* 오늘의 할인 */}
      <TodayDiscountSection />

      {/* 테하 초이스 */}
      <ChoiceSection />

      {/* 리뷰 작성 */}
      <div className="fixed bottom-18 left-0 right-0 z-[60] [body[data-scroll-locked]_&]:hidden">
        <QuickReviewLink />
      </div>
    </>
  )
}
