'use client'

import { Sidebar, SidebarContent, SidebarHeader, useSidebar } from '@/components/ui/shadcn/sidebar'
import { MemberGradeCode } from '@/domains/member'
import Image from 'next/image'
import { useState } from 'react'
import { RiEditLine } from 'react-icons/ri'
import { TfiArrowCircleLeft, TfiArrowCircleRight } from 'react-icons/tfi'
import 'swiper/css'
import 'swiper/css/pagination'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

const GRADE_LABEL: Record<MemberGradeCode, string> = {
  NEWCOMER: '뉴비멤버',
  ACTIVE: '활동멤버',
  INSIDER: '인싸멤버',
  GOURMET: '미식멤버',
  TEHA: '테하멤버',
}

const GRADE_ICON: Record<MemberGradeCode, string> = {
  NEWCOMER: '/images/rank/icon-level-01-40.png',
  ACTIVE: '/images/rank/icon-level-02-40.png',
  INSIDER: '/images/rank/icon-level-03-40.png',
  GOURMET: '/images/rank/icon-level-04-40.png',
  TEHA: '/images/rank/icon-level-05-40.png',
}

const GRADE_COLOR: Record<MemberGradeCode, string> = {
  NEWCOMER: '#a5a5a5',
  ACTIVE: '#6ab04c',
  INSIDER: '#a5a5a5',
  GOURMET: '#ebad41',
  TEHA: '#e91e63',
}

const BANNER_IMAGES = [
  '/images/sample/sidebar/artisee_banner_1.png',
  '/images/sample/sidebar/artisee_banner_2.png',
  '/images/sample/sidebar/artisee_banner_3.png',
]

interface SubMenu {
  id: string
  name: string
  icon: string
}

interface FoodCategory {
  id: string
  name: string
  icon: string
  subMenus: SubMenu[]
}

