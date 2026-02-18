'use client'

import Image from 'next/image'
import { useState } from 'react'

import AppConfirmDialog from '@/components/ui/AppConfirmDialog'
import { logout } from '@/app/setting/action'

function ArrowIcon() {
  return <Image src="/images/layout/nav-right.png" alt="" width={7} height={12} />
}

export default function LogoutButton() {
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  const handleLogoutConfirm = async () => {
    await logout()
  }

  return (
    <>
      <button
        onClick={() => setLogoutDialogOpen(true)}
        className="w-full flex items-center justify-between px-4 pr-[21px] py-[19px]"
      >
        <span className="text-sm leading-[14px]">로그아웃</span>
        <ArrowIcon />
      </button>
      <AppConfirmDialog
        open={logoutDialogOpen}
        onOpenChange={setLogoutDialogOpen}
        title="로그아웃 하시겠습니까?"
        description={`현재 계정에서 로그아웃됩니다.\n계속 진행하시겠습니까?`}
        onConfirm={handleLogoutConfirm}
      />
    </>
  )
}
