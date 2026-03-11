'use client'

import { useState } from 'react'
import AccountInfoEditSection from './_components/AccountInfoEditSection'
import AccountInfoVerifySection from './_components/AccountInfoVerifySection'

export default function AccountInfoPage() {
  const [verifyToken, setVerifyToken] = useState<string | null>(null)

  if (verifyToken) {
    return <AccountInfoEditSection verifyToken={verifyToken} />
  }

  return <AccountInfoVerifySection onVerified={setVerifyToken} />
}
