// 'use client'

import Header, { HeaderCenter, HeaderLeft, HeaderTitle } from '@/components/layouts/Header'
import { BackButton } from '@/components/layouts/header-parts'
import ProfileEditForm from './ProfileEditForm'

export default function ProfileEditSection() {
  return (
    <section className="min-h-screen bg-white">
      <Header variant="white" height={55}>
        <HeaderLeft>
          <BackButton />
        </HeaderLeft>
        <HeaderCenter>
          <HeaderTitle>프로필 수정</HeaderTitle>
        </HeaderCenter>
      </Header>
      <ProfileEditForm />
    </section>
  )
}
