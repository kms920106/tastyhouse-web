import ProductCategoryGroup from '@/components/products/ProductCategoryGroup'
import ProductItem from '@/components/products/ProductItem'
import BorderedSection from '@/components/ui/BorderedSection'
import ErrorStateSection from '@/components/ui/ErrorStateSection'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { placeRepository } from '@/domains/place/place.repository'
import { ProductCategory } from '@/domains/product'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'

interface Props {
  placeId: number
}

export default async function PlaceOrderMenuList({ placeId }: Props) {
  const { error, data } = await placeRepository.getPlaceProducts(placeId)

  if (error || !data) {
    return <ErrorStateSection message={COMMON_ERROR_MESSAGES.FETCH_ERROR('메뉴')} />
  }

  const menuCategories: ProductCategory[] = data

  return menuCategories.map((menuCategory) => (
    <BorderedSection key={menuCategory.categoryName}>
      <div className="px-[15px]">
        <ProductCategoryGroup categoryName={menuCategory.categoryName}>
          {menuCategory.products.map((menu) => (
            <Link
              key={menu.id}
              href={PAGE_PATHS.ORDER_MENU_DETAIL(placeId, menu.id)}
              className="block"
            >
              <ProductItem menu={menu} />
            </Link>
          ))}
        </ProductCategoryGroup>
      </div>
    </BorderedSection>
  ))
}