const FOOD_CATEGORIES: FoodCategory[] = [
  {
    id: 'korean',
    name: '한식',
    icon: '/images/place/icon-filter-korean.png',
    subMenus: [
      { id: 'samgyeopsal', name: '삼겹살', icon: '/images/place/icon-filter-korean.png' },
      { id: 'jokbal', name: '족발', icon: '/images/place/icon-filter-korean.png' },
      { id: 'tteokbokki', name: '떡볶이', icon: '/images/place/icon-filter-korean.png' },
      { id: 'kalguksu', name: '칼국수', icon: '/images/place/icon-filter-korean.png' },
      { id: 'steak', name: '스테이크', icon: '/images/place/icon-filter-korean.png' },
      { id: 'mandu', name: '만두', icon: '/images/place/icon-filter-korean.png' },
    ],
  },
  {
    id: 'western',
    name: '양식',
    icon: '/images/place/icon-filter-western.png',
    subMenus: [
      { id: 'pasta', name: '파스타', icon: '/images/place/icon-filter-western.png' },
      { id: 'pizza', name: '피자', icon: '/images/place/icon-filter-western.png' },
      { id: 'burger', name: '버거', icon: '/images/place/icon-filter-western.png' },
      { id: 'steak2', name: '스테이크', icon: '/images/place/icon-filter-western.png' },
      { id: 'salad', name: '샐러드', icon: '/images/place/icon-filter-western.png' },
      { id: 'sandwich', name: '샌드위치', icon: '/images/place/icon-filter-western.png' },
    ],
  },
  {
    id: 'japanese',
    name: '일식',
    icon: '/images/place/icon-filter-japanese.png',
    subMenus: [
      { id: 'sushi', name: '초밥', icon: '/images/place/icon-filter-japanese.png' },
      { id: 'ramen', name: '라멘', icon: '/images/place/icon-filter-japanese.png' },
      { id: 'tonkatsu', name: '돈카츠', icon: '/images/place/icon-filter-japanese.png' },
      { id: 'yakitori', name: '야키토리', icon: '/images/place/icon-filter-japanese.png' },
      { id: 'udon', name: '우동', icon: '/images/place/icon-filter-japanese.png' },
      { id: 'soba', name: '소바', icon: '/images/place/icon-filter-japanese.png' },
    ],
  },
  {
    id: 'chinese',
    name: '중식',
    icon: '/images/place/icon-filter-chinese.png',
    subMenus: [
      { id: 'jjajang', name: '짜장면', icon: '/images/place/icon-filter-chinese.png' },
      { id: 'jjamppong', name: '짬뽕', icon: '/images/place/icon-filter-chinese.png' },
      { id: 'tangsuyuk', name: '탕수육', icon: '/images/place/icon-filter-chinese.png' },
      { id: 'malatang', name: '마라탕', icon: '/images/place/icon-filter-chinese.png' },
      { id: 'dimsum', name: '딤섬', icon: '/images/place/icon-filter-chinese.png' },
      { id: 'peking', name: '베이징덕', icon: '/images/place/icon-filter-chinese.png' },
    ],
  },
  {
    id: 'world',
    name: '세계음식',
    icon: '/images/place/icon-filter-world.png',
    subMenus: [
      { id: 'vietnamese', name: '베트남', icon: '/images/place/icon-filter-world.png' },
      { id: 'thai', name: '태국', icon: '/images/place/icon-filter-world.png' },
      { id: 'indian', name: '인도', icon: '/images/place/icon-filter-world.png' },
      { id: 'mexican', name: '멕시코', icon: '/images/place/icon-filter-world.png' },
      { id: 'turkish', name: '터키', icon: '/images/place/icon-filter-world.png' },
      { id: 'spanish', name: '스페인', icon: '/images/place/icon-filter-world.png' },
    ],
  },
  {
    id: 'bunsik',
    name: '분식',
    icon: '/images/place/icon-filter-bunsik.png',
    subMenus: [
      { id: 'tteokbokki2', name: '떡볶이', icon: '/images/place/icon-filter-bunsik.png' },
      { id: 'sundae', name: '순대', icon: '/images/place/icon-filter-bunsik.png' },
      { id: 'rabokki', name: '라볶이', icon: '/images/place/icon-filter-bunsik.png' },
      { id: 'kimbap', name: '김밥', icon: '/images/place/icon-filter-bunsik.png' },
      { id: 'odeng', name: '오뎅', icon: '/images/place/icon-filter-bunsik.png' },
      { id: 'twigim', name: '튀김', icon: '/images/place/icon-filter-bunsik.png' },
    ],
  },
  {
    id: 'pub',
    name: '주점',
    icon: '/images/place/icon-filter-pub.png',
    subMenus: [
      { id: 'pojang', name: '포장마차', icon: '/images/place/icon-filter-pub.png' },
      { id: 'izakaya', name: '이자카야', icon: '/images/place/icon-filter-pub.png' },
      { id: 'beer', name: '호프', icon: '/images/place/icon-filter-pub.png' },
      { id: 'makgeolli', name: '막걸리', icon: '/images/place/icon-filter-pub.png' },
      { id: 'soju', name: '소주방', icon: '/images/place/icon-filter-pub.png' },
      { id: 'wine', name: '와인바', icon: '/images/place/icon-filter-pub.png' },
    ],
  },
  {
    id: 'cafe',
    name: '카페',
    icon: '/images/place/icon-filter-cafe.png',
    subMenus: [
      { id: 'coffee', name: '커피', icon: '/images/place/icon-filter-cafe.png' },
      { id: 'dessert', name: '디저트', icon: '/images/place/icon-filter-cafe.png' },
      { id: 'bakery', name: '베이커리', icon: '/images/place/icon-filter-cafe.png' },
      { id: 'juice', name: '주스', icon: '/images/place/icon-filter-cafe.png' },
      { id: 'tea', name: '티', icon: '/images/place/icon-filter-cafe.png' },
      { id: 'icecream', name: '아이스크림', icon: '/images/place/icon-filter-cafe.png' },
    ],
  },
]

const PAGE_SIZE = 6

type SidebarStep = 'category' | 'subMenu'

const USER_GRADE: MemberGradeCode = 'GOURMET'
const USER_NICKNAME = '닉네임을뭐라고하지'
const USER_POINT = 2147

