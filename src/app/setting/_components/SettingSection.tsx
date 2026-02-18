'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import AppConfirmDialog from '@/components/ui/AppConfirmDialog'
import BorderedSection from '@/components/ui/BorderedSection'
import SectionStack from '@/components/ui/SectionStack'

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
      { id: 'event', label: '이벤트', href: '/events' },
      { id: 'point', label: '포인트 내역', href: '/point' },
      { id: 'custom-info', label: '맛집제보', href: '/places/new' },
      { id: 'bank-info', label: '등급안내', href: '/grade' },
    ],
  },
  {
    items: [
      { id: 'notice', label: '공지사항', href: '/setting/notice' },
      { id: 'faq', label: '자주하는 질문', href: '/setting/faq' },
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
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  const handleLogoutConfirm = () => {
    // TODO: 로그아웃 로직 구현
    console.log('로그아웃')
  }

  return (
    <section className="min-h-screen bg-[#f9f9f9]">
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
          <button
            onClick={() => setLogoutDialogOpen(true)}
            className="w-full flex items-center justify-between px-4 pr-[21px] py-[19px]"
          >
            <span className="text-sm leading-[14px]">로그아웃</span>
            <ArrowIcon />
          </button>
        </BorderedSection>
      </SectionStack>
      <AppConfirmDialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
        title="로그아웃 하시겠습니까?"
        description={`현재 계정에서 로그아웃됩니다.\n계속 진행하시겠습니까?`}
        onConfirm={handleLogoutConfirm}
      />
    </section>
  )
}
