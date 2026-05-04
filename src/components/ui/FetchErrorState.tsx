import Image from 'next/image'

interface Props {
  message: string
}

export default function FetchErrorState({ message }: Props) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div className="relative w-[35px] h-[35px]">
        <Image src="/images/icon-notice.png" alt="알림" width={35} height={35} />
      </div>
      <div className="mt-[15px]">
        <p className="text-sm leading-relaxed text-[#aaaaaa] whitespace-pre-line text-center">
          {message}
        </p>
      </div>
    </div>
  )
}
