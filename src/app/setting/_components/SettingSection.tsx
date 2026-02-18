import Image from 'next/image'
import Link from 'next/link'

import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'

import LogoutButton from './LogoutButton'

interface MenuItem {
  id: string
  label: string
  href: string
}

interface MenuGroup {
  items: MenuItem[]
}

const menuGroups: MenuGroup[] = [
  {
    items: [
      { id: 'coupons', label: '쿠폰', href: '/coupons' },
      { id: 'events', label: '이벤트', href: '/events' },
      { id: 'point', label: '포인트 내역', href: '/point' },
      { id: 'grade', label: '등급안내', href: '/account/grade' },
    ],
  },
  {
    items: [
      { id: 'notices', label: '공지사항', href: '/notices' },
      { id: 'faqs', label: '자주하는 질문', href: '/faqs' },
      { id: 'customer-center', label: '고객센터', href: '/setting/customer-center' },
      { id: 'ad-proposal', label: '광고 및 제휴', href: '/setting/ad-proposal' },
      { id: 'version', label: '버그제보', href: '/setting/bug-report' },
    ],
  },
  {
    items: [
      { id: 'terms', label: '이용약관', href: '/setting/terms' },
      { id: 'privacy-policy', label: '개인정보취급방침', href: '/setting/privacy-policy' },
    ],
  },
  {
    items: [
      { id: 'privacy-settings', label: '개인정보 수정', href: '/setting/privacy-settings' },
      { id: 'password-change', label: '비밀번호 변경', href: '/setting/password-change' },
    ],
  },
]

function ArrowIcon() {
  return <Image src="/images/layout/nav-right.png" alt="" width={7} height={12} />
}

function MenuItemRow({ label, href }: MenuItem) {
  return (
    <Link href={href} className="flex items-center justify-between px-4 pr-[21px] py-[19px]">
      <span className="text-sm leading-[14px]">{label}</span>
      <ArrowIcon />
    </Link>
  )
}

export default function SettingSection() {
  return (
    <section className="min-h-screen">
      <Header variant="white" height={55} showBorder={false}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>설정</HeaderTitle>
        </HeaderCenter>
      </Header>
      <SectionStack>
        {menuGroups.map((group, groupIndex) => (
          <BorderedSection key={groupIndex} className="divide-y divide-[#eeeeee]">
            {group.items.map((item) => (
              <MenuItemRow key={item.id} {...item} />
            ))}
          </BorderedSection>
        ))}
        <BorderedSection>
          <LogoutButton />
        </BorderedSection>
      </SectionStack>
    </section>
  )
}
