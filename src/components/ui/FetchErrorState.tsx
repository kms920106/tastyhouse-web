import Image from 'next/image'

interface FetchErrorStateProps {
  message: string
}

export default function FetchErrorState({ message }: FetchErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 pb-[70px]">
      <div className="relative w-[35px] h-[35px]">
        <Image src="/images/icon-notice.png" alt="알림" width={35} height={35} />
      </div>
      <div className="mt-[15px]">
        <p className="text-sm leading-[14px] text-[#aaaaaa]">{message}</p>
      </div>
    </div>
  )
}
