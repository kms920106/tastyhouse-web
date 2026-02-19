export type FaqCategory = '전체' | '주문/결제' | '취소/환불' | '회원정보' | '기타'

export type FaqListQuery = {
  category?: FaqCategory
  page: number
  size: number
}

export type FaqListItem = {
  id: number
  category: FaqCategory
  question: string
  answer: string
}
