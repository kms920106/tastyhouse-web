import Header, { HeaderRight } from '@/components/layouts/Header'
import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import Link from 'next/link'

export default function MyPageHeader() {
  return (
    <div className="flex-1 bg-main">
      <Header height={55} showBorder={false}>
        <HeaderRight>
          <Link href={PAGE_PATHS.SETTING}>
            <Image src="/images/mypage/icon-setting.png" alt="settings" width={24} height={24} />
          </Link>
        </HeaderRight>
      </Header>
    </div>
  )
}
