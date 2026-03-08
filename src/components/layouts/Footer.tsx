'use client'

import { cn } from '@/lib/utils'
import { PAGE_PATHS } from '@/lib/paths'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface FooterNavigationItem {
  label: string
  href: string
  iconOff: string
  iconOn: string
}

const FOOTER_NAVIGATION: FooterNavigationItem[] = [
  {
    label: '홈',
    href: PAGE_PATHS.HOME,
    iconOff: '/images/layout/icon-home-off.png',
    iconOn: '/images/layout/icon-home-on.png',
  },
  {
    label: '랭킹',
    href: PAGE_PATHS.RANKS,
    iconOff: '/images/layout/icon-rank-off.png',
    iconOn: '/images/layout/icon-rank-on.png',
  },
  {
    label: '리뷰',
    href: PAGE_PATHS.REVIEWS,
    iconOff: '/images/layout/icon-review-off.png',
    iconOn: '/images/layout/icon-review-on.png',
  },
  {
    label: '플레이스',
    href: PAGE_PATHS.PLACES,
    iconOff: '/images/layout/icon-place-off.png',
    iconOn: '/images/layout/icon-place-on.png',
  },
  {
    label: '마이페이지',
    href: PAGE_PATHS.MY_PAGE,
    iconOff: '/images/layout/icon-mypage-off.png',
    iconOn: '/images/layout/icon-mypage-on.png',
  },
]

export default function Footer() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 w-full bg-white border border-[#eeeeee] box-border z-50"
      role="navigation"
      aria-label="Main Navigation"
    >
      <nav className="h-[70px]">
        <ul className="flex items-center justify-around h-full">
          {FOOTER_NAVIGATION.map((item) => {
            const active = isActive(item.href)
            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  className="flex flex-col items-center justify-center gap-2.5 h-full"
                  aria-current={active ? 'page' : undefined}
                >
                  <div className="relative w-6 h-6 flex items-center justify-center">
                    <Image
                      src={active ? item.iconOn : item.iconOff}
                      alt=""
                      fill
                      style={{ objectFit: 'contain' }}
                      sizes="24px"
                    />
                  </div>
                  <span
                    className={cn(
                      'text-[10px] leading-[10px] transition-colors duration-200',
                      active ? 'text-main' : 'text-[#aaaaaa]',
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </footer>
  )
}
