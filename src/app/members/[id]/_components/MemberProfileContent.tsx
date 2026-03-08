import MemberProfileCard from '@/components/member/MemberProfileCard'
import Image from 'next/image'
import MemberProfileHeader from './MemberProfileHeader'
import MemberReviewListFetcher from './MemberReviewListFetcher'

interface MemberProfileContentProps {
  memberId: number
}

export default function MemberProfileContent({ memberId }: MemberProfileContentProps) {
  return (
    <div className="flex flex-col min-h-dvh bg-white">
      <div className="flex flex-col h-[50dvh]">
        <MemberProfileHeader memberId={memberId} />
        <MemberProfileCard memberId={memberId} />
      </div>
      <div className="flex-1 flex flex-col border-t border-[#eeeeee]">
        <div className="sticky top-0 w-full h-[50px] rounded-none bg-white z-40 p-0 flex">
          <div className="flex-1 h-full flex items-center justify-center border-b-2 border-main">
            <Image src="/images/mypage/icon-review-on.png" alt="리뷰" width={22} height={25} />
          </div>
        </div>
        <div className="mt-0 flex-1 min-h-[50dvh] bg-[#f9f9f9] flex flex-col">
          <MemberReviewListFetcher memberId={memberId} />
        </div>
      </div>
    </div>
  )
}
