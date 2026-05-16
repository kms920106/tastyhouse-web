import SearchResultPlaceListItemSkeleton from './SearchResultPlaceListItemSkeleton'

export function SearchResultPlaceListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <ul className="flex flex-col gap-[10px]">
      {Array.from({ length: count }).map((_, i) => (
        <SearchResultPlaceListItemSkeleton key={i} />
      ))}
    </ul>
  )
}
