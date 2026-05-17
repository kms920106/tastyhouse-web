import ProductItem from '@/components/products/ProductItem'
import type { Product } from '@/domains/product/product.model'
import { PAGE_PATHS } from '@/lib/paths'
import Link from 'next/link'

interface Props {
  item: Product
}

export default function SearchResultMenuListItem({ item }: Props) {
  return (
    <Link href={PAGE_PATHS.PRODUCT_DETAIL(item.id)} className="block">
      <ProductItem menu={item} />
    </Link>
  )
}
