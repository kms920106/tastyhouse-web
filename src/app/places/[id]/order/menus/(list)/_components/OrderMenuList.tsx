import MenuCategoryItem from '@/components/menus/MenuCategoryItem'
import MenuItem from '@/components/menus/MenuItem'
import BorderedSection from '@/components/ui/BorderedSection'
import ErrorStateSection from '@/components/ui/ErrorStateSection'
import { placeRepository } from '@/domains/place/place.repository'
import { ProductMenuCategory } from '@/domains/product'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import { PAGE_PATHS } from '@/lib/paths'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface Props {
  placeId: number
}

export default async function OrderMenuList({ placeId }: Props) {
  const { error, data } = await placeRepository.getPlaceMenus(placeId)

  if (error || !data) {
    return <ErrorStateSection message={COMMON_ERROR_MESSAGES.FETCH_ERROR('메뉴')} />
  }

  const menuCategories: ProductMenuCategory[] = data

  return (
    <>
      {menuCategories.map((menuCategory, index) => (
        <BorderedSection
          key={menuCategory.categoryName}
          className={cn('px-[15px]', index === 0 && '!border-t-0')}
        >
          <MenuCategoryItem categoryName={menuCategory.categoryName}>
            {menuCategory.menus.map((menu) => (
              <Link
                key={menu.id}
                href={PAGE_PATHS.ORDER_MENU_DETAIL(placeId, menu.id)}
                className="block"
              >
                <MenuItem key={menu.id} menu={menu} />
              </Link>
            ))}
          </MenuCategoryItem>
        </BorderedSection>
      ))}
    </>
  )
}
