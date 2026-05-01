'use client'

import ShareButton from '@/components/layouts/header-parts/ShareButton'
import { PAGE_PATHS } from '@/lib/paths'
import { share } from '@/lib/share'
import { useCallback } from 'react'

interface Props {
  placeId: number
  productId: number
  productName: string
}

export default function ShareButtonClient({
  placeId,
  productId,
  productName,
}: Props) {
  const getShareUrl = useCallback(() => {
    return `${window.location.origin}${PAGE_PATHS.PLACE_MENU_DETAIL(placeId, productId)}`
  }, [placeId, productId])

  const handleShare = useCallback(async () => {
    await share({
      title: `[테이스티하우스] ${productName}`,
      text: `'${productName}' 어때요? 테이스티하우스 앱에서 확인해 보세요.`,
      url: getShareUrl(),
    })
  }, [productName, getShareUrl])

  return <ShareButton onClick={handleShare} />
}
