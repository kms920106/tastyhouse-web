import PopularKeywordListItemSkeleton from './PopularKeywordListItemSkeleton'

export default function PopularKeywordListSkeleton() {
  return (
    <ul className="flex flex-col gap-5 px-[15px]">
      {Array.from({ length: 10 }).map((_, i) => (
        <li key={i}>
          <PopularKeywordListItemSkeleton />
        </li>
      ))}
    </ul>
  )
}
