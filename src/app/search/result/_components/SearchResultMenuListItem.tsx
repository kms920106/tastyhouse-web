import ProductItem from '@/components/products/ProductItem'
import type { Product } from '@/domains/product/product.model'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'

interface Props {
  product: Product
}

export default function SearchResultMenuListItem({ product }: Props) {
  return (
    <Link href={PAGE_PATHS.PRODUCT_DETAIL(product.id)} className="block">
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
  )
}
