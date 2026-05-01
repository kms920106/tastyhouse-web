import { getPlaceMenus } from '@/actions/place'
import MenuCategoryItem from '@/components/menus/MenuCategoryItem'
import { MenuCategoryItemSkeleton } from '@/components/menus/MenuCategoryItemSkeleton'
import MenuItem from '@/components/menus/MenuItem'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { PAGE_PATHS } from '@/lib/paths'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

interface Props {
  placeId: number
}

export default function PlaceMenuListFetcher({ placeId }: Props) {
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
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.API_FETCH_ERROR} />
  }

  if (!data?.data) {
    return <FetchErrorState message={COMMON_ERROR_MESSAGES.FETCH_ERROR('메뉴')} />
  }

  if (data.data.length === 0) {
    return <div className="py-10 bg-white text-center text-sm text-[#aaaaaa]">메뉴가 없습니다.</div>
  }

  return (
    <>
      {data.data.map((menuCategory) => (
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
