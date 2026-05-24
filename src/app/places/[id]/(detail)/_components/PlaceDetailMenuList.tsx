import ProductCategoryGroup from '@/components/products/ProductCategoryGroup'
import { ProductCategoryGroupSkeleton } from '@/components/products/ProductCategoryGroupSkeleton'
import ProductItem from '@/components/products/ProductItem'
import FetchErrorState from '@/components/ui/FetchErrorState'
import { COMMON_ERROR_MESSAGES } from '@/constants/errors'
import { usePlaceMenus } from '@/domains/place/place.hook'
import { ProductCategory } from '@/domains/product'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'

interface Props {
  placeId: number
}

export default function PlaceDetailMenuList({ placeId }: Props) {
  const { data, isLoading, error } = usePlaceMenus(placeId)

  if (isLoading) {
    return Array.from({ length: 2 }).map((_, i) => <ProductCategoryGroupSkeleton key={i} />)
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
    <ProductCategoryGroup
      key={menuCategory.categoryName}
      categoryName={menuCategory.categoryName}
      className="border-b border-[#eeeeee] box-border"
    >
      {menuCategory.products.map((product) => (
        <Link key={product.id} href={PAGE_PATHS.PRODUCT_DETAIL(placeId)} className="block">
          <ProductItem
            imageUrl={product.imageUrl}
            spiciness={product.spiciness}
            name={product.name}
            originalPrice={product.originalPrice}
            discountPrice={product.discountPrice}
            discountRate={product.discountRate}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        </Link>
      ))}
    </ProductCategoryGroup>
  ))
}
