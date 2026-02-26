import MenuCategoryItem, { MenuCategoryItemSkeleton } from '@/components/menus/MenuCategoryItem'
import MenuItem from '@/components/menus/MenuItem'
import ErrorMessage from '@/components/ui/ErrorMessage'
import type { MenuCategory } from '@/domains/place'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { PAGE_PATHS } from '@/lib/paths'
import { getPlaceMenus } from '@/services/place'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

interface PlaceMenuListFetcherProps {
  placeId: number
}

export default function PlaceMenuListFetcher({ placeId }: PlaceMenuListFetcherProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['place', placeId, 'place-detail-menus'],
    queryFn: () => getPlaceMenus(placeId),
  })

  if (isLoading) {
    return (
      <>
        {Array.from({ length: 2 }).map((_, i) => (
          <MenuCategoryItemSkeleton key={i} />
        ))}
      </>
    )
  }

  if (error) {
    return (
      <ErrorMessage message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} className="py-10 bg-white" />
    )
  }

  if (!data?.data) {
    return (
      <ErrorMessage
        message={COMMON_ERROR_MESSAGES.FETCH_ERROR('메뉴')}
        className="py-10 bg-white"
      />
    )
  }

  const menuCategories: MenuCategory[] = data.data

  if (menuCategories.length === 0) {
    return <div className="py-10 bg-white text-center text-sm text-[#aaaaaa]">메뉴가 없습니다.</div>
  }

  return (
    <>
      {menuCategories.map((menuCategory) => (
        <MenuCategoryItem
          key={menuCategory.categoryName}
          categoryName={menuCategory.categoryName}
          className="border-b border-[#eeeeee] box-border"
        >
          {menuCategory.menus.map((menu) => (
            <Link
              key={menu.id}
              href={PAGE_PATHS.PLACE_MENU_DETAIL(placeId, menu.id)}
              className="block"
            >
              <MenuItem key={menu.id} menu={menu} />
            </Link>
          ))}
        </MenuCategoryItem>
      ))}
    </>
  )
}
