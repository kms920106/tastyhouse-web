'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'

export function useTabNavigation() {
  const router = useRouter()
  const pathname = usePathname()

  const handleTabChange = useCallback(
    (value: string) => {
      const params = new URLSearchParams()
      params.set('tab', value)
      router.replace(`${pathname}?${params.toString()}`, { scroll: false })
    },
    [router, pathname],
  )

  return { handleTabChange }
}
