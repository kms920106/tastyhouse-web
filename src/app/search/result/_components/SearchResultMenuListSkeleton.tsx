import React from 'react'
import SearchResultMenuListItemSkeleton from './SearchResultMenuListItemSkeleton'

export function SearchResultMenuListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <React.Fragment key={i}>
          <SearchResultMenuListItemSkeleton />
          {i < count - 1 && (
            <div className="border-t border-[#eeeeee] my-[15px]" />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
