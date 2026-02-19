export type FaqCategoryItem = {
  id: number
  name: string
  sort: number
}

export type FaqItem = {
  id: number
  categoryId: number
  question: string
  answer: string
  sort: number
}

export type FaqListQuery = {
  categoryId?: number
}
