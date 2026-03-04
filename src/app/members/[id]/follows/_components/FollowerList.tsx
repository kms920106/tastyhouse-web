// TODO: API 구현 시 실제 팔로워 목록 데이터 연동
interface FollowerListProps {
  memberId: string
}

export default function FollowerList({ memberId: _ }: FollowerListProps) {
  return (
    <div className="flex items-center justify-center py-20 text-gray-400 text-[14px]">
      팔로워 목록이 없습니다.
    </div>
  )
}
