'use client'

import { toast } from '@/components/ui/AppToaster'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'
import ShareButton from '../../../../components/layouts/header-parts/ShareButton'

export default function ShareButtonError() {
  const handleClick = () => {
    toast(COMMON_ERROR_MESSAGES.MUTATION_ERROR)
  }

  return <ShareButton onClick={handleClick} />
}
