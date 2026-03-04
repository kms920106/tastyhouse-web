// TODO: API 구현 시 실제 팔로잉 목록 데이터 연동
interface FollowingListProps {
  memberId: string
}

export default function FollowingList({ memberId: _ }: FollowingListProps) {
  return (
    <div className="flex items-center justify-center py-20 text-gray-400 text-[14px]">
      팔로잉 목록이 없습니다.
    </div>
  )
}
