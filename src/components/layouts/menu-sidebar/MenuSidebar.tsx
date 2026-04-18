'use client'

import { Sidebar, SidebarContent, SidebarHeader, useSidebar } from '@/components/ui/shadcn/sidebar'
import Image from 'next/image'
import MenuSidebarBanners from './MenuSidebarBanners'
import MenuSidebarFoodTypes from './MenuSidebarFoodTypes'
import MenuSidebarProfile from './MenuSidebarProfile'

export default function MenuSidebar() {
  const { setOpenMobile } = useSidebar()

  const handleClose = () => {
    setOpenMobile(false)
  }

  return (
    <Sidebar side="left" collapsible="offcanvas">
      <SidebarHeader className="gap-0 p-0">
        <div className="flex items-center justify-end gap-[18px] p-[15px]">
          {/* 설정 버튼 */}
          <button className="flex items-center justify-center w-[18px] h-[18px]">
            <Image src="/images/icon-setting-black.png" alt="설정" width={18} height={18} />
          </button>

          {/* 검색 버튼 */}
          <button className="flex items-center justify-center w-[18px] h-[18px]">
            <Image src="/images/icon-search.png" alt="검색" width={18} height={18} />
          </button>

          {/* 닫기 버튼 */}
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-[18px] h-[18px]"
          >
            <Image src="/images/icon-close.png" alt="닫기" width={16} height={16} />
          </button>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-0 flex flex-col overflow-y-auto">
        {/* 프로필 */}
        <MenuSidebarProfile />

        {/* 음식 종류 */}
        <MenuSidebarFoodTypes />

        {/* 배너 */}
        <MenuSidebarBanners />
      </SidebarContent>
    </Sidebar>
  )
}
