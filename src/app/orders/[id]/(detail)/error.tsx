'use client'

import ErrorRenderSection from '@/components/ui/ErrorRenderSection'
import { COMMON_ERROR_MESSAGES } from '@/lib/constants'

export default function OrderDetailError() {
  return <ErrorRenderSection title="결제내역" message={COMMON_ERROR_MESSAGES.RENDER_ERROR} />
}
