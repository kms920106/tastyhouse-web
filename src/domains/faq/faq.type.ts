export interface FaqCategoryItem {
  id: number
  name: string
  sort: number
}

export interface FaqItem {
  id: number
  categoryId: number
  question: string
  answer: string
  sort: number
}

export interface FaqListQuery {
  categoryId?: number
}
