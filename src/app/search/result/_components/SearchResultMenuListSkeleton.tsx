import SearchResultMenuListItemSkeleton from './SearchResultMenuListItemSkeleton'

export function SearchResultMenuListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <ul>
      {Array.from({ length: count }).map((_, i) => (
        <SearchResultMenuListItemSkeleton key={i} />
      ))}
    </ul>
  )
}
