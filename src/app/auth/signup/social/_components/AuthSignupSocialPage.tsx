'use client'

import { useState } from 'react'
import AuthSignupSocialPageContent from './AuthSignupSocialPageContent'
import AuthSignupSocialPageHeader from './AuthSignupSocialPageHeader'

interface Props {
  providerParam: string | undefined
  tempTokenParam: string | undefined
}

export default function AuthSignupSocialPage({ providerParam, tempTokenParam }: Props) {
  const [step, setStep] = useState<'phone' | 'signup'>('phone')

  return (
    <section className="min-h-screen">
      <AuthSignupSocialPageHeader step={step} />
      <AuthSignupSocialPageContent
        providerParam={providerParam}
        tempTokenParam={tempTokenParam}
        onStepChange={setStep}
      />
    </section>
  )
}
