import type { ReviewSortType } from '@/domains/review'

export interface SortableReview {
  createdAt: string
}

export function sortReviews<T extends SortableReview>(reviews: T[], sortType: ReviewSortType): T[] {
  const sorted = [...reviews]
  switch (sortType) {
    case 'recommended':
      return sorted
    case 'latest':
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    case 'oldest':
      return sorted.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      )
    default:
      return sorted
  }
}
