'use client'

import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import {
  useSearchMenusPreview,
  useSearchPlacesPreview,
  useSearchReviewsPreview,
} from '@/domains/search/search.hook'
import SearchEmptyState from './SearchEmptyState'
import SearchMenuListItem from './SearchMenuListItem'
import { SearchMenuListSkeleton } from './SearchMenuListItemSkeleton'
import SearchPlaceListItem from './SearchPlaceListItem'
import { SearchPlaceListSkeleton } from './SearchPlaceListSkeleton'
import SearchReviewGridItem from './SearchReviewGridItem'
import SearchReviewGridSkeleton from './SearchReviewGridSkeleton'

interface Props {
  query: string
}

function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="px-[15px] py-[15px] text-base font-bold leading-[16px] text-[#333333] border-b border-[#eeeeee]">
      {title}
    </h2>
  )
}

export default function SearchAllTabFetcher({ query }: Props) {
  const menus = useSearchMenusPreview(query)
  const reviews = useSearchReviewsPreview(query)
  const places = useSearchPlacesPreview(query)

  const hasNoResults =
    !menus.isLoading &&
    !reviews.isLoading &&
    !places.isLoading &&
    (menus.data?.data?.length ?? 0) === 0 &&
    (reviews.data?.data?.length ?? 0) === 0 &&
    (places.data?.data?.length ?? 0) === 0

  if (hasNoResults) return <SearchEmptyState query={query} />

  return (
    <div className="pb-[90px]">
      {/* 메뉴 섹션 */}
      <section>
        <SectionHeader title="메뉴" />
        {menus.isLoading && <SearchMenuListSkeleton count={3} />}
        {menus.isError && <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('메뉴')} />}
        {!menus.isLoading && !menus.isError && (menus.data?.data?.length ?? 0) > 0 && (
          <ul>
            {(menus.data?.data ?? []).map((item) => (
              <SearchMenuListItem key={item.id} item={item} />
            ))}
          </ul>
        )}
      </section>

      {/* 리뷰 섹션 */}
      <section className="mt-[20px]">
        <SectionHeader title="리뷰" />
        {reviews.isLoading && <SearchReviewGridSkeleton count={9} />}
        {reviews.isError && (
          <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')} />
        )}
        {!reviews.isLoading && !reviews.isError && (reviews.data?.data?.length ?? 0) > 0 && (
          <div className="grid grid-cols-3">
            {(reviews.data?.data ?? []).map((item) => (
              <SearchReviewGridItem key={item.reviewId} item={item} />
            ))}
          </div>
        )}
      </section>

      {/* 플레이스 섹션 */}
      <section className="mt-[20px]">
        <SectionHeader title="플레이스" />
        {places.isLoading && <SearchPlaceListSkeleton count={3} />}
        {places.isError && (
          <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('플레이스')} />
        )}
        {!places.isLoading && !places.isError && (places.data?.data?.length ?? 0) > 0 && (
          <ul className="flex flex-col gap-[10px] px-[15px] py-[15px]">
            {(places.data?.data ?? []).map((item) => (
              <SearchPlaceListItem key={item.id} item={item} />
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
