'use client'

import { Sidebar, SidebarContent, SidebarHeader, useSidebar } from '@/components/ui/shadcn/sidebar'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import MenuSidebarBanners from './MenuSidebarBanners'
import MenuSidebarFoodTypes from './MenuSidebarFoodTypes'
import MenuSidebarProfile from './MenuSidebarProfile'

function MenuSidebarContent() {
  const { setOpenMobile } = useSidebar()

  return (
    <>
      <SidebarHeader className="gap-0 p-0">
        <div className="flex items-center justify-end gap-[18px] p-[15px]">
          <button className="flex items-center justify-center w-[18px] h-[18px]">
            <Image src="/images/icon-setting-black.png" alt="설정" width={18} height={18} />
          </button>
          <button className="flex items-center justify-center w-[18px] h-[18px]">
            <Image src="/images/icon-search.png" alt="검색" width={18} height={18} />
          </button>
          <button
            onClick={() => setOpenMobile(false)}
            className="flex items-center justify-center w-[18px] h-[18px]"
          >
            <Image src="/images/icon-close.png" alt="닫기" width={16} height={16} />
          </button>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-0 flex flex-col overflow-y-auto">
        <MenuSidebarProfile />
        <MenuSidebarFoodTypes />
        <MenuSidebarBanners />
      </SidebarContent>
    </>
  )
}

export default function MenuSidebar() {
  const { open, openMobile } = useSidebar()
  const [hasOpened, setHasOpened] = useState(false)

  useEffect(() => {
    if (open || openMobile) {
      setHasOpened(true)
    }
  }, [open, openMobile])

  return (
    <Sidebar side="left" collapsible="offcanvas">
      {hasOpened && <MenuSidebarContent />}
    </Sidebar>
  )
}
