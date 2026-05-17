'use client'

import BorderedSection from '@/components/ui/BorderedSection'
import FetchErrorState from '@/components/ui/FetchErrorState'
import SectionStack from '@/components/ui/SectionStack'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import {
  useSearchMenusPreview,
  useSearchPlacesPreview,
  useSearchReviewsPreview,
} from '@/domains/search/search.hook'
import Image from 'next/image'
import SearchResultEmptyState from './SearchResultEmptyState'
import SearchResultMenuListItem from './SearchResultMenuListItem'
import { SearchResultMenuListSkeleton } from './SearchResultMenuListSkeleton'
import SearchResultPlaceListItem from './SearchResultPlaceListItem'
import { SearchResultPlaceListSkeleton } from './SearchResultPlaceListSkeleton'
import SearchResultReviewGridItem from './SearchResultReviewGridItem'
import SearchResultReviewGridSkeleton from './SearchResultReviewGridSkeleton'

interface Props {
  query: string
}

function SectionHeader({ title }: { title: string }) {
  return (
    <>
      <div className="flex items-center gap-[9px] mb-5">
        <h2 className="text-base leading-[16px] font-bold">{title}</h2>
        <Image src="/images/icon-nav-right.svg" alt="" width={8} height={14} />
      </div>
    </>
  )
}

export default function SearchResultAll({ query }: Props) {
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

  if (hasNoResults) return <SearchResultEmptyState query={query} />

  return (
    <SectionStack>
      {/* 메뉴 섹션 */}
      <BorderedSection>
        <div className="px-[15px] py-[30px]">
          <SectionHeader title="메뉴" />
          {menus.isLoading && <SearchResultMenuListSkeleton count={3} />}
          {menus.isError && <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('메뉴')} />}
          {!menus.isLoading && !menus.isError && (menus.data?.data?.length ?? 0) > 0 && (
            <ul>
              {(menus.data?.data ?? []).map((item) => (
                <SearchResultMenuListItem key={item.id} item={item} />
              ))}
            </ul>
          )}
        </div>
      </BorderedSection>

      {/* 리뷰 섹션 */}
      <BorderedSection>
        <div className="px-[15px] py-[30px]">
          <SectionHeader title="리뷰" />
          {reviews.isLoading && <SearchResultReviewGridSkeleton count={9} />}
          {reviews.isError && (
            <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('리뷰')} />
          )}
          {!reviews.isLoading && !reviews.isError && (reviews.data?.data?.length ?? 0) > 0 && (
            <div className="grid grid-cols-3">
              {(reviews.data?.data ?? []).map((item) => (
                <SearchResultReviewGridItem key={item.reviewId} item={item} />
              ))}
            </div>
          )}
        </div>
      </BorderedSection>

      {/* 플레이스 섹션 */}
      <BorderedSection>
        <div className="px-[15px] py-[30px]">
          <SectionHeader title="플레이스" />
          {places.isLoading && <SearchResultPlaceListSkeleton count={3} />}
          {places.isError && (
            <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('플레이스')} />
          )}
          {!places.isLoading && !places.isError && (places.data?.data?.length ?? 0) > 0 && (
            <ul className="flex flex-col gap-[10px] px-[15px] py-[15px]">
              {(places.data?.data ?? []).map((item) => (
                <SearchResultPlaceListItem key={item.id} item={item} />
              ))}
            </ul>
          )}
        </div>
      </BorderedSection>
    </SectionStack>
  )
}
