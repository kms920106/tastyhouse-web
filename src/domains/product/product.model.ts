export interface Product {
  id: number
  name: string
  placeName: string
  imageUrl: string
  originalPrice: number
  discountPrice: number
  discountRate: number
}

export interface ProductMenu {
  id: number
  imageUrl: string
  spiciness: number | null
  name: string
  originalPrice: number
  discountPrice: number
  discountRate: number | null
  rating: number | null
  reviewCount: number | null
  isRepresentative: boolean | null
}

export interface ProductMenuCategory {
  categoryName: string
  products: ProductMenu[]
}

export interface ProductMenuOption {
  id: number
  name: string
  additionalPrice: number
  isSoldOut: boolean
}

export interface ProductMenuOptionGroup {
  id: number
  name: string
  description: string | null
  isRequired: boolean
  isMultipleSelect: boolean
  minSelect: number
  maxSelect: number
  isCommon: boolean
  options: ProductMenuOption[]
}
