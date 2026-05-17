import MenuCategoryItem from '@/components/menus/MenuCategoryItem'
import { MenuCategoryItemSkeleton } from '@/components/menus/MenuCategoryItemSkeleton'
import MenuItem from '@/components/menus/MenuItem'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { usePlaceMenus } from '@/domains/place/place.hook'
import { ProductCategory } from '@/domains/product'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'

interface Props {
  placeId: number
}

export default function PlaceDetailMenuListFetcher({ placeId }: Props) {
  const { data, isLoading, error } = usePlaceMenus(placeId)

  if (isLoading) {
    return Array.from({ length: 2 }).map((_, i) => <MenuCategoryItemSkeleton key={i} />)
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

  const menuCategories: ProductCategory[] = data.data

  return menuCategories.map((menuCategory) => (
    <MenuCategoryItem
      key={menuCategory.categoryName}
      categoryName={menuCategory.categoryName}
      className="border-b border-[#eeeeee] box-border"
    >
      {menuCategory.products.map((menu) => (
        <Link key={menu.id} href={PAGE_PATHS.PRODUCT_DETAIL(placeId)} className="block">
          <MenuItem key={menu.id} menu={menu} />
        </Link>
      ))}
    </MenuCategoryItem>
  ))
}