export default function MenuSidebar() {
  const { setOpenMobile } = useSidebar()
  const [step, setStep] = useState<SidebarStep>('category')
  const [categoryPage, setCategoryPage] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<FoodCategory | null>(null)
  const [subMenuPage, setSubMenuPage] = useState(0)

  const categoryTotalPages = Math.ceil(FOOD_CATEGORIES.length / PAGE_SIZE)
  const visibleCategories = FOOD_CATEGORIES.slice(
    categoryPage * PAGE_SIZE,
    (categoryPage + 1) * PAGE_SIZE,
  )

  const handleCategorySelect = (category: FoodCategory) => {
    setSelectedCategory(category)
    setSubMenuPage(0)
    setStep('subMenu')
  }

  const handleClose = () => {
    setStep('category')
    setSelectedCategory(null)
    setSubMenuPage(0)
    setCategoryPage(0)
    setOpenMobile(false)
  }

  const handlePrev = () => {
    if (step === 'subMenu') {
      if (subMenuPage > 0) {
        setSubMenuPage((p) => p - 1)
      } else {
        setSelectedCategory(null)
        setStep('category')
      }
    } else {
      if (categoryPage > 0) setCategoryPage((p) => p - 1)
    }
  }

  const handleNext = () => {
    if (step === 'subMenu') {
      if (!selectedCategory) return
      const totalPages = Math.ceil(selectedCategory.subMenus.length / PAGE_SIZE)
      if (subMenuPage < totalPages - 1) setSubMenuPage((p) => p + 1)
    } else {
      if (categoryPage < categoryTotalPages - 1) setCategoryPage((p) => p + 1)
    }
  }

  const visibleSubMenus = selectedCategory
    ? selectedCategory.subMenus.slice(subMenuPage * PAGE_SIZE, (subMenuPage + 1) * PAGE_SIZE)
    : []

  const isNextDisabled =
    step === 'subMenu'
      ? subMenuPage >= Math.ceil((selectedCategory?.subMenus.length ?? 0) / PAGE_SIZE) - 1
      : categoryPage >= categoryTotalPages - 1

  const isPrevDisabled = step === 'category' && categoryPage === 0

  return (
    <Sidebar side="left" collapsible="offcanvas">
      {/* 헤더: 설정/검색/닫기 + 프로필 */}
      <SidebarHeader className="gap-0 p-0">
        {/* 상단 아이콘 바 */}
        <div className="flex items-center justify-end gap-[18px] px-[15px] pt-[15px]">
          <button className="flex items-center justify-center w-[18px] h-[18px]">
            <Image src="/images/icon-setting-black.png" alt="설정" width={18} height={18} />
          </button>
          <button className="flex items-center justify-center w-[18px] h-[18px]">
            <Image src="/images/icon-search.png" alt="검색" width={18} height={18} />
          </button>
          <button
            onClick={handleClose}
            className="flex items-center justify-center w-[18px] h-[18px]"
          >
            <Image src="/images/icon-close.png" alt="닫기" width={16} height={16} />
          </button>
        </div>

        {/* 유저 프로필 */}
        <div className="flex items-start gap-3 px-[15px] py-10">
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src="/images/sample/profile/default.png"
              alt="프로필"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[14px] text-[#333333] leading-none">
                {USER_NICKNAME}
              </span>
              <RiEditLine size={14} className="text-gray-400 flex-shrink-0" />
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Image
                src={GRADE_ICON[USER_GRADE]}
                alt={GRADE_LABEL[USER_GRADE]}
                width={14}
                height={14}
              />
              <span className="text-[12px] font-bold" style={{ color: GRADE_COLOR[USER_GRADE] }}>
                {GRADE_LABEL[USER_GRADE]}
              </span>
              <span className="text-[12px] text-[#333333]">
                (리뷰 {USER_POINT.toLocaleString()}개)
              </span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-0 flex flex-col overflow-y-auto">
        {/* 공통 그리드 + 이전/다음 */}
        <div className="flex flex-col flex-1">
          <div className="grid grid-cols-2 gap-2">
            {step === 'category'
              ? visibleCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category)}
                    className="flex flex-col items-center justify-center h-24 bg-[#fdfdfd] hover:bg-gray-50 transition-colors"
                  >
                    <div className="relative w-14 h-8 mb-2">
                      <Image
                        src={category.icon}
                        alt={category.name}
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <span className="text-[13px] text-[#333333]">{category.name}</span>
                  </button>
                ))
              : visibleSubMenus.map((subMenu) => (
                  <button
                    key={subMenu.id}
                    className="flex flex-col items-center justify-center h-24 bg-[#fdfdfd] hover:bg-gray-50 transition-colors"
                  >
                    <div className="relative w-14 h-8 mb-2">
                      <Image
                        src={subMenu.icon}
                        alt={subMenu.name}
                        fill
                        style={{ objectFit: 'contain' }}
                      />
                    </div>
                    <span className="text-[13px] text-[#333333]">{subMenu.name}</span>
                  </button>
                ))}
          </div>

          {/* 이전/다음 버튼 */}
          <div className="grid grid-cols-2 gap-px">
            <button
              onClick={handlePrev}
              disabled={isPrevDisabled}
              className="flex flex-col items-center justify-center gap-2 py-5 bg-[#fdfdfd] hover:bg-gray-50 transition-colors"
            >
              <TfiArrowCircleLeft size={25} color="#333333" />
              <span className="text-[13px] text-[#333333]">이전</span>
            </button>
            <button
              onClick={handleNext}
              disabled={isNextDisabled}
              className="flex flex-col items-center justify-center gap-2 py-5 bg-[#fdfdfd] hover:bg-gray-50 transition-colors"
            >
              <TfiArrowCircleRight size={25} color="#333333" />
              <span className="text-[13px] text-[#333333]">다음</span>
            </button>
          </div>
        </div>

        {/* 하단 배너 (Swiper) */}
        <div className="relative w-full shrink-0">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop
            spaceBetween={10}
            slidesPerView={1.15}
            centeredSlides
            className="w-full py-2"
          >
            {BANNER_IMAGES.map((src, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full aspect-[3/1] rounded-[5px] overflow-hidden">
                  <Image src={src} alt={`배너 ${index + 1}`} fill className="object-cover" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}
