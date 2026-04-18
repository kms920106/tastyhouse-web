'use client'

import { Sidebar, SidebarContent, SidebarHeader, useSidebar } from '@/components/ui/shadcn/sidebar'
import { MemberGradeCode } from '@/domains/member'
import { usePlaceFoodTypes } from '@/hooks/usePlaceFoodTypes'
import { useSidebarBanners } from '@/hooks/useSidebarBanners'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { TfiArrowCircleLeft, TfiArrowCircleRight } from 'react-icons/tfi'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import Avatar from '../ui/Avatar'
import MemberGradeBadge from '../ui/MemberGradeBadge'
import MemberGradeIcon from '../ui/MemberGradeIcon'
import MemberGradeName from '../ui/MemberGradeName'
import MemberNickname from '../ui/MemberNickname'

const PAGE_SIZE = 6
const USER_GRADE: MemberGradeCode = 'GOURMET'
const USER_POINT = 2147

interface MenuGridItemProps {
  icon: string
  name: string
}

interface MenuGridButtonProps {
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
}

function MenuGridItem({ icon, name }: MenuGridItemProps) {
  return (
    <>
      <div className="relative w-14 h-8">
        <Image src={icon} alt={name} fill style={{ objectFit: 'contain' }} />
      </div>
      <span className="text-[13px] text-[#333333]">{name}</span>
    </>
  )
}

function MenuGridButton({ onClick, disabled, children }: MenuGridButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex flex-col items-center justify-center gap-2 h-24 bg-[#fdfdfd] border border-[#eeeeee]"
    >
      {children}
    </button>
  )
}

export default function MenuSidebar() {
  const { setOpenMobile } = useSidebar()

  const { foodTypes } = usePlaceFoodTypes()
  const { banners } = useSidebarBanners()

  const [categoryPage, setCategoryPage] = useState(0)

  const categoryTotalPages = Math.ceil(foodTypes.length / PAGE_SIZE)
  const visibleFoodTypes = foodTypes.slice(categoryPage * PAGE_SIZE, (categoryPage + 1) * PAGE_SIZE)

  const handleClose = () => {
    setCategoryPage(0)
    setOpenMobile(false)
  }

  const handlePrev = () => {
    if (categoryPage > 0) setCategoryPage((p) => p - 1)
  }

  const handleNext = () => {
    if (categoryPage < categoryTotalPages - 1) setCategoryPage((p) => p + 1)
  }

  const isPrevDisabled = categoryPage === 0
  const isNextDisabled = categoryPage >= categoryTotalPages - 1

  const profileImageUrl = '/images/sample/profile/default.png'
  const nickname = '테스트'

  return (
    <Sidebar side="left" collapsible="offcanvas">
      {/* 헤더: 설정/검색/닫기 + 프로필 */}
      <SidebarHeader className="gap-0 p-0">
        {/* 상단 아이콘 바 */}
        <div className="flex items-center justify-end gap-[18px] px-[15px] pt-[15px]">
          {/* 설정 */}
          <button className="flex items-center justify-center w-[18px] h-[18px]">
            <Image src="/images/icon-setting-black.png" alt="설정" width={18} height={18} />
          </button>

          {/* 검색 */}
          <button className="flex items-center justify-center w-[18px] h-[18px]">
            <Image src="/images/icon-search.png" alt="검색" width={18} height={18} />
          </button>

          {/* 닫기 */}
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-[18px] h-[18px]"
          >
            <Image src="/images/icon-close.png" alt="닫기" width={16} height={16} />
          </button>
        </div>

        {/* 유저 프로필 */}
        <div className="flex items-start gap-3 px-[15px] mt-10">
          <Avatar src={profileImageUrl} alt={nickname} />
          <div className="flex flex-col gap-2 min-w-0">
            {/* 닉네임 */}
            <MemberNickname>{nickname}</MemberNickname>

            <div className="flex gap-1">
              {/* 등급 */}
              <MemberGradeBadge
                gradeIcon={<MemberGradeIcon grade={USER_GRADE} size={14} />}
                gradeName={<MemberGradeName grade={USER_GRADE} size="sm" />}
              />

              {/* 리뷰 개수 */}
              <p className="text-sm leading-[14px]">
                (리뷰 <span className="font-bold">{USER_POINT.toLocaleString()}</span>개)
              </p>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-0 flex flex-col overflow-y-auto">
        {/* 공통 그리드 + 이전/다음 */}
        <div className="flex flex-col flex-1">
          <div className="grid grid-cols-2 gap-2.5 px-[15px] py-10">
            {visibleFoodTypes.map((foodType) => (
              <Link
                key={foodType.code}
                href={`/places?foodTypes=${foodType.code}`}
                onClick={() => setOpenMobile(false)}
                className="flex flex-col items-center justify-center gap-2 h-24 bg-[#fdfdfd] border border-[#eeeeee]"
              >
                <MenuGridItem icon={foodType.imageUrl} name={foodType.name} />
              </Link>
            ))}
            <MenuGridButton onClick={handlePrev} disabled={isPrevDisabled}>
              <TfiArrowCircleLeft size={25} color="#333333" />
              <span className="text-[13px] text-[#333333]">이전</span>
            </MenuGridButton>
            <MenuGridButton onClick={handleNext} disabled={isNextDisabled}>
              <TfiArrowCircleRight size={25} color="#333333" />
              <span className="text-[13px] text-[#333333]">다음</span>
            </MenuGridButton>
          </div>
        </div>

        {/* 하단 배너 */}
        <div className="relative w-full shrink-0 pb-10">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            spaceBetween={10}
            slidesPerView={1.2}
            centeredSlidesBounds={true}
            centeredSlides={true}
            initialSlide={0}
            className="w-full py-2"
          >
            {banners.map((banner, index) => (
              <SwiperSlide key={banner.id}>
                <div className="relative w-full aspect-[3/1] rounded-[5px] overflow-hidden">
                  {banner.linkUrl ? (
                    <Link
                      href={banner.linkUrl}
                      rel="noopener noreferrer"
                      className="relative block w-full h-full"
                    >
                      <Image
                        src={banner.imageUrl}
                        alt={banner.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </Link>
                  ) : (
                    <Image
                      src={banner.imageUrl}
                      alt={banner.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
