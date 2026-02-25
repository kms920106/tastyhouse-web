'use client'

import { useState } from 'react'
import PasswordChangeSection from './_components/PasswordChangeSection'
import PasswordVerifySection from './_components/PasswordVerifySection'

export default function PasswordChangePage() {
  const [verifyToken, setVerifyToken] = useState<string | null>(null)

  if (verifyToken) {
    return <PasswordChangeSection verifyToken={verifyToken} />
  }

  return <PasswordVerifySection onVerified={setVerifyToken} />
}
